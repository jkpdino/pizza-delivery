'use client'

import { OrderModel } from "@/actions/Order";
import { getMenuItems } from "@/controllers/MenuController";
import { Order } from "@/controllers/OrderController";
import { Button, Card, Container, Group, SimpleGrid, Skeleton, Stack, Text, Title, Image, Indicator, ActionIcon, Anchor } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ShoppingCartIcon } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
    const order = useQuery({
      queryKey: [ 'order' ],
      queryFn: async () => {
        return await Order.getOrder()
      }
    })
    const orderModel = useQuery({
      queryKey: [ 'orderModel' ],
      queryFn: async () => {
        return await order.data!.model()
      },
      enabled: !!order.data
    })
    const pizzas = useQuery({
      queryKey: [ 'menu' ],
      queryFn: async () => {
        return await getMenuItems()
      },
    })

    const addToCart = async (id: string) => {
      if (order.data) {
        order.data.addItem(id)
        orderModel.refetch();
      }
    }

    const buyNow = async (id: string) => {
      await addToCart(id)

      redirect('/checkout')
    }

    return (
      <Container>
        <Stack p="md">
          <Group justify="space-between">
            <Title>Menu</Title>

            <Anchor href="/cart">
              <Indicator label={orderModel.data?.items.length ?? 0} size={16}>
                <ActionIcon variant="default" size="xl">
                  <ShoppingCartIcon />
                </ActionIcon>
              </Indicator>
            </Anchor>
          </Group>
          
          <SimpleGrid cols={{ base: 2, sm: 1, md: 2, lg: 2, xl: 2}}>
          {pizzas.data?.map((pizza, i) =>
            <Card key={i} withBorder style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              {pizza.img && 
                <Card.Section>
                  <Image src={pizza.img}
                        height={200}
                        alt={pizza.title} />
                </Card.Section>
            }
              <Stack justify="start" pt="md">
                <Group justify="space-between">
                  <Title order={4}>{pizza.title}</Title>

                  <Text>${pizza.price}</Text>
                </Group>

                <Text fs="italic">{pizza.description}</Text>
              </Stack>

                <Stack pt={12}>
                  <Button onClick={() => addToCart(pizza.id)}>Add to Cart</Button>
                  <Button onClick={() => buyNow(pizza.id)} variant="light">Buy Now</Button>
                </Stack>
            </Card>
          )}

          {pizzas.isLoading  && new Array(4).map((_, i) => 
            <Card key={i}>
              <Skeleton></Skeleton>
              <Skeleton></Skeleton>
              <Skeleton></Skeleton>
            </Card>
          )}
          </SimpleGrid>
        </Stack>
      </Container>
    )
}