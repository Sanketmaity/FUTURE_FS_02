import React, { useState } from 'react';
import { CreditCard, Lock, AlertCircle, CheckCircle } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  onPaymentSuccess: (transactionId: string) => void;
  onPaymentError: (error: string) => void;
  isProcessing: boolean;
  setIsProcessing: (processing: boolean) => void;
}

export function PaymentForm({ 
  amount, 
  onPaymentSuccess, 
  onPaymentError, 
  isProcessing, 
  setIsProcessing 
}: PaymentFormProps) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      const formatted = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
      if (formatted.length <= 19) {
        setPaymentData(prev => ({ ...prev, [name]: formatted }));
      }
    }
    // Format expiry date
    else if (name === 'expiryDate') {
      const formatted = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2');
      if (formatted.length <= 5) {
        setPaymentData(prev => ({ ...prev, [name]: formatted }));
      }
    }
    // Limit CVV to 4 digits
    else if (name === 'cvv') {
      const formatted = value.replace(/\D/g, '');
      if (formatted.length <= 4) {
        setPaymentData(prev => ({ ...prev, [name]: formatted }));
      }
    }
    else {
      setPaymentData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validatePayment = () => {
    const newErrors: Record<string, string> = {};

    if (!paymentData.cardNumber || paymentData.cardNumber.replace(/\s/g, '').length < 16) {
      newErrors.cardNumber = 'Please enter a valid card number';
    }

    if (!paymentData.expiryDate || paymentData.expiryDate.length < 5) {
      newErrors.expiryDate = 'Please enter a valid expiry date';
    }

    if (!paymentData.cvv || paymentData.cvv.length < 3) {
      newErrors.cvv = 'Please enter a valid CVV';
    }

    if (!paymentData.cardName.trim()) {
      newErrors.cardName = 'Please enter the cardholder name';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePayment()) {
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing with Stripe
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock successful payment
      const transactionId = 'txn_' + Math.random().toString(36).substr(2, 9);
      onPaymentSuccess(transactionId);
    } catch (error) {
      onPaymentError('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Lock className="h-5 w-5 text-blue-600" />
          <span className="text-sm font-medium text-blue-800">
            Secure Payment Processing
          </span>
        </div>
        <p className="text-sm text-blue-600 mt-1">
          Your payment information is encrypted and secure
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Card Number
          </label>
          <div className="relative">
            <input
              type="text"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              className={`w-full pl-10 pr-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.cardNumber ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <CreditCard className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          {errors.cardNumber && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.cardNumber}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Expiry Date
            </label>
            <input
              type="text"
              name="expiryDate"
              value={paymentData.expiryDate}
              onChange={handleInputChange}
              placeholder="MM/YY"
              className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.expiryDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.expiryDate && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.expiryDate}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CVV
            </label>
            <input
              type="text"
              name="cvv"
              value={paymentData.cvv}
              onChange={handleInputChange}
              placeholder="123"
              className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.cvv ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.cvv && (
              <p className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.cvv}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cardholder Name
          </label>
          <input
            type="text"
            name="cardName"
            value={paymentData.cardName}
            onChange={handleInputChange}
            placeholder="John Doe"
            className={`w-full px-3 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              errors.cardName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.cardName && (
            <p className="text-red-500 text-sm mt-1 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.cardName}
            </p>
          )}
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center text-lg font-semibold">
          <span>Total Amount:</span>
          <span className="text-blue-600">${amount.toFixed(2)}</span>
        </div>
      </div>

      <button
        type="submit"
        disabled={isProcessing}
        className={`w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:-translate-y-1 shadow-lg hover:shadow-xl'
        } text-white`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Processing Payment...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <Lock className="h-5 w-5" />
            <span>Pay ${amount.toFixed(2)}</span>
          </div>
        )}
      </button>

      <div className="text-center">
        <p className="text-xs text-gray-500">
          By completing your purchase, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </form>
  );
}