import { program } from 'commander'
import { default as moralis } from 'moralis'

program
  .version('0.0.1', '-v, --version') // duplicate of the version in package.json
  .requiredOption('-a, --address <address>', 'The address to search for owned tokens.')
  .requiredOption('-k, --key <key>', 'Moralis API key.')
  .parse(process.argv)

console.log(program.opts())
