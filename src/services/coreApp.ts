import { Inject, Service } from "typedi";
import { Logger } from "winston";

@Service()
export default class CoreAppService {
  constructor(
    @Inject('logger')
    private logger: Logger
  ) {}

  public message() {

  }
}
