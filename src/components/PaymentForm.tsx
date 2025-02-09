import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface PaymentFormProps {
  packageId: string;
  totalAmount: number;
  onSuccess: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({ packageId, totalAmount, onSuccess }) => {
  const [amount, setAmount] = useState<number>(totalAmount * 0.65);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const minAmount = totalAmount * 0.65;
    if (amount < minAmount) {
      setError(`Minimum payment required is ${minAmount} KSH`);
      setLoading(false);
      return;
    }

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { error: paymentError } = await supabase.from('payments').insert({
        user_id: user.id,
        package_id: packageId,
        amount: amount,
        total_amount: totalAmount,
        status: 'pending'
      });

      if (paymentError) throw paymentError;

      setTimeout(() => {
        setLoading(false);
        onSuccess();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Payment failed');
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
          Payment Amount (KSH)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          min={totalAmount * 0.65}
          max={totalAmount}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-black dark:focus:border-white focus:ring-black dark:focus:ring-white transition-colors duration-300"
          required
        />
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Minimum payment: {totalAmount * 0.65} KSH (65%)
        </p>
      </div>

      {error && (
        <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full bg-black dark:bg-white text-white dark:text-black py-3 px-4 rounded-md hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors duration-300 ${
          loading ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {loading ? 'Processing...' : 'Make Payment'}
      </button>
    </form>
  );
};