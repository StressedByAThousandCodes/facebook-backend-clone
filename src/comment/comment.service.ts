import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseService } from 'libs/database/database.service';
import { CommentDto, UpdateCommentDto } from 'libs/model/comment/comment.dto';

@Injectable()
export class CommentService {

    private dbInstance: Knex;
    constructor(
        private db: DatabaseService,
    ) { this.dbInstance = this.db.getInstance(); }
    
    createComment( id: number, user: CommentDto){

        const content = {
            ... user,
            from_user: id
        }  

        return this.db
        .connection('comment')
        .insert(content)
        .returning('*')
    
    }

    getComment( ref_post_id: number ){

        return this.db
        .connection('comment')
        .select()
        .where({ ref_post_id})
    }

    getReply( ref_post_id : number, ref_comment_id: number ){
        return this.db
        .connection('comment')
        .select()
        .where({ ref_post_id, ref_comment_id })
    }

    editComment(id: number, comment: UpdateCommentDto){

        return this.db
        .connection('comment')
        .update(comment)
        .where({id})
    }

    deleteComment(id:number){
        
        return this.db
        .connection('comment')
        .delete()
        .where({id})
    }
}
