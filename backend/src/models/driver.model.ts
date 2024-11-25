import { Model, DataTypes } from "sequelize";

import sequelize from "../config/database";
import { DriverEntity } from "../entities/driver.entity";
import ReviewModel from "./review.model";
import RideModel from "./ride.model";

class DriverModel extends Model implements DriverEntity {
  public id!: number;
  public name!: string;
  public description!: string;
  public vehicle!: string;
  public pricePerKm!: number;
  public minKm!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public review!: ReviewModel;

  static fromModel(driverModel: DriverModel): DriverEntity {
    return new DriverEntity(driverModel);
  }
}

DriverModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    vehicle: {
      type: DataTypes.STRING(80),
      allowNull: false,
    },
    pricePerKm: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    minKm: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "drivers",
    underscored: true,
    timestamps: true,
  }
);

DriverModel.hasOne(ReviewModel, {
  foreignKey: "driverId",
  sourceKey: "id",
  as: 'review'
});

ReviewModel.belongsTo(DriverModel, {
  foreignKey: "driverId",
  targetKey: "id",
});

RideModel.belongsToMany(DriverModel, {
  through: 'ride_customer_driver',
  otherKey: 'driverId',
});

DriverModel.belongsToMany(RideModel, {
  through: 'ride_customer_driver',
  foreignKey: 'driverId',
  otherKey: 'rideId',
});

export default DriverModel;
