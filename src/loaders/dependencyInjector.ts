import { Container } from 'typedi'
import LoggerInstance from './logger'

export default () => {
  try {
    Container.set('logger', LoggerInstance)
    LoggerInstance.info('Logger inject into container')

  } catch (e) {
    LoggerInstance.error('Error on dependency injector loader: ', e)
    throw e
  }
}