import { DatabaseService } from '../services/DatabaseService'
import { Service, Inject } from 'typedi'
import DataLoader from 'dataloader'

@Service()
export class ReloationLoader {
  @Inject()
  database!: DatabaseService

  loaders = new Map<string, DataLoader<string, object[]>>()

  clear() {
    this.loaders.clear()
  }

  getLoader(tableName: string, key: string) {
    const savedLoader = this.loaders.get(`${tableName}__${key}`)
    if (savedLoader) {
      return savedLoader
    }

    const loader = new DataLoader(
      (ids: readonly string[]) => {
        return this.database.db
          .table<{ [k in typeof key]: string }>(tableName)
          .whereIn(key, ids)
          .select()
          .then((rows) => ids.map((id) => rows.filter((x) => x[key] === id)))
      },
      { cache: false },
    )

    this.loaders.set(tableName, loader)
    return loader
  }
}
