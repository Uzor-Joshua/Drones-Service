import { BadRequestException, Injectable } from '@nestjs/common';
import DroneRepository from '../repositories/drone.repository';
import { Op } from 'sequelize';
const not_available_state = ['LOADING', 'LOADED', 'DELIVERING'];
@Injectable()
export class DroneService {
  constructor(private drone_repository?: DroneRepository) {}

  async build_Drone(payload) {
    const [drone, created] = await this.drone_repository.create(payload);

    if (!created) {
      throw new BadRequestException('Drone already registered');
    }

    return drone;
  }

  async add_medication(payload) {
    const [medication, created] = await this.drone_repository.load(payload);

    if (!created) {
      throw new BadRequestException('Medication already exist');
    }

    return medication;
  }

  async create_medication(payload) {
    return this.drone_repository.create(payload);
  }

  async get_medication(payload) {
    return this.drone_repository.all_medication(payload);
  }

  async validate_drone(payload) {
    return this.drone_repository.create(payload);
  }

  async get_available() {
    const where = {
      state: 'IDLE',
    };
    return this.drone_repository.find_all(where);
  }

  async check_battery(serial_number) {
    const where = {
      serial_number,
    };
    const drone = await this.drone_repository.find(where);
    return `${drone.battery_capacity}%`;
  }

  async load_medication(load_details) {
    const { medication_code, drone_serial_number: serial_number } =
      load_details;

    const drone = await this.drone_repository.find({
      [Op.or]: [
        {
          serial_number,
        },
        {
          serial_number,
          state: {
            [Op.notIn]: not_available_state,
          },
        },
      ],
    });

    const availability_state = not_available_state.some(
      (state) => state === drone.state,
    );

    if (!drone || availability_state) {
      if (availability_state) {
        throw new BadRequestException('Drone is currently not avaialable');
      }
      throw new BadRequestException('Invalid drone');
    }

    const medication = await this.drone_repository.find_load({
      code: medication_code,
    });

    if (!medication) {
      throw new BadRequestException('Invalid medication');
    }

    if (+medication.weight > +drone.weight_limit) {
      throw new BadRequestException('Drone can not affored this load');
    }

    const drone_loaded_weight = await this.drone_repository.get_loaded_weight({
      drone_id: drone.id,
    });

    const extract_medications = drone_loaded_weight?.map(
      (weight) => weight.medication_id,
    );

    const sum_of_medications = await this.drone_repository.sum_load(
      extract_medications,
    );

    if (+sum_of_medications['total_weight'] >= drone.weight_limit) {
      throw new BadRequestException('Drone weight limit reached');
    }

    return this.drone_repository.load_weight({
      drone_id: drone.id,
      medication_id: medication.id,
    });
  }
}
