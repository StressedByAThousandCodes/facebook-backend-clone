import { Body, Controller, Post, Request, Get, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { HomeService } from './home.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('home')
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('post')
  post(@Body() body, @Request () request){

    const userId = request.user.id;

    return this.homeService.createPost(body.content, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getPostById(@Request() request){
    const userId = request.user.id;
    return this.homeService.getPostsById(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getOnePost(@Param('id') id: number ){
    return this.homeService.getOnePost(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  editPostById(@Param('id') id: number, @Body() body: string){
    return this.homeService.editPostById(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deletePost(@Param('id') id : number){
    return this.homeService.deletePost(id);
  }

}
