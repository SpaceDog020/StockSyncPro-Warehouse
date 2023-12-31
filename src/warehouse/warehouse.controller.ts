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
  AllProductWHRequest,
  AllProductWHResponse,
} from './warehouse.pb';
import { WarehouseService } from './warehouse.service';

@Controller()
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @GrpcMethod('WarehouseService', 'addWh')
  async addWh(request: CreateWarehouseRequest): Promise<WarehouseResponse> {
    console.log("[.] addWh");
    return this.warehouseService.addWarehouse(request);
  }

  @GrpcMethod('WarehouseService', 'addProductToWh')
  async addProductToWh(request: ProductWHRequest): Promise<ProductWHResponse> {
    console.log("[.] addProductToWh");
    return this.warehouseService.addProductToWarehouse(request);
  }

  @GrpcMethod('WarehouseService', 'deleteProductWh')
  async deleteProductWh(request: DeleteProductWHRequest): Promise<ProductWHResponse> {
    console.log("[.] deleteProductWh");
    return this.warehouseService.deleteProductFromWarehouse(request);
  }

  @GrpcMethod('WarehouseService', 'updateWh')
  async updateWh(request: UpdateWarehouseRequest): Promise<WarehouseResponse> {
    console.log("[.] updateWh");
    return this.warehouseService.updateWarehouse(request);
  }

  @GrpcMethod('WarehouseService', 'updateStock')
  async updateStock(request: ProductWHRequest): Promise<ProductWHResponse> {
    console.log("[.] updateStock");
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

  @GrpcMethod('WarehouseService', 'getAllProductWh')
  async getAllProductWh(request: AllProductWHRequest): Promise<AllProductWHResponse> {
    console.log("[.] getAllProductWh");
    return this.warehouseService.getAllProductWarehouse(request);
  }
}
