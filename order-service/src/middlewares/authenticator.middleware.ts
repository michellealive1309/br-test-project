import { NestMiddleware } from "@nestjs/common";

export class AuthenticatorMiddleware implements NestMiddleware {
  use(req: any, res: any, next: (error?: any) => void) {
    

    next();
  }
}