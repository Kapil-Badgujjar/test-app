import Stripe from 'stripe';
// import type { NextApiRequest, NextApiResponse } from 'next';
import { DATABASE } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import { randomBytes } from 'crypto';


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export const POST =  async(
  req: Request,
  res: NextResponse
) => {

    try {
      const { userId, address, crypto } = await req.json(); // Assuming array of product objects
    

      const cartItems:CartProduct[] = await DATABASE.cart.findMany({
        where: {userId},
        select: { 
            id: true,
            quantity: true,
            product: { 
              select : { id: true, image: true, productName: true, price: true, offer: true, sellerId: true }
        }}});

        const orderData = cartItems.map((item)=>{
          const bytes = randomBytes(16);
          const shipmentTrackingIdValue = bytes.toString('hex');
          return {
              paymentId: crypto,
              userId: userId,
              address: address,
              productId: item.product.id,
              sellerId: item.product.sellerId,
              quantity: item.quantity,
              amount: item.quantity * item.product.price,
              shipmentTrackingId: shipmentTrackingIdValue,
              orderDate: new Date().toISOString(),
              cancelationRequest: false
          }
      });

        const result = await DATABASE.order.createMany({data: orderData})

      // Calculate total amount based on cart items
      let totalAmount = 0;
      cartItems.forEach((item) => {
        totalAmount += item.product.price * item.quantity; // Assuming price and quantity properties
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: cartItems.map((item) => ({
          price_data: {
            currency: 'INR', // Or your desired currency
            product_data: {
              name: item.product.productName,
              // description: item.product.productName,
            },
            unit_amount: item.product.price * 100, // Convert to cents
          },
          quantity: item.quantity,
        })),
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/order/success/${crypto}`, // Redirect on successful payment
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/order/cart/${crypto}`, // Redirect on cancellation
      });
      return new NextResponse(JSON.stringify({ sessionId: session.id, url: session?.url }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
      return new NextResponse(JSON.stringify({ statusCode: 500, message: 'Failed to create Stripe session' }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
}
