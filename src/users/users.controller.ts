import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request, Query } from '@nestjs/common';
import { UserService } from './users.service';
import { UpdateUserDto, UserDto } from 'libs/model/user/user.dto';
import { AuthGuard } from '@nestjs/passport'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: UserDto) {
    return this.userService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getUsers(@Query('current') current: string,@Query('name') name : string , @Request() request) {
    if (current) {
      const userId = request.user.id;
      return this.userService.currentUser(userId);
    }
    else if(name){
      return this.userService.search(name);
    } 
    else {
      return this.userService.findAll();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOneUser(@Param('id') id: number) {
    return this.userService.findUser(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateUser(@Param('id') id:number, @Body() user: UpdateUserDto) { 
    return this.userService.update(id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  removeUser(@Param('id') id:number) {
    return this.userService.remove(id);
  }
}
