import { pick } from '../utils'
import { DirectiveProps } from '../contracts/DirectiveContract'

export default async function where({
  inputArgs,
  queryChain,
  inferredTableName,
  args,
}: DirectiveProps<{ table?: string; keys?: string[] }>) {
  const keys = args.keys || ([] as string[])
  const where = keys.length === 0 ? inputArgs : pick(inputArgs as any, ...keys)

  return queryChain.table(inferredTableName).where(where)
}
