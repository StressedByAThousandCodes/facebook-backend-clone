import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { AuthGuard } from '@nestjs/passport';
import { CommentDto } from 'libs/model/comment/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('add-comment')
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
  @Put()
  editComment(@Request() request, @Body() comment: CommentDto){
    const id = request.user.id;
    return this.commentService.editComment(id, comment.comment);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete()
  deleteComment(@Request() request){
    const id = request.user.id;
    return this.commentService.deleteComment(id);
  }
}
