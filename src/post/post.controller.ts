import { Body, Controller, Post, Request, Get, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { UserPostDto } from 'libs/model/post/post.dto';

@Controller('user-feed')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  post(@Body() body, @Request () request){
    const userId = request.user.id;
    return this.postService.createPost(body.content, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  addLikes(@Param('id') post_id:number, @Request () request){
    const userId = request.user.id;
    return this.postService.like(post_id, userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getCurrentUserPosts(@Request() request):Promise <UserPostDto[]>{
    const userId = request.user.id;
    return this.postService.getPostsById(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getOnePost(@Param('id') id: number ){
    return this.postService.getOnePost(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('likes/:id')
  likes(@Param('id') post_id: number){
    return this.postService.getLikes(post_id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  editPostById(@Param('id') id: number, @Body() body: string){
    return this.postService.editPostById(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deletePost(@Param('id') id:number){
    return this.postService.deletePost(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('likes/:id')
  unlike(@Param('id') id: number, @Request() request){
    const userId = request.user.id;
    return this.postService.unlike(id,userId);
  }

}
