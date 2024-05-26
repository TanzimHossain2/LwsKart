import { allTransactionData } from '@/backend/services/transaction';
import { currentUser } from '@/lib/authUser';
import React from 'react';
import { ObjectId } from 'mongodb';

interface Product {
  name: string;
  price: number;
}

interface Transaction {
  _id: string | ObjectId;
  userId: string | ObjectId;
  products: Product[];
  totalPrice: number;
  paymentMethod: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'failed';
  createdAt: string;
}

interface TransactionResponse {
  success?: Transaction[];
  error?: string;
}

const OrderPage = async () => {
  const user = await currentUser();
  const userId = user?.id || '';
  const allTransaction: any = await allTransactionData(userId);

  // Type guard for checking if the response contains transactions
  const hasTransactions = (response: TransactionResponse): response is { success: Transaction[] } => {
    return response.success !== undefined;
  };

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'text-green-600';
      case 'pending':
        return 'text-yellow-600';
      case 'cancelled':
        return 'text-red-600';
      case 'failed':
        return 'text-gray-600';
      default:
        return '';
    }
  };

  return (
    <div className='container py-10'>
      <h1 className='text-2xl font-bold mb-6'>Order History</h1>
      {hasTransactions(allTransaction) ? (
        allTransaction.success.length > 0 ? (
          <table className='min-w-full bg-white border border-gray-200'>
            <thead>
              <tr className='bg-gray-100 text-left'>
                <th className='py-3 px-4 border-b'>Order ID</th>
                <th className='py-3 px-4 border-b'>Total Price</th>
                <th className='py-3 px-4 border-b'>Payment Method</th>
                <th className='py-3 px-4 border-b'>Status</th>
                <th className='py-3 px-4 border-b'>Order Date</th>
                <th className='py-3 px-4 border-b'>Products</th>
              </tr>
            </thead>
            <tbody>
              {allTransaction.success.map((transaction, index) => (
                <tr key={transaction._id.toString()} className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                  <td className='py-3 px-4 border-b'>{transaction._id.toString()}</td>
                  <td className='py-3 px-4 border-b'>${transaction.totalPrice.toFixed(2)}</td>
                  <td className='py-3 px-4 border-b'>{transaction.paymentMethod}</td>
                  <td className={`py-3 px-4 border-b ${getStatusColor(transaction.status)}`}>
                    {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                  </td>
                  <td className='py-3 px-4 border-b'>{new Date(transaction.createdAt).toLocaleDateString()}</td>
                  <td className='py-3 px-4 border-b'>
                    <ul className='list-disc list-inside space-y-1'>
                      {transaction.products.map((product, idx) => (
                        <li key={idx} className='flex justify-between'>
                          <span>{product.name}</span>
                          <span>${product.price.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className='text-gray-600'>No transactions found.</p>
        )
      ) : (
        <p className='text-red-600'>Error: {allTransaction.error}</p>
      )}
    </div>
  );
};

export default OrderPage;
