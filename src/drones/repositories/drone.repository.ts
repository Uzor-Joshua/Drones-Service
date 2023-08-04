import { Inject, Injectable } from '@nestjs/common';
import Drone from '../entities/drone.entity';
import LoadedWeight from '../entities/loaded_weight.entity';
import Medication from '../entities/medication.entity';
import { Sequelize } from 'sequelize';

@Injectable()
export default class DroneRepository {
  constructor(
    @Inject('DRONE_ENTITY')
    private readonly drone_entity: typeof Drone,
    @Inject('MEDICATION_ENTITY')
    private readonly medication_entity: typeof Medication,
    @Inject('LOADED_ENTITY')
    private readonly loaded_weight: typeof LoadedWeight,
  ) {}

  find(where): Promise<Drone> {
    return this.drone_entity.findOne<Drone>({
      where,
    });
  }

  find_load(where): Promise<Medication> {
    return this.medication_entity.findOne<Medication>({
      where,
    });
  }

  sum_load(medications): Promise<Medication> {
    return this.medication_entity.findOne({
      where: {
        id: medications,
      },
      attributes: [
        [Sequelize.fn('SUM', Sequelize.col('weight')), 'total_weight'],
      ],
      raw: true,
    });
  }

  find_all(where): Promise<Drone[]> {
    return this.drone_entity.findAll<Drone>({
      where,
    });
  }

  all_medication(where): Promise<Drone> {
    return this.drone_entity.findOne<Drone>({
      where,
      include: [
        {
          model: this.loaded_weight,
          include: [
            {
              model: this.medication_entity,
            },
          ],
        },
      ],
    });
  }

  create(drone): Promise<[Drone, boolean]> {
    return this.drone_entity.findOrCreate<Drone>({
      where: {
        serial_number: drone.serial_number,
      },
      defaults: drone,
    });
  }

  load(medication): Promise<[Medication, boolean]> {
    return this.medication_entity.findOrCreate<Medication>({
      where: {
        code: medication.code,
      },
      defaults: medication,
    });
  }

  load_weight(weight): Promise<LoadedWeight> {
    return this.loaded_weight.create<LoadedWeight>(weight);
  }

  get_loaded_weight(where): Promise<LoadedWeight[]> {
    return this.loaded_weight.findAll<LoadedWeight>(where);
  }
}
