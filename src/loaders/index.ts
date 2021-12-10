import Logger from './logger'
import mongoLoader from './mongoose'
import expressLoader from './express'
import dependencyInjector from './dependencyInjector'

export default async ({ expressApp }: any) => {
  const mongoConnection = await mongoLoader()
  Logger.info('BD loaded an connected!')

  const models = [
    {
      name: 'sessionModel',
      model: require('../models/session')
    }
  ]

  dependencyInjector(models)
  Logger.info('Dependency injector loaded')

  expressLoader({ app: expressApp })
  Logger.info('Express injector loaded')
}