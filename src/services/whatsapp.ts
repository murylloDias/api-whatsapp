import { Inject, Service } from "typedi";
import { Logger } from "winston";

@Service()
export default class whatsappService {
  constructor(
    @Inject('logger')
    private logger: Logger
  ) { }

}
