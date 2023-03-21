import { Knex } from 'knex';
import { DatabaseService } from 'libs/database/database.service';

import { Injectable } from '@nestjs/common';

@Injectable()
export class FriendsService {

    private dbInstance: Knex;
    constructor(
        private db: DatabaseService,
    ) { this.dbInstance = this.db.getInstance(); }

    addFriend(from_user: string, to_user: string){
        
        const friend = {
            from_user: from_user,
            to_user: to_user,
            status: 'Pending'
        }

        return this.db
        .connection('friends')
        .insert(friend)
        .returning('*')
    }

    oneFriend(id: string, name: string){
        return this.db
        .connection('user')
        .select('firstName','lastName','email')
        .join('friends', {'friends.to_user':'user.id'})
        .whereILike('firstName', `%${name}%`)
        .orWhereILike('lastName', `%${name}%`)
        .then((rows) => rows[0])
        ;
    }

    requests(id: string, status: string){
        return this.db
        .connection('user')
        .select('firstName','lastName','email','status')
        .join('friends', {'friends.to_user':'user.id'})
        .whereILike('status', 'Pending')
        ;
    }

    getAllFriends(id: string){
        return this.db
        .connection('user')
        .select('to_user','firstName','lastName','email','status')
        .join('friends', {'friends.to_user':'user.id'})
        .where({from_user:id})
        .orWhere({to_user:id})
        ;
    }

    acceptRequest(id: string){

        return this.db
        .connection('friends')
        .update({status: 'Accepted'})
        .where({id})
    }

    declineRequest(id: string){
        return this.db
        .connection('friends')
        .delete()
        .where({id})
        .andWhere({status: 'Pending'})
        ;
    }
}
