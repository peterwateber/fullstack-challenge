import Koa from "koa"
import { request, tagsAll } from "koa-swagger-decorator"
import OrderService from "../services/OrderService"
import { Controller, Get, Put, Request, Route, SuccessResponse } from "tsoa"
import { sanitizeInput } from "../utils/SanitizeInput"

@tagsAll(["order"])
@Route("order")
export class OrderController extends Controller {
    constructor(private readonly orderService = new OrderService()) {
        super()
    }

    @Get("/")
    public async getAllOrder(@Request() request: Koa.Request) {
        // const { lastId, limit } = request.query
        const { order, total } = await this.orderService.getAllOrder()
        return {
            total,
            order,
        }
    }

    @Get("{uid}")
    public async getOrderDetails(uid: string) {
        const order = await this.orderService.getOrderDetails(uid)
        return {
            order,
        }
    }

    @Put("{uid}")
    @SuccessResponse(204)
    public async updateOrderDetails(
        uid: string,
        @Request() request: Koa.Request
    ) {
        try {
            const { title, bookingDate } = sanitizeInput(request.body)
            await this.orderService.updateOrderDetails(uid, title, bookingDate)
        } catch (ex) {
            this.setStatus(400)
            return {
                error: true,
                title: "Validation Error",
                message: ex,
            }
        }
    }
}
