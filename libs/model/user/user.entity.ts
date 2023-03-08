import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('tracks')
export class TrackDto {

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date
    
    @PrimaryGeneratedColumn()
    trackNumber: number

    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

}