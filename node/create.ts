import { readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { TEMPLATE_EMPTY } from './template'

export interface CreateOptions {
  name?: string
  out?: string
  template?: string
  vars?: string
}

export function commandCreate(options: CreateOptions) {
  const {
    name,
    out,
    template,
  } = options
  let content = template ? readFileSync(template, { encoding: 'utf-8' }) : TEMPLATE_EMPTY
  const vars = options.vars?.split(',') ?? []

  if (template) {
    content = replaceVariables(content, vars)
  }

  const now = new Date().toLocaleString('sv').replace(/\D/g, '')
  const outDir = out ? out + '/' : ''
  const outFile = name ?? now
  const outName = `${outDir}${outFile}.md`

  execSync(`mkdir -p ${out}`)
  writeFileSync(outName, content)
}

function replaceVariables(content: string, vars: string[]) {
  for (const key in vars) {
    const index = Number(key) + 1
    content = content.replace(new RegExp(`\\{\\$${index}\\}`, 'g'), vars[key])
  }

  return content
}
