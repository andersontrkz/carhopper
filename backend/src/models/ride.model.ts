import { Model, DataTypes } from "sequelize";
import sequelize from "../config/database";
import { RideEntity } from "../entities/ride.entity";

class RideModel extends Model implements RideEntity {
    public id!: number;
    public origin!: string;
    public destination!: string;
    public distance!: number;
    public duration!: string;
    public value!: number;
    public date!: Date;

    static fromModel(model: RideModel): RideEntity {
        return new RideEntity(model);
    }
}

RideModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    origin: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      destination: {
          type: DataTypes.STRING(255),
          allowNull: true,
      },

    distance: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duration: {
        type: DataTypes.STRING(255),
        allowNull: true,
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      field: "created_at",
    },
  },
  {
    sequelize,
    tableName: "rides",
    underscored: true,
    timestamps: true,
  }
);

export default RideModel;
