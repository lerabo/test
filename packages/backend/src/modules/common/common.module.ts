import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JWTAuthGuard } from 'src/modules/common/guards/jwt-auth.guard';
import { HttpModule } from '@nestjs/axios';
import { HttpRequestWrapper } from './wrappers/httpWrapper/httpWrapper';
import { NotificationWrapper } from './wrappers/notificationWrapper/notification.wrapper';

function getSSLConfig(env: string) {
  const configs = {
    production: { rejectUnauthorized: true },
    local: false,
    deploy: { rejectUnauthorized: false }
  };
  if (!configs[env] === undefined) {
    throw new Error('Set network in your .env file');
  }
  return configs[env];
}

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      isGlobal: true
    }),
    PassportModule.register({ session: true }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' }
    }),
    HttpModule.register({})
  ],

  providers: [ConfigModule, ConfigService, JWTAuthGuard, HttpRequestWrapper, NotificationWrapper],
  exports: [
    JwtModule,
    ConfigModule,
    ConfigService,
    JWTAuthGuard,
    ConfigService,
    HttpRequestWrapper,
    NotificationWrapper
  ]
})
export class CommonModule {}
