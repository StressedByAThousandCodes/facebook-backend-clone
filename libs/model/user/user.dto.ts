export class UserDto {
    accountId : number
    firstName : string
    lastName : string
    username : string
    email : string
    password : string

}

export class UpdateUserDto {
    firstName : string
    lastName : string
    username : string
}