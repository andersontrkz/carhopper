import { IDriver } from "src/interfaces/driver.interface";

export const drivers: IDriver[] = [
    {
      id: 1,
      name: "Homer Simpson",
      description: "Hello! I'm Homer, your friendly driver! Relax and enjoy the ride, complete with donuts and good laughs (and maybe a few detours).",
      vehicle: "Plymouth Valiant 1973, pink and rusty",
      review: {
        rating: 2,        
        comment: "Friendly driver, but took a wrong turn 3 times. The car smells like donuts.",
      },
      pricePerKm: 2.50,
      minKm: 1,
    },
    {
      id: 2,
      name: "Dominic Toretto",
      description: "Hey, it's Dom. Hop in, I'll get you to your destination fast and safe. Just don't mess with the radio, the playlist is sacred.",
      vehicle: "Dodge Charger R/T 1970, modified",
      review: {
        rating: 4,        
        comment: "Amazing ride! The car is a showstopper, and the driver, despite looking a bit serious, was super nice. Highly recommend!",
      },
      pricePerKm: 5.00,
      minKm: 5,
    },
    {
      id: 3,
      name: "James Bond",
      description: "Good evening, I'm James Bond. At your service for a smooth and discreet ride. Buckle up and enjoy the journey.",
      vehicle: "Aston Martin DB5, classic",
      review: {
        rating: 5,        
        comment: "Impeccable service! The driver is the epitome of class, and the car is simply magnificent. An experience worthy of a secret agent.",
      },
      pricePerKm: 10.00,
      minKm: 10,
    }
];
    