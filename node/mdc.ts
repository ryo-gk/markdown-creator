import sade from 'sade'
import { commandCreate } from './create'

const program = sade('mdc')

program.version('0.1.0')

program.command('create')
  .describe('create markdown file')
  .option('-t, --template', 'Use specified file as template')
  .option('-n, --name', 'Use specified name as file\'s name')
  .option('-o, --out', 'Use specified path as directory where file create')
  .option('--var', 'Use variables which are used for format')
  .action((opts) => {
    commandCreate(opts)
  })

program.parse(process.argv)
