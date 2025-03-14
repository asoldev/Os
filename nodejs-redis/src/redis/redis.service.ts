import { Injectable, OnModuleInit, OnModuleDestroy } from "@nestjs/common";
import { createClient } from "redis";

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private client: any;
  private isConnected: boolean = false;

  async onModuleInit() {
    try {
      this.client = createClient({
        url: "redis://localhost:6379",
      });

      this.client.on("error", (err) => {
        console.error("Redis Client Error", err);
        this.isConnected = false;
      });

      this.client.on("connect", () => {
        console.log("Redis client connected successfully");
        this.isConnected = true;
      });

      await this.client.connect();
    } catch (error) {
      console.error("Failed to connect to Redis:", error);
      this.isConnected = false;
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
    }
  }

  getConnectionStatus(): boolean {
    return this.isConnected;
  }

  async pingRedis(): Promise<string> {
    try {
      return await this.client.ping();
    } catch (error) {
      console.error("Redis ping failed:", error);
      return "FAILED";
    }
  }
}
