import Logger from './logger'
import expressLoader from './express'
import dependencyInjector from './dependencyInjector'
import whatsappLoader from './whatsapp'

export default async ({ expressApp }: any) => {
  expressLoader({ app: expressApp })
  Logger.info('Express injector loaded')

  dependencyInjector()
  Logger.info('Dependency injector loaded')

  whatsappLoader()
  Logger.info('Whatsapp-web injector loaded')
}