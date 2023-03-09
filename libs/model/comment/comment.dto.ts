export class CommentDto {
    id : number
    to_user: number
    comment: string
    ref_post_id: number
}

export class UpdateCommentDto {
    comment: string
}