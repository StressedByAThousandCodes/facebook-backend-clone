export class UserDto {
    accountId : number
    username : string
    email : string
    password : string

}


export class UserPayload {
    accountId : number
    username : string
    email : string
}

export class UpdateUserDto {
    username : string
}