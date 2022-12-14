import dayjs from 'dayjs'
import { readFileSync, writeFileSync } from 'fs'
import { execSync } from 'child_process'
import { TEMPLATE_EMPTY } from './template'

export interface CreateOptions {
  name?: string
  out?: string
  template?: string
  vars?: string
  today?: string
}

export function commandCreate(options: CreateOptions) {
  const {
    name,
    out,
    template,
    today
  } = options
  let content = template ? readFileSync(template, { encoding: 'utf-8' }) : TEMPLATE_EMPTY
  const vars = options.vars ? String(options.vars).split(',') : []

  if (template) {
    content = replaceVariables(content, vars)
  }

  if (today) {
    content = replaceToday(content, today)
  }

  writeFile(
    content,
    getName(out, name ?? ''),
    out
  )
}

function replaceVariables(content: string, vars: string[]) {
  for (const key in vars) {
    const index = Number(key) + 1
    content = content.replace(new RegExp(`\\{\\$${index}\\}`, 'g'), vars[key])
  }

  return content
}

function replaceToday(content: string, format: string) {
  content = content.replaceAll('{$today}', dayjs().format(format))

  return content
}

function getName(out: string | undefined, name: string) {
  const now = new Date().toLocaleString('sv').replace(/\D/g, '')
  const outDir = out ? out + '/' : ''
  const outFile = (name.endsWith('.md') ? name.replace(/\.md$/i, '') : name) ?? now
  const outName = `${outDir}${outFile}.md`

  return outName
}

function writeFile(content: string, name: string, out: string | undefined) {
  execSync(`mkdir -p ${out}`)
  writeFileSync(name, content)
}
