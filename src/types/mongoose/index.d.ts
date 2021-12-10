import { Model } from 'mongoose'
import { ISession } from '../../interfaces'

declare global {
  namespace Models {
    export type SessionModel = Model<ISession>
  }
}