import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DatabaseModule } from 'libs/database/database.module';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal : true}),
    UserModule,
    DatabaseModule,
    AuthModule,
    PostModule,

    CommentModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
