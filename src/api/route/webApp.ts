import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import { Request, Response, NextFunction } from 'express'

const route = Router()

export default (app: Router) => {
  app.use('whatsapp', route)

  route.post(
    '/account',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        phone: Joi.string().required(),
        store: Joi.string().required(),
        network: Joi.string().required()
      })
    }),

    async (req: Request, res: Response, next: NextFunction) => {
      try {

      } catch (e) {
        return next(e)
      }
    }
  )
}