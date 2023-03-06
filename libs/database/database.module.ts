import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [
    {
      provide: DatabaseService,
      useValue: new DatabaseService({
        client: 'tesst',
        connection: {
          host: '192.168.1.13',
          port: Number(process.env.POSTGRES_PORT),
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: 'spotify',
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