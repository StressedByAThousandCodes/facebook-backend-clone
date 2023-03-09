import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { CommentDto, UpdateCommentDto } from 'libs/model/comment/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  comment(@Body() comment: CommentDto, @Request () request){

    const userId = request.user.id;

    return this.commentService.createComment( userId, comment );
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getCommentsByPostId(@Param('id') id: number){
    return this.commentService.getComment(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  editComment(@Param('id') id: number, @Body() body: UpdateCommentDto){
    return this.commentService.editComment(id, body);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  deleteComment(@Param('id') id: number){
   
    return this.commentService.deleteComment(id);
  }
}
