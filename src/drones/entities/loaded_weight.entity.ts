import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
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
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  drone_id: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  medication_id: string;
}
