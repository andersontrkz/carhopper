import { Op, Transaction } from "sequelize";

import DriverModel from "@/database/models/driver.model";
import ReviewModel from "@/database/models/review.model";
import { DriverDTO } from "@/types/dtos/driver.dto";

const getAvaiableDriversWithReview = async (distance: number) => {
    const drivers = await DriverModel.findAll({
        where: {
            minKm: { [Op.lte]: distance }
        },
        include: [{
            model: ReviewModel,
            attributes: ['rating', 'comment'],
            as: 'review'
        }],
        order: [
            ['pricePerKm', 'ASC']
          ]
      });

    return drivers.map((driver) => DriverDTO.fromModel(driver));
};

const getDriverByPk = async (driverId: number, transaction?: Transaction) => {
    const customer = await DriverModel.findByPk(driverId, { transaction });

    return customer;
};

const DriverService = {
    getAvaiableDriversWithReview,
    getDriverByPk,
};

export default DriverService;
