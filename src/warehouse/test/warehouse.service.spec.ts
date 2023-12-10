import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WarehouseService } from '../warehouse.service';
import { Warehouse, WarehouseProduct } from '../entities/warehouse.entity';


describe('WarehouseService', () => {
    let service: WarehouseService;
    let warehouseRepository: Repository<Warehouse>;
    let warehouseProductRepository: Repository<WarehouseProduct>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                TypeOrmModule.forRoot({
                    type: 'sqlite',
                    database: ':memory:',
                    entities: [Warehouse, WarehouseProduct],
                    synchronize: true,
                }),
            ],
            providers: [
                WarehouseService,
                {
                    provide: getRepositoryToken(Warehouse),
                    useClass: Repository,
                },
                {
                    provide: getRepositoryToken(WarehouseProduct),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<WarehouseService>(WarehouseService);
        warehouseRepository = module.get<Repository<Warehouse>>(getRepositoryToken(Warehouse));
        warehouseProductRepository = module.get<Repository<WarehouseProduct>>(getRepositoryToken(WarehouseProduct));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getWarehouse', () => {
        it('should return a warehouse', async () => {
            const warehouse: Warehouse = {
                id: 1,
                name: 'Test 1',
                location: 'Test 123',
            };
            jest.spyOn(warehouseRepository, 'findOne').mockResolvedValueOnce(warehouse);
            const result = await service.getWarehouse({ id: 1 });
            expect(result).toEqual({
                warehouse: warehouse,
                error: undefined,
            });
        });
    });

    describe('getAllWarehouses', () => {
        it('should return a list of warehouses', async () => {
            const warehouses: Warehouse[] = [
                {
                    id: 1,
                    name: 'Test 1',
                    location: 'Test 123',
                },
                {
                    id: 2,
                    name: 'Test 2',
                    location: 'Test 123',
                },
            ];
            jest.spyOn(warehouseRepository, 'find').mockResolvedValueOnce(warehouses);
            const result = await service.getAllWarehouses();
            expect(result).toEqual({
                warehouses: warehouses,
                error: undefined,
            });
        });
    });

    describe('updateWarehouse', () => {
        it('should return a warehouse', async () => {
            const warehouse: Warehouse = {
                id: 1,
                name: 'Test 1',
                location: 'Test 123',
            };
            jest.spyOn(warehouseRepository, 'findOne').mockResolvedValueOnce(warehouse);
            jest.spyOn(warehouseRepository, 'save').mockResolvedValueOnce(warehouse);
            const result = await service.updateWarehouse(warehouse);
            expect(result).toEqual({
                warehouse: warehouse,
                error: undefined,
            });
        });

        it('should return an error', async () => {
            const warehouse: Warehouse = {
                id: 1,
                name: 'Test 1',
                location: 'Test 123',
            };
            jest.spyOn(warehouseRepository, 'findOne').mockResolvedValueOnce(undefined);
            const result = await service.updateWarehouse(warehouse);
            expect(result).toEqual({
                warehouse: undefined,
                error: {
                    message: 'El almacén no existe',
                },
            });
        });
    });

    describe('updateStock', () => {
        it('should return a warehouse', async () => {
            const warehouseProduct: WarehouseProduct = {
                id: 1,
                idProduct: 1,
                idWH: 1,
                stock: 1,
            };
            jest.spyOn(warehouseProductRepository, 'findOne').mockResolvedValueOnce(warehouseProduct);
            jest.spyOn(warehouseProductRepository, 'save').mockResolvedValueOnce(warehouseProduct);
            const result = await service.updateStock(warehouseProduct);
            expect(result).toEqual({
                success: true,
                error: undefined,
            });
        });

        it('should return an error', async () => {
            const warehouseProduct: WarehouseProduct = {
                id: 1,
                idProduct: 1,
                idWH: 1,
                stock: 1,
            };
            jest.spyOn(warehouseProductRepository, 'findOne').mockResolvedValueOnce(undefined);
            const result = await service.updateStock(warehouseProduct);
            expect(result).toEqual({
                success: false,
                error: {
                    message: 'El producto no existe en el almacén',
                },
            });
        });
    });

    describe('addWarehouse', () => {
        it('should return a warehouse', async () => {
            const warehouse: Warehouse = {
                id: 1,
                name: 'Test 1',
                location: 'Test 123',
            };
            jest.spyOn(warehouseRepository, 'findOne').mockResolvedValueOnce(undefined);
            jest.spyOn(warehouseRepository, 'save').mockResolvedValueOnce(warehouse);
            const result = await service.addWarehouse(warehouse);
            expect(result).toEqual({
                warehouse: warehouse,
                error: undefined,
            });
        });
    });
});