import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  // constructor(private authService:AuthService){}
  constructor(private jwtService: JwtService) { }

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;
      if (!authorization || authorization.trim() === '' || !authorization.startsWith("Bearer ")) {
        throw new UnauthorizedException('please provide a token')
      }
      // if (!authorization.startsWith("Bearer ")) {
      //   throw new UnauthorizedException('token is not valid')
      // }

      const authToken = authorization.replace('Bearer ', '').trim();
      // const res = this.authService.validateToken(authToken);
      // request.user=res;
      const res = this.validateToken(authToken);
      return true;
    } catch (error) {
      throw new UnauthorizedException(error.message || 'Token not valis sign in again');
    }
  }

  validateToken(token: string) {
    return this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET
    });
  }
  // canActivate(
  //   context: ExecutionContext,
  // ): boolean | Promise<boolean> | Observable<boolean> {
  //   return true;
  // }
}
