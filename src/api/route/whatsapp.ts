import { Router, Request, Response, NextFunction } from "express"
import { Container } from 'typedi'
import whatsappService from "../../services/whatsapp"

const route = Router()

export default (app: Router) => {
  app.use('/whatsapp', route)

  route.get(
    '/session',
    (req: Request, res: Response, next: NextFunction) => {
      try {
        const whatsappServiceInstance = Container.get(whatsappService)
        whatsappServiceInstance.session()
        res.status(200).json({
          message: 'Sessão estabelecida com sucesso!'
        })
      } catch (e) {
        return next(e)
      }
    }
  )
}