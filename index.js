import { program } from 'commander'
import { default as moralis } from 'moralis'
import { EvmChain } from '@moralisweb3/common-evm-utils'

const WARB_ADDRESS = '0x912CE59144191C1204E64559FE8253a0e49E6548'
const WETH_ADDRESS = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2'
const WBNB_ADDRESS = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c'

program
  .version('0.0.1', '-v, --version') // duplicate of the version in package.json
  .requiredOption('-a, --address <address>', 'The address to search for owned tokens.')
  .requiredOption('-k, --key <key>', 'Moralis API key.')
  .parse(process.argv)

const options = program.opts()

const tasks = [
  {
    chain: EvmChain.ARBITRUM,
    priceContract: WARB_ADDRESS,
  },
  {
    chain: EvmChain.ETHEREUM,
    priceContract: WETH_ADDRESS,
  },
  {
    chain: EvmChain.SEPOLIA,
    priceContract: undefined,
  },
  {
    chain: EvmChain.BSC,
    priceContract: WBNB_ADDRESS,
  },
]

async function getPriceUsd(moralis, chain, priceContract) {
  if (priceContract) {
    const response = await moralis.EvmApi.token.getTokenPrice({
      address: priceContract,
      chain: chain,
    })

    return response.result.usdPrice;
  }

  return 0.0;
}

await moralis.start({
  apiKey: options.key
})

for (const { chain, priceContract } of tasks) {
    console.log(`[${chain.name}]`)
    const response = await moralis.EvmApi.balance.getNativeBalance({
        address: options.address,
        chain: chain,
    })
    console.log(`Balance = ${response.result.balance.ether}`)

    const priceUsd = await getPriceUsd(moralis, chain, priceContract)
    const balanceUsd = response.result.balance.ether * priceUsd;

    console.log(`Balance (USD) = ${balanceUsd}`)
}
