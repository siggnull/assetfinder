import { program } from 'commander'
import { default as moralis } from 'moralis'
import { EvmChain } from '@moralisweb3/common-evm-utils'

program
  .version('0.0.1', '-v, --version') // duplicate of the version in package.json
  .requiredOption('-a, --address <address>', 'The address to search for owned tokens.')
  .requiredOption('-k, --key <key>', 'Moralis API key.')
  .parse(process.argv)

const options = program.opts()

const chains = [
  EvmChain.ARBITRUM,
  EvmChain.ETHEREUM,
  EvmChain.SEPOLIA,
  EvmChain.BSC,
]

await moralis.start({
  apiKey: options.key
})

let totalUsdValue = 0;
for (const chain of chains) {
    console.log(`[${chain.name}]`)

    const response = await moralis.EvmApi.wallets.getWalletTokenBalancesPrice({
        chain,
        address: options.address,
        excludeSpam: true,
    })

    let totalChainUsdValue = 0;
    for (const tokenBalance of response.result) {
      console.log(`${tokenBalance.name} (${tokenBalance.symbol}): ${tokenBalance.balanceFormatted} (${tokenBalance.usdValue || 0.0} USD)`)

      if (typeof tokenBalance.usdValue === 'number') {
        totalChainUsdValue += tokenBalance.usdValue
        totalUsdValue += tokenBalance.usdValue
      }
    }

    console.log(`${chain.name} USD: ${totalChainUsdValue}`)
}

console.log(`Total USD: ${totalUsdValue}`)
