import { genSalt, hash, compare } from 'bcrypt'
import { Knex } from 'knex';
import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'libs/database/database.service';
import { UpdateUserDto, UserDto } from 'libs/model/user/user.dto';
import { TrackDto } from 'libs/model/tracks/tracks.dto';
import { PlaylistDto } from 'libs/model/playlist/playlist.dto';

const SALT_WORK_FACTOR = 10;


@Injectable()
export class SpotifyService {

  private dbInstance: Knex;
    constructor(
        private db: DatabaseService,
    ) { this.dbInstance = this.db.getInstance(); }

  async create(user: UserDto) {
    const [exist] = await this.db
    .connection('user')
    .select()
    .where({email : user.email})
    ;
    //console.log(exist);
    if(exist){
      return 'User already exist';
    }
    const encrypt = await this.encryptPassword(user.password)
    user.password = encrypt;
    console.log(encrypt)
    return this.db
    .connection('user')
    .insert(user)
    .returning('*')
    ;
  }

  async login(email: string, password: string) {
    const [user] = await this.db
    .connection('user')
    .select()
    .where({email})
    ;
    console.log(user)
    if(!user){
      return 'User doesnt exist';
    }

    const isMatch = await compare(password, user.password)
    console.log(isMatch);

    if(isMatch){
      return user;
    }
    else{
      return 'Password does not match';
    }
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

  async encryptPassword(password: string) {
    const salt = await genSalt(SALT_WORK_FACTOR);
    const passwordHash = await hash(password, salt);

    return passwordHash;

  }

}
