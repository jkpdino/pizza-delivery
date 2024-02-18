'use client';

import { Order } from "@/controllers/OrderController";
import { Button, Container, Select, Stack, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { loadStripe } from "@stripe/stripe-js"

export default function Page() {
  const times = [
    "8:00 PM",
    "8:15 PM",
    "8:30 PM",
    "8:45 PM",
  ]

  const timesData = times.map((time) => {
    return {
      value: time,
      label: time,
      disabled: time === "8:30 PM"
    }
  })

  const form = useForm({
    initialValues: {
      name: "",
      dorm: "",
      phoneNumber: "",
      deliveryTime: ""
    },

    validate: {
      name: (value) => value.length === 0 ? "Name is required" : null,
      dorm: (value) => value.length === 0 ? "Dorm or Height is required" : null,
      phoneNumber: (value) => value.length === 0 ? "Phone number is required" : null,
      deliveryTime: (value) => value.length === 0 ? "Delivery time is required" : null
    }
  })

  const redirectToPayment = async (values: any) => {
    try {
      const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

      if (!stripe) throw new Error("Stripe failed to load")

      const currentOrder = Order.current()
      if (!currentOrder) throw new Error("No order found")

      const response = await fetch("/api/checkout_sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          orderId: currentOrder.id
        })
      })

      const {sessionId} = await response.json()
      const stripeError = await stripe.redirectToCheckout({ sessionId });

      if (stripeError) throw new Error(stripeError.error.message)
    }

    catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      <Stack p="md">
        <Title>Checkout</Title>
        <form onSubmit={form.onSubmit((values) => {
          redirectToPayment(values)
        })}>
          <Stack gap="md">
            <TextInput withAsterisk label="Name" placeholder="John Doe" {...form.getInputProps('name')}/>

            <TextInput withAsterisk label="Dorm or Height" placeholder="Jserra 101" {...form.getInputProps('dorm')}/>
          
            <TextInput withAsterisk label="Phone Number" placeholder="555-555-5555" {...form.getInputProps('phoneNumber')}/>
          
            <Select withAsterisk label="Delivery Time" placeholder="Select a delivery time" data={timesData} {...form.getInputProps('deliveryTime')}/>
          
            <Button type="submit" variant="filled" color="blue">Proceed to Payment</Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  )
}