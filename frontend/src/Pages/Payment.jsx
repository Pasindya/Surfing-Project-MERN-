import React from 'react';
import Headernav from '../Components/Headernav';  // Adjust the path as needed
import Footer from '../Components/Footer';        // Adjust the path as needed

export default function Payment() {
  return (
    <div className="flex flex-col min-h-screen">
      <Headernav />

      <main className="flex-grow p-6 bg-gray-100">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Payment
        </h1>

        {/* Payment Content */}
        <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6">
          <h2 className="text-3xl font-semibold mb-4">Complete Your Payment</h2>
          <p className="text-gray-700 mb-6">
            Please fill in your payment details below to complete your purchase. Ensure all information is correct before submitting.
          </p>

          {/* Payment Form */}
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="1234 5678 9012 3456"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expiryDate">
                Expiry Date
              </label>
              <input
                type="text"
                id="expiryDate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="MM/YY"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
                CVV
              </label>
              <input
                type="text"
                id="cvv"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="123"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition-colors"
              >
                Pay Now
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}