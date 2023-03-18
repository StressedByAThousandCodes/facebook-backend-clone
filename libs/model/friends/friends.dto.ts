import { Timestamp } from "typeorm"

export class FriendsDto {
    id: string
    created_at: Timestamp
    updated_at: Timestamp
    from_user: string
    to_user: string
    status: string
}