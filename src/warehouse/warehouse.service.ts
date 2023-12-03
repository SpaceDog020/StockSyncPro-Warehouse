import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Warehouse } from "./entities/warehouse.entity";
import { AllWarehouseResponse, CreateWarehouseRequest, WarehouseRequest, WarehouseResponse } from "./warehouse.pb";

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

    async getWarehouse(request: WarehouseRequest): Promise<WarehouseResponse> {
        const warehouse: Warehouse = await this.warehouseRepository.findOne({ where:{
            id: request.id
        }});
        if (!warehouse) {
            const error = {
                message: 'El almacén no existe',
            };
            return {
                warehouse: undefined,
                error: error,
            };
        }
        return {
            warehouse: warehouse,
            error: undefined,
        };
    }

    async getAllWarehouses(): Promise<AllWarehouseResponse> {
        const warehouses: Warehouse[] = await this.warehouseRepository.find();
        return {
            warehouses: warehouses,
            error: undefined,
        };
    }
}