import React from 'react';
import { packages } from '../data/packages';

export const Packages = () => {
  return (
    <section id="packages" className="py-20 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 dark:text-white">Our Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-colors duration-300 hover:shadow-xl">
              <img
                src={pkg.imageUrl}
                alt={pkg.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 dark:text-white">{pkg.name}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{pkg.description}</p>
                <div className="mb-4">
                  <p className="text-3xl font-bold dark:text-white">KSH {pkg.price}</p>
                  <p className="text-gray-500 dark:text-gray-400">or 65% upfront (KSH {Math.round(pkg.price * 0.65)})</p>
                </div>
                <ul className="mb-6 dark:text-gray-300">
                  {pkg.features.map((feature, index) => (
                    <li key={index} className="flex items-center mb-2">
                      <span className="mr-2 text-black dark:text-white">•</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <a
                  href="#book"
                  className="block w-full text-center bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300"
                >
                  Book Now
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};