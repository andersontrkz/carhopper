import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { ReviewEntity } from "../entities/review.entity";
import Driver from "./driver.model";

class ReviewModel extends Model implements ReviewEntity {
  public id!: number;
  public driverId!: number;
  public rating!: number;
  public comment!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  static fromModel(model: ReviewModel): ReviewEntity {
    return new ReviewEntity(model);
  }
}

ReviewModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    driverId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Driver,
        key: "id",
      },
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    comment: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: "reviews",
    underscored: true,
    timestamps: true,
  }
);

export default ReviewModel;
