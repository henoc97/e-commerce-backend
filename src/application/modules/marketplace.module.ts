import { Module } from '@nestjs/common';
import { MarketplaceService } from '../services/marketplace.service';
import { MarketplaceRepository } from 'src/infrastructure/persistences/marketplace.repository.impl';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [
    MarketplaceService,
    PrismaService,
    {
      provide: 'IMarketplaceRepository',
      useClass: MarketplaceRepository,
    },
  ],
  exports: [MarketplaceService],
})
export class MarketplaceModule {}
