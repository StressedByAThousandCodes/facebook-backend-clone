import { Injectable } from '@nestjs/common';
import { count } from 'console';
import { Knex } from 'knex';
import { DatabaseService } from 'libs/database/database.service';

@Injectable()
export class PostService {

    private dbInstance: Knex;
    constructor(
        private db: DatabaseService,
    ) { this.dbInstance = this.db.getInstance(); }

    createPost(content:string, id:number){

        const post = {
            content: content,
            user: id 
        }  

        return this.db
        .connection('post')
        .insert(post)
        .returning('*')
    }

    like(post_id:number, ref_user_id:number){

        return this.db
        .connection('likes')
        .insert({post_id, ref_user_id})
        .returning('*')
    }

    getPostsById(id : number){
        return this.db
        .connection('post')
        .select()
        .where({user: id})
    }

    getOnePost(postId: number){
        return this.db
        .connection('post')
        .select()
        .where({id: postId})
    }

    getLikes(post_id: number){
        return this.db
        .connection('likes')
        .count()
        .where({post_id})
    }

    editPostById(id: number, post: string){
        
        return this.db
        .connection('post')
        .update(post)
        .where({id})
    }

    deletePost(id: number){

        return this.db
        .connection('post')
        .delete()
        .where({id})
    }

    dislike(id:number, ref_user_id:number){
        return this.db
        .connection('likes')
        .delete()
        .where({id})
        .andWhere({ref_user_id})
    }
}
