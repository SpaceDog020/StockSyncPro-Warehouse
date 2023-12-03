import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { protobufPackage } from './warehouse/warehouse.pb';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule, 
    {
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:5001',
        package: protobufPackage,
        protoPath: join('node_modules/protos/proto/warehouse.proto')
      }
    }
  );
  await app.listen();
  console.log("[*] Awaiting GRPC requests");
}
bootstrap();
