import { Model, DataTypes } from "sequelize";

import sequelize from "../config/database";
import ReviewModel from "./review.model";
import { CustomerEntity } from "../entities/customer.entity";

class CustomerModel extends Model implements CustomerEntity {
  public id!: string;
  public name!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public review!: ReviewModel;

  static fromModel(customerModel: CustomerModel): CustomerEntity {
    return new CustomerEntity(customerModel);
  }
}

CustomerModel.init(
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
  },
  {
    sequelize,
    tableName: "customers",
    underscored: true,
    timestamps: true,
  }
);

export default CustomerModel;
