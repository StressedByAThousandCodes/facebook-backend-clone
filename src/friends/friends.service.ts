import { Knex } from 'knex';
import { DatabaseService } from 'libs/database/database.service';
import { FriendsDto } from 'libs/model/friends/friends.dto';

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
        .andWhere({id})
        .then((rows) => rows[0])
        ;
    }

    requests(id: string, status: string){
        return this.db
        .connection('user')
        .select('firstName','lastName','email',)
        .join('friends', {'friends.to_user':'user.id'})
        .whereILike('status', `${status}`)
    }

    getAllFriends(id: string){
        return this.db
        .connection('user')
        .select('firstName','lastName','email',)
        .join('friends', {'friends.to_user':'user.id'})
    }

    acceptRequest(id: string){
        const status = {
            status: 'Accepted'
        }

        return this.db
        .connection('friends')
        .update(status)
        .where({id})
    }
}
