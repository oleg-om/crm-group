import {Secret} from "jsonwebtoken";

interface IConfig {
      secret: Secret,
      jwtExpiration: number,
      jwtRefreshExpiration: number
}

const config = {
      secret: process.env.JWT_SECRET_KEY,
      jwtExpiration: 3600,           // 1 hour
      jwtRefreshExpiration: 86400,   // 24 hours
}

export default config as IConfig
