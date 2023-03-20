import { AuthGuard } from '@nestjs/passport';
import { 
  Controller, 
  Post, 
  Request,
  Param,
  Put,
  Delete,
  Query,
  UseGuards, 
  Get
} from '@nestjs/common';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  //Add Friend
  @UseGuards(AuthGuard('jwt'))
  @Post(':id')
  addFriend(@Request() request, @Param('id') to_user : string ){
    const from_user = request.user.id;
    return this.friendsService.addFriend(from_user, to_user);
  }

  //See Friends and Requests
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async getFriends(@Request() request, @Query('name') name: string, @Query('status') status: string){
    if(name){
      const id = request.user.id;
      return this.friendsService.oneFriend(id, name)
    }
    else if(status){
      const id = request.user.id;
      return this.friendsService.requests(id, status)
    }
    else{
      const id = request.user.id;
      return this.friendsService.getAllFriends(id);
    }
  }

  //Accept Friend Request
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  acceptRequest(@Param('id') id: string){
    return this.friendsService.acceptRequest(id)
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  declineRequest(@Param('id') id: string){
    return this.friendsService.declineRequest(id);
  }

}
