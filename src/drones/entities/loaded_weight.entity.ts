import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import Drones from './drone.entity';
import Medication from './medication.entity';

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'loaded_weight',
})
export default class LoadedWeight extends Model<LoadedWeight> {
  // @ForeignKey(() => Medication)
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    allowNull: false,
  })
  id: string;

  @ForeignKey(() => Drones)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  drone_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    primaryKey: true,
  })
  medication_id: string;

  @HasOne(() => Medication)
  medication_details: Medication;
}
