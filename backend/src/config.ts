export interface Config {
    port: number
    debugLogging: boolean
    jwtSecret: string
}

const isDevMode = process.env.NODE_ENV == "development"

const config: Config = {
    port: +(process.env.PORT || 3001),
    debugLogging: isDevMode,
    jwtSecret: process.env.JWT_SECRET,
}

export { config }
