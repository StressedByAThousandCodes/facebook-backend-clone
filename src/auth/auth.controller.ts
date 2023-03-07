import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SpotifyService } from 'src/spotify/spotify.service';
import { UserDto } from 'libs/model/user/user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    ) {}

  @Post()
  login(@Req() request, @Body() body: UserDto) {
    return this.authService.login(body.email, body.password);
  }
}
