import Koa, { Context, Next } from "koa"
import cors from "@koa/cors"
import bodyParser from "koa-bodyparser"
import helmet from "koa-helmet"
import KoaStatic from "koa-static"
import path from "path"
import KoaRouter from "koa-router"

import "reflect-metadata"
import winston from "winston"

import { config } from "./config"
import { logger } from "./logger"

import { RegisterRoutes } from "../build/routes"

import "./controllers"
import { AuthResponse, AuthService } from "./services/AuthService"

import "./firebase"

require("dotenv").config()


const app = new Koa()

// Provides important security headers to make your app more secure
app.use(helmet())

// Enable cors with default options
app.use(cors())

// Logger middleware -> use winston as logger (logging.ts with config)
app.use(logger(winston))

// Enable bodyParser with default options
app.use(bodyParser())

app.use(KoaStatic(path.join(__dirname, "public")))

const router = new KoaRouter()
RegisterRoutes(router)

/**
 * Middleware to authenticate header token
 */
app.use(async (ctx: Context, next: Next) => {
    const auth: AuthResponse = await AuthService.authenticate(ctx.header?.token)
    if (Boolean(auth?.uid)) {
        await next()
    } else {
        ctx.status = 401
        ctx.body = {
            error: true,
            message: "Authentication required.",
        }
    }
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(config.port)

console.log(`Server running on port ${config.port} :) :) :)`)
