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

for (const chain of chains) {
    const response = await moralis.EvmApi.balance.getNativeBalance({
        address: options.address,
        chain
    })
    console.log(`${chain.name}: ${response.result.balance.ether}`)
}
