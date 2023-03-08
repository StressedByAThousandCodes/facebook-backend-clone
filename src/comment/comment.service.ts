import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseService } from 'libs/database/database.service';
import { UserDto } from 'libs/model/user/user.dto';

@Injectable()
export class CommentService {

    private dbInstance: Knex;
    constructor(
        private db: DatabaseService,
    ) { this.dbInstance = this.db.getInstance(); }
    
    createComment( id: number, user: string, comment: string){

        const content = {
            userId: id,
            user: user,
            comment: comment,
        }  

        return this.db
        .connection('comment')
        .insert(content)
        .returning('*')
    
    }

    getComment(id: number){
        return this.db
        .connection('comment')
        .select()
        .where({user: id})
    }

    editComment(id: number, comment: string){

    }

    deleteComment(id:number){

    }
}
