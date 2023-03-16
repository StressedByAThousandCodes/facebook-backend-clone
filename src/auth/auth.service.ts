import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { compare } from 'bcrypt'
import { DatabaseService } from 'libs/database/database.service';
import { JwtService } from '@nestjs/jwt';
import { Knex } from 'knex';
import { UserPayload } from 'libs/model/user/user.dto';


@Injectable()
export class AuthService {
  
  private dbInstance: Knex;
  constructor(
      private db: DatabaseService,
      private readonly jwtService:JwtService
      ){ this.dbInstance = this.db.getInstance(); }

  async login(email: string, password: string) {
    const [user] = await this.db
    .connection('user')
    .select()
    .where({email})
    ;
   
    if(!user){
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Email does not match.'
      }, 
      HttpStatus.UNAUTHORIZED)
    }

    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      firstName : user.firstName,
      lastName : user.lastName,
      
    }

    const isMatch = await compare(password, user.password)

    if(isMatch){
      return {
        accessToken: this.jwtService.sign(payload)
      };
    }
    else{
      throw new HttpException({
        status: HttpStatus.UNAUTHORIZED,
        error: 'Password does not match.'
      }, 
      HttpStatus.UNAUTHORIZED)
      
    }
  }
}
