import { Sequelize } from 'sequelize-typescript';
import Drones from 'src/drones/entities/drone.entity';
import LoadedWeight from 'src/drones/entities/loaded_weight.entity';
import Medication from 'src/drones/entities/medication.entity';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const databaseConfig = require('../../core/config');

// /home/idunyelc/backend.idunu.co
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let config;
      switch (databaseConfig.appEnv) {
        case 'DEVELOPMENT':
          config = databaseConfig.database;
          break;
        default:
          config = databaseConfig.database;
      }
      const sequelize = new Sequelize({
        // repositoryMode: true,
        ...config,
      });
      sequelize.addModels([Drones, Medication, LoadedWeight]);
      return sequelize;
    },
  },
];
