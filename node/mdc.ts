import sade from 'sade'
import { commandCreate } from './create'

const program = sade('mdc')

program.version('0.1.0')

program.command('create')
  .describe('create markdown file')
  .option('-n, --name')
  .option('-o, --out')
  .option('-t, --template')
  .option('--var')
  .action((opts) => {
    commandCreate(opts)
  })

program.parse(process.argv)
