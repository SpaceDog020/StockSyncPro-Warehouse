import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Warehouse } from "./entities/warehouse.entity";
import { CreateWarehouseRequest, WarehouseResponse } from "./warehouse.pb";

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
  ) { }

    async addWarehouse(request: CreateWarehouseRequest): Promise<WarehouseResponse> {
        const exist = await this.warehouseRepository.findOne({ where:{
            name: request.name
        }});
        if (exist) {
            console.log('El almacén ya existe');
            console.log(exist);
            const error = {
                message: 'El almacén ya existe',
            };
            return {
                warehouse: undefined,
                error: error,
            };
        }
        const warehouse: Warehouse = await this.warehouseRepository.save(request);
        return {
            warehouse: warehouse,
            error: undefined,
        };
    }
}