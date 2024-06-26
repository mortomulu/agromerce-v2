// pages/api/createTransaction.js
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import midtransClient from "midtrans-client"

const mode = process.env.NEXT_PUBLIC_RUNNING_MODE || 'development';

// Create Snap API instance
const snap = new midtransClient.Snap({
  isProduction: mode === 'production',
  serverKey: process.env.NEXT_SECRET_MIDTRANS_SERVER_KEY,
  clientKey: process.env.NEXT_SECRET_MIDTRANS_CLIENT_KEY,
});

export async function POST(request) {
  const { items, userDetails } = await request.json();
  

  const transactionDetails = {
    order_id: `order-id-${Date.now()}`,
    gross_amount: items.reduce(
      (acc , item ) => acc + item.product.price * item.quantity,
      0
    )
  };

  console.log(userDetails)

  console.log(transactionDetails)

  const itemDetails = items.map((item ) => ({
    id: item.id,
    price: item.product.price,
    quantity: item.quantity,
    name: item.product.product_name,
  }));

  const parameter = {
    transaction_details: transactionDetails,
    item_details: itemDetails,
    customer_details: userDetails,
  };

  console.log(parameter)

  try {
    const transaction = await snap.createTransaction(parameter);
    if(!transaction) throw error
    console.log(transaction)
    return NextResponse.json({transaction});
  } catch (error ) {
    return NextResponse.json({ error: error.message });
  }
}
