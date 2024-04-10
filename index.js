import { program } from 'commander'
import { default as moralis } from 'moralis'
import { EvmChain } from '@moralisweb3/common-evm-utils'

program
  .version('0.0.1', '-v, --version') // duplicate of the version in package.json
  .requiredOption('-a, --address <address>', 'The address to search for owned tokens.')
  .requiredOption('-k, --key <key>', 'Moralis API key.')
  .parse(process.argv)

const options = program.opts()

await moralis.start({
  apiKey: options.key
})

const balance = await moralis.EvmApi.balance.getNativeBalance({
    address: options.address,
    chain: EvmChain.ETHEREUM,
})

console.log(balance.jsonResponse)
