import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { DroneModule } from './drones/drone.module';

@Module({
  imports: [DatabaseModule, DroneModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
