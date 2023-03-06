import { Injectable } from '@nestjs/common';
import { CreateSpotifyDto } from './dto/create-spotify.dto';
import { DatabaseService } from 'libs/database/database.service';
import { Knex } from 'knex';
import { UpdateUserDto, UserDto } from 'libs/model/user/user.dto';

@Injectable()
export class SpotifyService {

  private dbInstance: Knex;
    constructor(
        private db: DatabaseService,
    ) { this.dbInstance = this.db.getInstance(); }

  async create(user: UserDto) {
    const exist = await this.db
    .connection('user')
    .insert(user)
    .returning('*')
    ;
    if(exist){
      return 'User already exist';
    }
    
    return this.db
    .connection('user')
    .insert(user)
    .returning('*')
    ;
  }

  findAll() {
    return this.db
    .connection('user')
    .select()
    ;
  }

  findOne(firstName : string) {
    return this.db
    .connection('user')
    .select()
    .where({firstName})
    ;
  }

  update(id: number, user: UpdateUserDto) {
    return this.db
    .connection('user')
    .update(user)
    .where({accountId: id})
    ;
  }

  remove(id: number) {
    return this.db
    .connection('user')
    .delete()
    .where({accountId: id})
    ;
  }
}
