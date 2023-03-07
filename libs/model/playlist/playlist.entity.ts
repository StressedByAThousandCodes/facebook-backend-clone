import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tracks')
export class PlaylistDto {

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    trackId: number

    @Column()
    playlistName: string

}