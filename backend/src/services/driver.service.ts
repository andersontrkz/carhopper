import { Op } from "sequelize";
import { DriverDTO } from "../dtos/driver.dto";
import DriverModel from "../models/driver.model";
import ReviewModel from "../models/review.model";

const getAvaiableDriversWithReview = async (distance: number) => {
    const drivers = await DriverModel.findAll({
        where: {
            minKm: { [Op.gte]: distance }
        },
        include: [{
            model: ReviewModel,
            attributes: ['rating', 'comment'],
            as: 'review'
        }],
      });

    return drivers.map((driver) => DriverDTO.fromModel(driver));
};

const DriverService = {
    getAvaiableDriversWithReview,
};

export default DriverService;
