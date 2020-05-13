import { BaseDirective } from './BaseDirective'
import { DirectiveExecutionArgs } from 'src/contracts/DirectiveContract'
import { typeToTable } from 'src/database/Convension'

export class AllDirective extends BaseDirective<{ table?: string }> {
  name = 'all'

  resolveField({ resolveInfo }: DirectiveExecutionArgs) {
    const table = typeToTable(
      this.getDirectiveArgValue('table'),
      resolveInfo.returnType,
    )
    return this.db.table(table)
  }
}
