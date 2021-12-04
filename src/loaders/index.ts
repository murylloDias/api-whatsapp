import Logger from './logger'
import expressLoader from './express'
import dependencyInjector from './dependencyInjector'

export default async ({ expressApp }: any) => {
  dependencyInjector()
  Logger.info('Dependency injector loaded')

  expressLoader({ app: expressApp })
  Logger.info('Express injector loaded')
}