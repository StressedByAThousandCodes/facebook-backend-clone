import { genSalt, hash } from 'bcrypt'
import { Knex } from 'knex';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DatabaseService } from 'libs/database/database.service';
import { UpdateUserDto, UserDto } from 'libs/model/user/user.dto';


const SALT_WORK_FACTOR = 10;


@Injectable()
export class UserService {

  private dbInstance: Knex;
    constructor(
        private db: DatabaseService,
        private readonly jwtService:JwtService
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

    const [newUser] = await this.db
    .connection('user')
    .insert(user)
    .returning('*')
    ;

    const payload = {
      accountId: newUser.accountId,
      username: newUser.username,
      email: newUser.email,
    }

    const userDetail = {
      accessToken: this.jwtService.sign(payload)
    }

    return userDetail;
  }

  async currentUser(accountId: number){
    console.log(accountId);
    return this.db
    .connection('user')
    .select()
    .where({accountId})
  }
  

  findAll() {
    return this.db
    .connection('user')
    .select()
    ;
  }

  findOne(accountId : string) {
    return this.db
    .connection('user')
    .select()
    .where({accountId})
    .then((rows) => rows[0])
    ;
  }

  async findUser(accountId : number) {
    console.log('==========================',accountId)
    const test = await this.db
    .connection('user')
    .select('accountId', 'username', 'email')
    .where({accountId})
    .then((rows) => rows[0])
    ;
    console.log(test)
    return test
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
