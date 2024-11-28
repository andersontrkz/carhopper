
import { rides } from '@/database/seeders/data/rides.data';
import { drivers } from '@/database/seeders/data/drivers.data';
import { customers } from '@/database/seeders/data/customers.data';
import { rideCustomerDriverRelations } from '@/database/seeders/data/ride_customer_model.data';

import database from '..';
import CustomerModel from '../models/customer.model';
import DriverModel from '../models/driver.model';
import RideModel from '../models/ride.model';
import RideCustomerDriverModel from '../models/ride_customer_driver.model';
import ReviewModel from '../models/review.model';
import { reviews } from './data/reviewsData';

const seedDatabase = async () => {
  try {
    await database.sync({ force: true, alter: true });

    console.log("[Database]: Synchronization complete.");

    await DriverModel.bulkCreate(drivers);
    console.log("[Database]: Drivers table seeded.");

    await CustomerModel.bulkCreate(customers);
    console.log("[Database]: Customers table seeded.");

    await ReviewModel.bulkCreate(reviews);
    console.log("[Database]: Reviews table seeded.");

    await RideModel.bulkCreate(rides);
    console.log("[Database]: Rides table seeded.");

    await RideCustomerDriverModel.bulkCreate(rideCustomerDriverRelations);
    console.log("[Database]: Ride-Customer-Driver relations table seeded.");

    console.log("[Database]: All tables seeded successfully.");
  } catch (error) {
    console.error("[Database]: Error during seeding - ", error);
  } finally {
    await database.close();
  }
};

seedDatabase();
