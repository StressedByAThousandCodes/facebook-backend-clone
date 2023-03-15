import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()], 
  providers: [
    {
      provide: DatabaseService,
      useValue: new DatabaseService({
        client: 'pg',
        connection: {
          host: process.env.POSTGRES_HOST,
          port: Number(process.env.POSTGRES_PORT),
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DATABASE,
        },
        pool: {
          min: 2,
          max: 50,
        },
      }),
    },
  ],
  exports: [DatabaseService],
})
export class DatabaseModule { }