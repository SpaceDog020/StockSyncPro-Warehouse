import { Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { Warehouse, WarehouseProduct } from './entities/warehouse.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Warehouse, WarehouseProduct])],
  controllers: [WarehouseController],
  providers: [WarehouseService],
})
export class WarehouseModule { }