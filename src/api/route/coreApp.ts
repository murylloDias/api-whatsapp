import { celebrate, Joi, Segments } from 'celebrate'
import { NextFunction, Request, Response, Router } from 'express'

import { Container } from 'typedi'

import CoreAppService from '../../services/coreApp'

const route = Router()

export default (app: Router) => {
  app.use('/whatsapp', route)

  route.post(
    'menssage',
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        phone: Joi.string().required()
      })
    }),

    (req: Request, res: Response, next: NextFunction) => {
      try {
        const coreAppServiceInstance = Container.get(CoreAppService)
        coreAppServiceInstance.message()
        res.status(200).json({
          message: 'Messagem enviada com sucesso!'
        })
      } catch (e) {
        return next(e)
      }
    }
  )
}