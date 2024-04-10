import { program } from 'commander'

program
  .version('0.0.1', '-v, --version') // duplicate of the version in package.json
  .usage('[OPTIONS]...')
  .argument('<address>', 'The address of the owner to search for tokens.')
  .requiredOption('-k, --apikey <key>', 'Moralis API key.')
  .allowExcessArguments(false)
  .parse(process.argv)

console.log(program.args)
console.log(program.opts())
