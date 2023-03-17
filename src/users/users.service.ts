import { genSalt, hash } from 'bcrypt'
import { Knex } from 'knex';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
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
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        error: 'Email Already Exist'
      },
      HttpStatus.BAD_REQUEST);
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
    .select('id', 'firstName','lastName','email','createdAt','updatedAt')
    ;
  }

  async findUser(id : number) {
    const user = await this.db
    .connection('user')
    .select()
    .where({id})
    .then((rows) => rows[0])
    ;

    if(!user){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Match Not Found'
      },
      HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async search(name: string) {

    const exist = await this.db
    .connection('user')
    .select('firstName', 'lastName', 'email')
    .whereILike('firstName', `%${name}%`)
    .orWhereILike('lastName', `%${name}%`)
    ;

    if(exist.length === 0){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Match Not Found'
      },
      HttpStatus.NOT_FOUND);
    }
    return exist;
  }

  async update(id: number, user: UpdateUserDto) {
    const exist = await this.db
    .connection('user')
    .select()
    .where({id})
    .then((rows) => rows[0])
    ;

    if(!exist){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Match Not Found'
      },
      HttpStatus.NOT_FOUND);
    }

    return this.db
    .connection('user')
    .update(user)
    .where({id})
    ;
  }

  async remove(id: number) {
    const user = await this.db
    .connection('user')
    .select()
    .where({id})
    .then((rows) => rows[0])
    ;

    if(!user){
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Match Not Found'
      },
      HttpStatus.NOT_FOUND);
      
    }
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
