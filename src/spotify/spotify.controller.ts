import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { SpotifyService } from './spotify.service';
import { CreateSpotifyDto } from './dto/create-spotify.dto';
import { UpdateUserDto, UserDto } from 'libs/model/user/user.dto';

@Controller('spotify')
export class SpotifyController {
  constructor(private readonly spotifyService: SpotifyService) {}

  @Post()
  createUser(@Body() user: UserDto) {
    return this.spotifyService.create(user);
  }

  @Get()
  findAll() {
    return this.spotifyService.findAll();
  }

  @Get('find-user')
  findOne(@Body() body) {
    return this.spotifyService.findOne(body.firstName);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() user: UpdateUserDto) {
    return this.spotifyService.update(id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.spotifyService.remove(+id);
  }
}
