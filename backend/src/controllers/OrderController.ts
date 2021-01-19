import Koa from "koa"
import { tagsAll } from "koa-swagger-decorator"
import { Post, Request, Route } from "tsoa"

@tagsAll(["order"])
@Route("order")
export class OrderController {

    @Post("/")
    public async getAllOrder(@Request() request: Koa.Request) {
       return {
           orders: 10000
       }
    }
}
