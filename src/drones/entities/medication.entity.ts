import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import Drones from './drone.entity';

@Table({
  timestamps: true,
  underscored: true,
  tableName: 'medications',
})
export default class Medication extends Model<Medication> {
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
    allowNull: false,
  })
  id: string;

  // s

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  weight: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  code: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  image: string;
}
