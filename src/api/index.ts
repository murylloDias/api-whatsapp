import { Router } from 'express'
import whatsapp from './route/whatsapp'

export default () => {
  const app = Router()

  whatsapp(app)

  return app
}