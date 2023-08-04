import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import Medication from './medication.entity';
import LoadedWeight from './loaded_weight.entity';

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'drones',
})
export default class Drones extends Model<Drones> {
  @ForeignKey(() => LoadedWeight)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  serial_number: string;

  @Column({
    type: DataType.ENUM,
    defaultValue: 'LIGHTWEIGHT',
    values: ['LIGHTWEIGHT', 'MIDDLEWEIGHT', 'HEAVYWEIGHT', 'CRUISERWEIGHT'],
    allowNull: false,
  })
  model: string;

  @Column({
    type: DataType.ENUM,
    defaultValue: 'IDLE',
    values: [
      'IDLE',
      'LOADING',
      'LOADED',
      'DELIVERING',
      'DELIVERED',
      'RETURNING',
    ],
    allowNull: false,
  })
  state: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  weight_limit: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  battery_capacity: number;

  @HasMany(() => LoadedWeight)
  loaded_weight: LoadedWeight;
}
