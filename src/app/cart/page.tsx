'use client';

import { DefaultMenuController, MenuItem } from "@/controllers/MenuController";
import {  Card, Group, Stack, Image, Text, ActionIcon, CloseIcon, Button, Space, Title } from "@mantine/core"
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react"

interface CartItemProps {
    count: number;
    item: MenuItem;
}


const CartItem = ({count, item}: CartItemProps) => {
    return (
        <Card p={4} withBorder>
            <Group justify="space-between">
                <Group>
                    <Image src={item.img} width="60px" height="60px" radius={4} />
                    <Text>{item.title}</Text>
                </Group>
                

                <Group gap={32}>
                    <Text>${(item.price * count).toFixed(2)}</Text>
                    <Text>{count}</Text>

                    <Group>
                        <ActionIcon variant="light">
                            <PlusIcon />
                        </ActionIcon>

                        <ActionIcon variant="light">
                            <MinusIcon />
                        </ActionIcon>

                        <ActionIcon variant="light" color="red">
                            <XIcon />
                        </ActionIcon>
                    </Group>
                </Group>


            </Group>
        </Card>
    )
}

export default function CartPage() {
    const pizzas = useQuery({
        queryKey: [ 'menu' ],
        queryFn: async () => {
          return DefaultMenuController.getMenuItems()
        }
      })

    const cart = useMemo(() => {
        return pizzas.data?.map((item) => ({
            count: 1,
            item
        })) ?? []
    }, [ pizzas.data ])
    

    return (
        <Stack p={12}>
            <Title>Cart</Title>
            <Card p={8} withBorder>
                <Group justify="space-between">
                    <Text>Item Name</Text>

                    <Group>
                        <Text>Price</Text>
                        <Text>Quantity</Text>
                        <Space w={120}/>
                    </Group>
                </Group>
            </Card>

            {cart.map((item, i) => (
                <CartItem key={i} {...item} />
            ))}

            <Button fullWidth>Checkout</Button>
            <Button fullWidth variant="light">Back to Menu</Button>
        </Stack>
    )
}