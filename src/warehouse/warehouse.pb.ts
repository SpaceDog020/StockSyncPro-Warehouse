/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "warehouse";

export interface Empty {
}

export interface Error {
  message: string;
}

export interface Warehouse {
  id: number;
  name: string;
  location: string;
}

export interface CreateWarehouseRequest {
  name: string;
  location: string;
}

export interface WarehouseResponse {
  warehouse: Warehouse | undefined;
  error: Error | undefined;
}

export interface ProductWHRequest {
  idProduct: number;
  idWH: number;
  stock: number;
}

export interface ProductWHResponse {
  success: boolean;
  error: Error | undefined;
}

export interface DeleteProductWHRequest {
  idProduct: number;
  idWH: number;
}

export interface UpdateWarehouseRequest {
  id: number;
  name: string;
  location: string;
}

export interface WarehouseRequest {
  id: number;
}

export interface AllWarehouseResponse {
  warehouses: Warehouse[];
  error: Error | undefined;
}

export const WAREHOUSE_PACKAGE_NAME = "warehouse";

export interface WarehouseServiceClient {
  addWh(request: CreateWarehouseRequest): Observable<WarehouseResponse>;

  addProductToWh(request: ProductWHRequest): Observable<ProductWHResponse>;

  deleteProductWh(request: DeleteProductWHRequest): Observable<ProductWHResponse>;

  updateWh(request: UpdateWarehouseRequest): Observable<WarehouseResponse>;

  updateStock(request: ProductWHRequest): Observable<ProductWHResponse>;

  getWh(request: WarehouseRequest): Observable<WarehouseResponse>;

  getAllWh(request: Empty): Observable<AllWarehouseResponse>;
}

export interface WarehouseServiceController {
  addWh(
    request: CreateWarehouseRequest,
  ): Promise<WarehouseResponse> | Observable<WarehouseResponse> | WarehouseResponse;

  addProductToWh(
    request: ProductWHRequest,
  ): Promise<ProductWHResponse> | Observable<ProductWHResponse> | ProductWHResponse;

  deleteProductWh(
    request: DeleteProductWHRequest,
  ): Promise<ProductWHResponse> | Observable<ProductWHResponse> | ProductWHResponse;

  updateWh(
    request: UpdateWarehouseRequest,
  ): Promise<WarehouseResponse> | Observable<WarehouseResponse> | WarehouseResponse;

  updateStock(
    request: ProductWHRequest,
  ): Promise<ProductWHResponse> | Observable<ProductWHResponse> | ProductWHResponse;

  getWh(request: WarehouseRequest): Promise<WarehouseResponse> | Observable<WarehouseResponse> | WarehouseResponse;

  getAllWh(request: Empty): Promise<AllWarehouseResponse> | Observable<AllWarehouseResponse> | AllWarehouseResponse;
}

export function WarehouseServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "addWh",
      "addProductToWh",
      "deleteProductWh",
      "updateWh",
      "updateStock",
      "getWh",
      "getAllWh",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("WarehouseService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("WarehouseService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const WAREHOUSE_SERVICE_NAME = "WarehouseService";
