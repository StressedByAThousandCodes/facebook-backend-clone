import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt'
import { SpotifyService } from "src/spotify/spotify.service";


export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private userService: SpotifyService) {
        super({
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : true,
            secretOrKey : "secret"
        });
    }

    async validate(payload : any){
        //console.log(payload)
        //const authUser = await this.userService.findUser(Number(payload.accountId))
        // // if (!authUser) {
        // //     console.log('no')
        // // }
        // console.log(authUser)
        return payload
    }
}