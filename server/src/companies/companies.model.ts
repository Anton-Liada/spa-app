import {
  Model,
  Table,
  Column,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/users/users.model';

interface CompanyCreationAttrs {
  id: number;
  userId: number;
  name: string;
  address: string;
  serviceOfActivity: string;
  numberOfEmployees: number;
}

@Table({ tableName: 'companies' })
export class Company extends Model<Company, CompanyCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  address: string;

  @Column({ type: DataType.STRING, allowNull: false })
  serviceOfActivity: string;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;

  @Column({ type: DataType.INTEGER })
  numberOfEmployees: number;

  @Column({ type: DataType.STRING, allowNull: false })
  type: string;

  @BelongsTo(() => User)
  author: User;
}
