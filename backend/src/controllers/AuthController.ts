import Koa from "koa"
import { tagsAll } from "koa-swagger-decorator"
import { Get, Request, Route } from "tsoa"
import { AuthService } from "../services/AuthService"

@tagsAll(["auth"])
@Route("auth")
export class AuthController {
    
    @Get("/")
    public async authenticate(@Request() request: Koa.Request) {
        return await AuthService.authenticate(request.header?.token)
    }
}
