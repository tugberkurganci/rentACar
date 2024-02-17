export interface RentalModel {
    carId: number;
    endDate: string | null;
    endKilometer: number | null;
    id: number;
    returnDate: string | null;
    startDate: string;
    startKilometer: number;
    totalPrice: number;
    userId: number;
    pickUpLocation?:string;
    dropOffLocation?:string;
  }
  