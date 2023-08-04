import LoadedWeight from 'src/drones/entities/loaded_weight.entity';
import Drones from '../../entities/drone.entity';
import Medication from '../../entities/medication.entity';

export const DroneProviders = [
  {
    provide: 'DRONE_ENTITY',
    useValue: Drones,
  },
  {
    provide: 'MEDICATION_ENTITY',
    useValue: Medication,
  },
  {
    provide: 'LOADED_ENTITY',
    useValue: LoadedWeight,
  },
];
