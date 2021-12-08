import { Service, Inject } from 'typedi'
import { Logger } from 'winston'

@Service('webAppService')
export default class WebAppService {
  constructor(
    @Inject('logger')
    private logger: Logger
  ) {}

  public async account(phone: string, network: string, store: string): Promise<string> {
    
  }
}