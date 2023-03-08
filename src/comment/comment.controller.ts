import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from 'libs/model/user/user.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add-comment')
  comment(@Body() comment, @Request () request){

    const userId = request.user.id;
    const name = request.user.firstName +' ' + request.user.lastName;
;
    return this.commentService.createComment( userId, name, comment.comment );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getCommentsByPostId(@Body() comments){
    return this.commentService.getComment(comments);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  editComment(@Param('id') id: number, @Body() body: string){
    return this.commentService.editComment(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteComment(@Param('id') id : number){
    return this.commentService.deleteComment(id);
  }
}
