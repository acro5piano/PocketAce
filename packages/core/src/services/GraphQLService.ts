import { Service } from 'typedi'
import { Schema } from 'src/schema'
import { Resolver } from 'src/schema/ResolverRegistry'

@Service()
export class GraphQLService {
  schema = new Schema()

  buildSchema = async (schemaString: string) => {
    await this.schema.buildSchema(schemaString)
  }

  registerResolver = (name: string, resolver: Resolver) => {
    this.schema.registerResolver(name, resolver)
  }
}
