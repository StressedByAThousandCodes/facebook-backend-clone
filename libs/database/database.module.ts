import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [
    {
      provide: DatabaseService,
      useValue: new DatabaseService({
        client: 'pg',
        connection: {
          host: 'localhost',
          port: 5432,
          user: 'hp',
          password: '123456',
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