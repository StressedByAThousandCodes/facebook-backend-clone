import { Module } from '@nestjs/common';
import { HomeService } from './home.service';
import { HomeController } from './home.controller';
import { DatabaseModule } from 'libs/database/database.module';

@Module({
  controllers: [HomeController],
  providers: [HomeService],
  imports: [DatabaseModule]
})
export class HomeModule {}
