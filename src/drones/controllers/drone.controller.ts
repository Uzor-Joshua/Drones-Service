import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { DroneService } from '../services/drone.service';
import { JoiValidationPipe } from '../../globals/providers/validate/validate.pipe';
import { ResponseData } from '../dtos/response/data.response.dto';
import { IDrone } from '../../types/drone.types';
import {
  battery_schema,
  DroneDto,
  drone_schema,
  load_schema,
  medication_schema,
} from '../dtos/request/drone.data.request.dto';

@Controller('drones')
export class DroneController {
  constructor(private drone_service: DroneService) {}

  @UsePipes(new JoiValidationPipe(drone_schema))
  @Post('create')
  async create_drone(@Body() drone: DroneDto): Promise<ResponseData<IDrone>> {
    const data = await this.drone_service.build_Drone(drone);

    return {
      status: HttpStatus.OK,
      message: 'Drone successfully registered',
      data,
    };
  }

  @UsePipes(new JoiValidationPipe(medication_schema))
  @Post('add')
  async add_medication(@Body() drone: DroneDto): Promise<ResponseData<IDrone>> {
    const data = await this.drone_service.add_medication(drone);

    return {
      status: HttpStatus.OK,
      message: 'Medication successfully added to drone',
      data,
    };
  }

  @UsePipes(new JoiValidationPipe(load_schema))
  @Post('load')
  async load_medication(
    @Body() drone: DroneDto,
  ): Promise<ResponseData<IDrone>> {
    const data = await this.drone_service.load_medication(drone);

    return {
      status: HttpStatus.OK,
      message: 'Drone successfully loaded',
      data,
    };
  }

  @Get('medications/:serial_number')
  async get_medication(
    @Param() serial_number: DroneDto,
  ): Promise<ResponseData<IDrone>> {
    const data = await this.drone_service.get_medication(serial_number);

    return {
      status: HttpStatus.OK,
      message: 'Medication successfully retrived',
      data,
    };
  }

  @Get('available')
  async get_available(): Promise<ResponseData<IDrone>> {
    const data = await this.drone_service.get_available();

    return {
      status: HttpStatus.OK,
      message: 'Available drones successfully retrived',
      data,
    };
  }

  @UsePipes(new JoiValidationPipe(battery_schema))
  @Get('battery/:serial_number')
  async check_battery(
    @Param() { serial_number },
  ): Promise<ResponseData<IDrone>> {
    const data = await this.drone_service.check_battery(serial_number);

    return {
      status: HttpStatus.OK,
      message: 'Drones battery capacity retrived',
      data,
    };
  }
}
