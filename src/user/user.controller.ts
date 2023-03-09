import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from 'libs/model/user/user.dto';
import { AuthGuard } from '@nestjs/passport'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(@Body() user: UserDto) {
    return this.userService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('current-user')
  currentUser(@Request() request){

    const userId = request.user.id;

    return this.userService.currentUser(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAllUser() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('search')
  findUserByName(@Body() body: any) {
    return this.userService.search(body.name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  findOneUser(@Param('id') id: number) {
    return this.userService.findUser(id);
  }

  

  @UseGuards(AuthGuard('jwt'))
  @Put()
  updateUser(@Request() request, @Body() user: UpdateUserDto) {
    const id = request.user.id; 
    return this.userService.update(id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  removeUser(@Request() request) {
    const userId = request.user.id;
    return this.userService.remove(userId);
  }

}
