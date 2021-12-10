import { model, Schema } from 'mongoose'
import { ISession } from '../interfaces'

const SessionSechema = new Schema<ISession> ({
  phone: {
    type: String,
    required: true,
    trim: true
  },
  WABrowserId: {
    type: String,
    required: true,
    trim: true
  },
  WASecretBundle: {
    type: String,
    required: true,
    trim: true
  },
  WAToken1: {
    type: String,
    required: true,
    trim: true
  },
  WAToken2: {
    type: String,
    required: true,
    trim: true
  }
})

export default model<ISession>('Session', SessionSechema)