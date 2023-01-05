import sade from 'sade'
import { commandCreate } from './create'

const program = sade('mdc')

program.version('1.0.1')

program.command('create')
  .describe('create markdown file')
  .option('-t, --template', 'Use specified file as template')
  .option('-n, --name', 'Use specified name as file\'s name')
  .option('-o, --out', 'Use specified path as directory where file create')
  .option('--vars', 'Use variables which are used for format')
  .option('--today', 'Replace the characters {$today} with today\'s date using passed the day.js format')
  .action((opts) => {
    commandCreate(opts)
  })

program.parse(process.argv)
