import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tracks')
export class TrackDto {

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    
    @PrimaryGeneratedColumn()
    trackNumber: number

    @Column()
    trackTitle: string

    @Column()
    artist: string

    @Column()
    description: string

    @Column()
    album: string

}