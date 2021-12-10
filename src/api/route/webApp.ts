import { Router } from 'express'
import { celebrate, Segments, Joi } from 'celebrate'
import { Request, Response, NextFunction } from 'express'

import { Container } from 'typedi'

import webAppService from '../../services/webApp'

const route = Router()

export default (app: Router) => {
  app.use('/whatsapp', route)

  route.post(
    '/account',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        phone: Joi.string().required()
      })
    }),

    (req: Request, res: Response, next: NextFunction) => {
      try {
        const webAppServiceInstance = Container.get(webAppService)
        webAppServiceInstance.account(req.body.phone)
        res.status(201).json({
          message: 'Sessão estabelecida com sucesso!'
        })
      } catch (e) {
        return next(e)
      }
    }
  )
}