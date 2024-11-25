import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database'; 
import RideModel from './ride.model';
import DriverModel from './driver.model';
import CustomerModel from './customer.model';

class RideCustomerDriverModel extends Model {
  public rideId!: number;
  public driverId!: number;
  public customerId!: string;
}

RideCustomerDriverModel.init(
  {
    rideId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: RideModel,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: DriverModel,
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    customerId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: {
        model: CustomerModel, 
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    underscored: true,
    tableName: 'ride_customer_driver',
    timestamps: false,
  }
);

RideModel.hasMany(RideCustomerDriverModel, {
    foreignKey: 'rideId',
    sourceKey: 'id',
  });
  
RideCustomerDriverModel.belongsTo(RideModel, {
    foreignKey: 'rideId',
    targetKey: 'id',
    as: 'ride'
});
  


  DriverModel.hasMany(RideCustomerDriverModel, {
    foreignKey: 'driverId',
    sourceKey: 'id',
  });
  
  RideCustomerDriverModel.belongsTo(DriverModel, {
    foreignKey: 'driverId',
    targetKey: 'id',
    as: 'driver'
  });
  


  CustomerModel.hasMany(RideCustomerDriverModel, {
    foreignKey: 'customerId',
    sourceKey: 'id',
  });
  
  RideCustomerDriverModel.belongsTo(CustomerModel, {
    foreignKey: 'customerId',
    targetKey: 'id',
  });

export default RideCustomerDriverModel;
