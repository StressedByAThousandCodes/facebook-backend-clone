export class UserDto {
    id : number
    firstName : string
    lastName : string
    email : string
    password : string
}


export class UserPayload {
    id : number
    firstName : string
    lastName : string
    email : string
}

export class UpdateUserDto {
    firstName : string
    lastName : string
}