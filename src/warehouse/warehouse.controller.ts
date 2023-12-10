import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import {
  CreateWarehouseRequest,
  WarehouseResponse,
  ProductWHRequest,
  ProductWHResponse,
  DeleteProductWHRequest,
  UpdateWarehouseRequest,
  WarehouseRequest,
  AllWarehouseResponse,
  Empty,
} from './warehouse.pb';
import { WarehouseService } from './warehouse.service';

@Controller()
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @GrpcMethod('WarehouseService', 'addWh')
  async addWh(request: CreateWarehouseRequest): Promise<WarehouseResponse> {
    return this.warehouseService.addWarehouse(request);
  }

  @GrpcMethod('WarehouseService', 'addProductToWh')
  async addProductToWh(request: ProductWHRequest): Promise<ProductWHResponse> {
    return this.warehouseService.addProductToWarehouse(request);
  }

  @GrpcMethod('WarehouseService', 'deleteProductWh')
  async deleteProductWh(request: DeleteProductWHRequest): Promise<ProductWHResponse> {
    return this.warehouseService.deleteProductFromWarehouse(request);
  }

  @GrpcMethod('WarehouseService', 'updateWh')
  async updateWh(request: UpdateWarehouseRequest): Promise<WarehouseResponse> {
    return this.warehouseService.updateWarehouse(request);
  }

  @GrpcMethod('WarehouseService', 'updateStock')
  async updateStock(request: ProductWHRequest): Promise<ProductWHResponse> {
    return this.warehouseService.updateStock(request);
  }

  @GrpcMethod('WarehouseService', 'getWh')
  async getWh(request: WarehouseRequest): Promise<WarehouseResponse> {
    console.log("[.] getWh");
    return this.warehouseService.getWarehouse(request);
  }

  @GrpcMethod('WarehouseService', 'getAllWh')
  async getAllWh(request: Empty): Promise<AllWarehouseResponse> {
    console.log("[.] getAllWh");
    return this.warehouseService.getAllWarehouses();
  }
}
