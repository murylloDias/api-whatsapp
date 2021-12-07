import Logger from './logger'
import expressLoader from './express'
import dependencyInjector from './dependencyInjector'

export default async ({ expressApp }: any) => {
  expressLoader({ app: expressApp })
  Logger.info('Express injector loaded')

  dependencyInjector()
  Logger.info('Dependency injector loaded')
}