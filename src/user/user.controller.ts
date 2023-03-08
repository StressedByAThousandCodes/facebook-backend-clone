import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards, Request } from '@nestjs/common';
import { UserService as UserService } from './user.service';
import { UpdateUserDto, UserDto } from 'libs/model/user/user.dto';
import { AuthGuard } from '@nestjs/passport'

@Controller('spotify')
export class UserController {
  constructor(private readonly spotifyService: UserService) {}

  @Post()
  createUser(@Body() user: UserDto) {
    return this.spotifyService.create(user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('current-user')
  me(@Request() request){

    const userId = request.user.accountId;

    return this.spotifyService.currentUser(userId);
  }

  @Get()
  findAllUser() {
    return this.spotifyService.findAll();
  }

  @Get('find-user')
  findOneUser(@Body() body) {
    return this.spotifyService.findOne(body.firstName);
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.spotifyService.update(id, user);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.spotifyService.remove(+id);
  }

}
