import { Body, Controller, Get, Post } from '@nestjs/common';
import { TrackDto } from 'libs/model/tracks/tracks.dto';
import { SongService } from './song.service';

@Controller('song')
export class SongController {
    constructor(private readonly songService: SongService) {}
    
    @Post('upload-song')
    uploadSong(@Body() song: TrackDto) {
        return this.songService.uploadSong(song);
    }

    @Get('search')
    findSong(@Body() body) {
        return this.songService.findSong(body.trackTitle);
    }

    
}
