import { api } from '@/lib/api/client';

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve(true);
    const script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Failed to load Razorpay script'));
    document.body.appendChild(script);
  });
}

export async function createOrder({ amount, currency = 'INR', receipt = undefined, notes = {} } = {}) {
  // Replace this with your backend endpoint which calls Razorpay Orders API.
  // Example: return api.post('/payments/razorpay/order', { amount, currency, receipt, notes });
  // No client-side fake orders; must be created on server. This function is unused unless explicitly enabled.
  throw new Error('createOrder() requires a backend endpoint. Set VITE_RAZORPAY_USE_ORDERS=false to use amount-only checkout.');
}

export async function openRazorpayCheckout({
  amount,
  currency = 'INR',
  name = 'Gnanify',
  description = 'Course Purchase',
  image = '/favicon.ico',
  order,
  prefill = {},
  notes = {},
  onSuccess,
  onFailure,
}) {
  await loadScript('https://checkout.razorpay.com/v1/checkout.js');
  const key = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_xxxxxxxxx';

  const useOrders = String(import.meta.env.VITE_RAZORPAY_USE_ORDERS || 'false') === 'true';
  let orderData = null;
  if (order) {
    orderData = order;
  } else if (useOrders) {
    // Will throw if not implemented server-side
    orderData = await createOrder({ amount, currency, notes });
  }

  const options = {
    key,
    amount: orderData ? orderData.amount : amount, // paise
    currency,
    name,
    description,
    image,
    ...(orderData ? { order_id: orderData.id } : {}),
    notes,
    prefill: {
      name: prefill.name || '',
      email: prefill.email || '',
      contact: prefill.contact || '',
    },
    theme: { color: '#f59e0b' },
    handler: async function (response) {
      try {
        // Optionally verify payment on backend
        // await api.post('/payments/razorpay/verify', response)
        onSuccess && onSuccess({ order: orderData, response });
      } catch (e) {
        onFailure && onFailure(e);
      }
    },
    modal: {
      ondismiss: function () {
        onFailure && onFailure(new Error('Payment cancelled'));
      },
    },
  };

  const rz = new window.Razorpay(options);
  rz.open();
}
