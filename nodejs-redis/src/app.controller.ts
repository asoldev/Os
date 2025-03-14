import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { RedisService } from "./redis/redis.service";

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly redisService: RedisService
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get("redis-status")
  async getRedisStatus() {
    const isConnected = this.redisService.getConnectionStatus();
    const pingResult = await this.redisService.pingRedis();

    return {
      connected: isConnected,
      ping: pingResult,
      timestamp: new Date().toISOString(),
    };
  }
}
