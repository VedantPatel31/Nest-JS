import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './auth/auth.guard';
import { JwtService } from '@nestjs/jwt';
import { UploadModule } from './upload/upload.module';
import { MailerService } from './mailer/mailer.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  // imports: [ProductsModule],
  imports: [ConfigModule.forRoot(),MongooseModule.forRoot("mongodb://127.0.0.1:27017/nestjscw1"),ProductsModule, CategoryModule, AuthModule, UploadModule],
  controllers: [AppController],
  providers: [AppService,JwtService, MailerService],
})
export class AppModule {}
