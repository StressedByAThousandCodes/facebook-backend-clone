import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { CreateSpotifyDto } from './dto/create-spotify.dto';
import { UpdateUserDto, UserDto } from 'libs/model/user/user.dto';
import { TrackDto } from 'libs/model/tracks/tracks.dto';
import { PlaylistDto } from 'libs/model/playlist/playlist.dto';

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  //User
  @Post()
  createUser(@Body() user: UserDto) {
    return this.spotifyService.create(user);
  }

  @Post('login')
  login(@Body() body) {
    return this.spotifyService.login(body.email, body.password);
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
