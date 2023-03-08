import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto, UserDto } from 'libs/model/user/user.dto';
import { AuthGuard } from '@nestjs/passport'

@Controller('user')
export class UserController {
  constructor(private readonly spotifyService: UserService) {}

  @Post()
  createUser(@Body() user: UserDto) {
    return this.spotifyService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('current-user')
  currentUser(@Request() request){

    const userId = request.user.id;

    return this.spotifyService.currentUser(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAllUser() {
    return this.spotifyService.findAll();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('find-user')
  findOneUser(@Body() body) {
    return this.spotifyService.findOne(body.firstName);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  updateUser(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.spotifyService.update(id, user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.spotifyService.remove(+id);
  }

}
