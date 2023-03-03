import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {AuthService} from "./auth.service";
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
  ) {
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const gqlExecutionContext = GqlExecutionContext.create(context)
    const req = gqlExecutionContext.getContext().req

    return this.authService.verifyUser(req.headers.authorization)
  }
}
