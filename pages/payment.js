import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import CheckoutWizard from '../components/CheckoutWizard';
import Layout2 from '../components/Layout2';
import { Store } from '../utils/Store';

export default function PaymentScreen() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');

  const { state, dispatch } = useContext(Store);
  const { favorites } = state;
  const { paymentMethod } = favorites;

  const router = useRouter();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Payment method is required');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    Cookies.set(
      'favorites',
      JSON.stringify({
        ...favorites,
        paymentMethod: selectedPaymentMethod,
      })
    );

    router.push('/placeorder');
  };
  useEffect(() => {
    setSelectedPaymentMethod(paymentMethod || '');
  }, [paymentMethod, router]);

  return (
    <div className="">
      <Layout2 title="Payment Method">
        <CheckoutWizard activeStep={1} />
        <form className=" mx-auto max-w-screen-md" onSubmit={submitHandler}>
          <h1 className="flex justify-center mb-4 text-xl">Payment Method</h1>
          {['PayPal', 'M-pesa', 'Bank Card'].map((payment) => (
            <div key={payment} className="flex justify-center mb-4">
              <input
                name="paymentMethod"
                className="p-2 outline-none focus:ring-0"
                id={payment}
                type="radio"
                checked={selectedPaymentMethod === payment}
                onChange={() => setSelectedPaymentMethod(payment)}
              />

              <label className="p-2" htmlFor={payment}>
                {payment}
              </label>
            </div>
          ))}
          <div className="mb-4 flex flex justify-center">
            <button className="rounded bg-sky-600 hover:bg-sky-700 text-white font-bold py-2 px-4 ">
              Next
            </button>
          </div>
        </form>
      </Layout2>
    </div>
  );
}

PaymentScreen.auth = true;
