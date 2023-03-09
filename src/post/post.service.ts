import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseService } from 'libs/database/database.service';

@Injectable()
export class PostService {

    private dbInstance: Knex;
    constructor(
        private db: DatabaseService,
    ) { this.dbInstance = this.db.getInstance(); }

    async createPost(content:string, id:number){

        const post = {
            content: content,
            user: id 
        }  

        return this.db
        .connection('post')
        .insert(post)
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

    editPostById(id: number, post: string){

        const exist = this.db
        .connection('post')
        .select()
        .where({id})

        if(!exist){
            return 'This content does not exist'
        }
        
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
}
