import { Router } from 'express'
import webApp from './route/webApp'

export default () => {
  const app = Router()

  webApp(app)

  return app
}