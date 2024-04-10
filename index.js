import { program } from 'commander'

program
  .version('0.0.1', '-v, --version') // duplicate of the version in package.json
  .usage('[OPTIONS]...')
  .requiredOption('-a, --address <address>', 'The address to search for owned tokens.')
  .requiredOption('-k, --key <key>', 'Moralis API key.')
  .allowExcessArguments(false)
  .parse(process.argv)

console.log(program.args)
console.log(program.opts())
