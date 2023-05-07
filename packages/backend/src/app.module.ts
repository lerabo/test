import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { CommonModule } from './modules/common/common.module';
import { TrimMiddleware } from './modules/common/middlewares/trim.middleware';
import { ExampleModule } from './modules/example/example.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { PlaidModule } from './modules/plaid/plaid.module';
import { NotificationModule } from './modules/notifications/notification.module';

@Module({
  imports: [
    CommonModule,
    ExampleModule,
    AuthModule,
    PaymentsModule,
    PlaidModule,
    NotificationModule
  ]
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(...[TrimMiddleware]).forRoutes('/');
  }
}
