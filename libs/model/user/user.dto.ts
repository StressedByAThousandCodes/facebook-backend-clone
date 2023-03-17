export class UserDto {
    id : string
    firstName : string
    lastName : string
    email : string
    password : string
}


export class UserPayload {
    id : string
    firstName : string
    lastName : string
    email : string
}

export class UpdateUserDto {
    firstName : string
    lastName : string
}

export class SearchUserDto {
    name: string
}