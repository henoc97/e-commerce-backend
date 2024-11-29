import { Injectable } from "@nestjs/common";

import { OnModuleDestroy } from "@nestjs/common";

import { OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Database connection failed:', error);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}

