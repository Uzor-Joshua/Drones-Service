import { Module } from '@nestjs/common';
import { DroneController } from './controllers/drone.controller';
import { DroneService } from './services/drone.service';
import DroneRepository from './repositories/drone.repository';
import { DroneProviders } from './controllers/providers/drone.provider';

@Module({
  controllers: [DroneController],
  providers: [DroneService, DroneRepository, ...DroneProviders],
  exports: [DroneService, DroneRepository, ...DroneProviders],
})
export class DroneModule {}
