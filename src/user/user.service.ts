import { genSalt, hash } from 'bcrypt'
import { Knex } from 'knex';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { DatabaseService } from 'libs/database/database.service';
import { UpdateUserDto, UserDto, UserPayload } from 'libs/model/user/user.dto';


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

    const payload: UserPayload = {
      id: newUser.id,
      firstName : newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email,
    }

    const userDetail = {
      accessToken: this.jwtService.sign(payload)
    }

    return userDetail;
  }

  async currentUser(id: number){

    const [userProfile] = await this.db
    .connection('user')
    .select()
    .where({id})
    
    const returnProfile = {
      id: userProfile.id,
      firstName: userProfile.firstName,
      lastName: userProfile.lastName,
      email: userProfile.email,
      date: userProfile.date

    }

    return returnProfile;
  }
  

  findAll() {
    return this.db
    .connection('user')
    .select()
    ;
  }

  async findUser(id : number) {
    
    const user = await this.db
    .connection('user')
    .select('id', 'firstName', 'lastName', 'email')
    .where({id})
    .then((rows) => rows[0])
    ;
  
    return user;
  }

  update(id: number, user: UpdateUserDto) {
    return this.db
    .connection('user')
    .update(user)
    .where({id})
    ;
  }

  remove(id: number) {
    return this.db
    .connection('user')
    .delete()
    .where({id})
    ;
  }

  async encryptPassword(password: string) {
    const salt = await genSalt(SALT_WORK_FACTOR);
    const passwordHash = await hash(password, salt);

    return passwordHash;

  }

}
