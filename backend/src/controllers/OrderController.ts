import Koa from "koa"
import { tagsAll } from "koa-swagger-decorator"
import OrderService from "../services/OrderService"
import { Get, Post, Query, Request, Route } from "tsoa"

@tagsAll(["order"])
@Route("order")
export class OrderController {
    @Get("/")
    public async getAllOrder(@Request() request: Koa.Request) {
        const { lastId, limit } = request.query
        const orderService = new OrderService()
        const { order, total } = await orderService.getAllOrder(lastId, parseInt(limit, 10))
        return {
            total,
            order,
        }
    }

    @Get("{uid}")
    public async getOrderDetails(uid: string) {
        const orderService = new OrderService()
        const order = await orderService.getOrderDetails(uid)
        return {
            order,
        }
    }
}
