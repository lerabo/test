import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable
} from '@nestjs/common';
import * as jose from 'jose';
import { VerifyTokenResponse } from 'src/modules/auth/dtos/verify-token.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Remove 'Bearer' from token
    const token = request?.headers?.authorization?.split(' ')[1];
    const pubKey = request?.body.pubKey;
    if (!token || !pubKey) {
      return false;
    }

    try {
      const jwks = jose.createRemoteJWKSet(new URL('https://api.openlogin.com/jwks'));
      const jwtDecoded = await jose.jwtVerify(token, jwks, { algorithms: ['ES256'] });
      if ((jwtDecoded.payload as any).wallets[0].public_key !== pubKey) {
        // in this case token or pubkey obviously was forged
        return false;
      }
      request.userData = VerifyTokenResponse.cast(jwtDecoded.payload);
    } catch (e) {
      throw new HttpException('Invalid or expired token', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
