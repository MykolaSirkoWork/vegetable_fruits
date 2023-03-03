import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import {GqlExecutionContext} from "@nestjs/graphql";
import {Reflector} from "@nestjs/core";
import {AuthService} from "./auth.service";

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
  ) {
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles.length) {
      return true; // no roles defined, allow access
    }

    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    return this.authService.defineUserRole(
      req.headers.authorization,
      roles
    )

  }
}
