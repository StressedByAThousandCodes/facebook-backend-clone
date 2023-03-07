import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';
import { DatabaseService } from 'libs/database/database.service';
import { TrackDto } from 'libs/model/tracks/tracks.dto';

@Injectable()
export class SongService {

    private dbInstance: Knex;
    constructor(
        private db: DatabaseService,
    ) { this.dbInstance = this.db.getInstance(); }
    
    async uploadSong(song: TrackDto) {
        const [exist] = await this.db
        .connection('tracks')
        .select()
        .where({trackTitle : song.trackTitle})
        .andWhere({artist : song.artist})
        .andWhere({album : song.album})
        ;
        
        if(exist){
          return 'Song already exist.';
        }
        
        return this.db
        .connection('tracks')
        .insert(song)
        .returning('*')
        ;
    }

    findSong(title : string) {
        return this.db
        .connection('tracks')
        .select()
        .where({trackTitle : title})
        ;
    }
}
