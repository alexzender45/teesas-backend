import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database';
import { ConfigsModule } from './configs';
import { UserModule } from './user';
import { BaseModule } from './base';
import { ProductModule } from './products';
import { TransactionModule } from './transactions';

@Module({
  imports: [
    UserModule,
    DatabaseModule,
    ConfigsModule,
    BaseModule,
    ProductModule,
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
