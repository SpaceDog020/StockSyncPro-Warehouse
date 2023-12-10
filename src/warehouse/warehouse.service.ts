import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Warehouse, WarehouseProduct } from "./entities/warehouse.entity";
import { AllWarehouseResponse, CreateWarehouseRequest, DeleteProductWHRequest, ProductWHRequest, ProductWHResponse, UpdateWarehouseRequest, WarehouseRequest, WarehouseResponse } from "./warehouse.pb";

@Injectable()
export class WarehouseService {
  constructor(
    @InjectRepository(Warehouse)
    private warehouseRepository: Repository<Warehouse>,
    @InjectRepository(WarehouseProduct)
    private warehouseProductRepository: Repository<WarehouseProduct>
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

    async addProductToWarehouse(request: ProductWHRequest): Promise<ProductWHResponse> {
        const exist = await this.warehouseProductRepository.findOne({ where:{
            idProduct: request.idProduct,
            idWH: request.idWH
        }});
        if (exist) {
            const error = {
                message: 'El producto ya existe en el almacén',
            };
            return {
                success: false,
                error: error,
            };
        }
        await this.warehouseProductRepository.save(request);
        return {
            success: true,
            error: undefined,
        };
    }

    async deleteProductFromWarehouse(request: DeleteProductWHRequest): Promise<ProductWHResponse> {
        const exist = await this.warehouseProductRepository.findOne({ where:{
            idProduct: request.idProduct,
            idWH: request.idWH
        }});
        if (!exist) {
            const error = {
                message: 'El producto no existe en el almacén',
            };
            return {
                success: false,
                error: error,
            };
        }
        await this.warehouseProductRepository.delete(exist);
        return {
            success: true,
            error: undefined,
        };
    }

    async updateWarehouse(request: UpdateWarehouseRequest): Promise<WarehouseResponse> {
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
        warehouse.name = request.name;
        warehouse.location = request.location;
        await this.warehouseRepository.save(warehouse);
        return {
            warehouse: warehouse,
            error: undefined,
        };
    }

    async updateStock(request: ProductWHRequest): Promise<ProductWHResponse> {
        const exist = await this.warehouseProductRepository.findOne({ where:{
            idProduct: request.idProduct,
            idWH: request.idWH
        }});
        if (!exist) {
            const error = {
                message: 'El producto no existe en el almacén',
            };
            return {
                success: false,
                error: error,
            };
        }
        await this.warehouseProductRepository.update(exist, request);
        return {
            success: true,
            error: undefined,
        };
    }
}