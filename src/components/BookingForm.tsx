import React, { useState } from 'react';
import { PaymentForm } from './PaymentForm';
import { packages } from '../data/packages';

export const BookingForm = () => {
  const [paymentOption, setPaymentOption] = useState<'full' | 'partial'>('full');
  const [selectedPackage, setSelectedPackage] = useState(packages[0]);
  const [showPayment, setShowPayment] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    setShowPayment(false);
    alert('Payment successful! We will contact you shortly.');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300">
      {!showPayment ? (
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Package</label>
            <select
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white transition-colors duration-300"
              value={selectedPackage.id}
              onChange={(e) => setSelectedPackage(packages.find(p => p.id === e.target.value) || packages[0])}
            >
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.name} - KSH {pkg.price}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
            <input
              type="text"
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white transition-colors duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Email</label>
            <input
              type="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white transition-colors duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Phone</label>
            <input
              type="tel"
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white transition-colors duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Date</label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white transition-colors duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Time</label>
            <input
              type="time"
              required
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white transition-colors duration-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Payment Option</label>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="full"
                  checked={paymentOption === 'full'}
                  onChange={() => setPaymentOption('full')}
                  className="h-4 w-4 border-gray-300 dark:border-gray-600 text-black dark:text-white focus:ring-black dark:focus:ring-white transition-colors duration-300"
                />
                <label className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  Full Payment (KSH {selectedPackage.price})
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="payment"
                  value="partial"
                  checked={paymentOption === 'partial'}
                  onChange={() => setPaymentOption('partial')}
                  className="h-4 w-4 border-gray-300 dark:border-gray-600 text-black dark:text-white focus:ring-black dark:focus:ring-white transition-colors duration-300"
                />
                <label className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-200">
                  65% Upfront Payment (KSH {Math.round(selectedPackage.price * 0.65)})
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
          >
            Proceed to Payment
          </button>
        </form>
      ) : (
        <div>
          <h3 className="text-xl font-bold mb-4 dark:text-white">Payment Details</h3>
          <PaymentForm
            packageId={selectedPackage.id}
            totalAmount={selectedPackage.price}
            onSuccess={handlePaymentSuccess}
          />
        </div>
      )}
    </div>
  );
};