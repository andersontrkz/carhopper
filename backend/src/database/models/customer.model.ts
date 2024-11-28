import { Model, DataTypes } from "sequelize";

import database from "..";
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
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
  },
  {
    sequelize: database,
    tableName: "customers",
    underscored: true,
    timestamps: true,
  }
);

export default CustomerModel;
