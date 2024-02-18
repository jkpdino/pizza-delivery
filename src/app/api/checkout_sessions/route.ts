import { getOrder } from "@/actions/Order";
import { getMenuItems } from "@/controllers/MenuController";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
  try {
    const {
      orderId
    } = await req.json();

    const orderModel = await getOrder(orderId as string);
    if (!orderModel) {
      return NextResponse.json({error: "Order not found"}, {status: 400})
    }

    const menuItems = await getMenuItems();

    const lineItems = orderModel.items.map((item) => {
      const menuItem = menuItems.find((menuItem) => menuItem.id === item.menuItemId)!;
      return {
        price_data: {
          currency: "USD",
          product_data: {
            name: menuItem.title,
          },
          unit_amount: menuItem.price * 100,
        },
        quantity: item.count,
      }
    })

    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      payment_method_types: ['card'],
      success_url: `${req.headers.get("origin")}/tracker?id=${orderId}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/cancel?id=${orderId}`,
      automatic_tax: {enabled: true},
    });
    
    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.log(err)
    return NextResponse.json({error: "Error creating checkout session"}, {status: 500})
  }
}