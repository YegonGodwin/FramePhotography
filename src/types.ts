export interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  imageUrl: string;
}

export interface Booking {
  id: string;
  packageId: string;
  date: string;
  time: string;
  clientName: string;
  email: string;
  phone: string;
  paymentOption: 'full' | 'partial';
  status: 'pending' | 'confirmed' | 'completed';
  amountPaid: number;
}