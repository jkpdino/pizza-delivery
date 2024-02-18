'use client';

import { MenuItem, getMenuItems } from "@/controllers/MenuController";
import {  Card, Group, Stack, Image, Text, ActionIcon, CloseIcon, Button, Space, Title, Container, Anchor, Loader, Table, ActionIconGroup, Center } from "@mantine/core"
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { MinusIcon, PlusIcon, XIcon } from "lucide-react"
import { Order } from "@/controllers/OrderController";

interface CartItemProps {
    count: number;
    item: MenuItem;
}



export default function CartPage() {
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

    const addItem = async(id: string) => {
        if (order.data) {
            order.data.addItem(id)
            orderModel.refetch();
        }
    }
    const removeItem = async (id: string) => {
        if (order.data) {
            order.data.removeCount(id)
            orderModel.refetch();
        }
    }
    const deleteItem = async(id: string) => {
        if (order.data) {
            order.data.deleteItem(id)
            orderModel.refetch();
        }
    }

    const totalQuantity = useMemo(() => {
        return orderModel.data?.items.reduce((acc, item) => {
            //const menuItem = pizzas.data?.find((pizza) => pizza.id === item.menuItemId)!;
            return acc + item.count
        }, 0)
    }, [ orderModel.data, pizzas.data])

    const totalPrice = useMemo(() => {
        return orderModel.data?.items.reduce((acc, item) => {
            const menuItem = pizzas.data?.find((pizza) => pizza.id === item.menuItemId)!;
            return acc + item.count * menuItem.price
        }, 0)
    }, [ orderModel.data, pizzas.data])

    const sortedItems = useMemo(() => {
        return orderModel.data?.items.sort((a, b) => {
            return a.menuItemId.localeCompare(b.menuItemId) 
        }) ?? []
    }, [orderModel.data])
    

    return (
        <Container>
            <Stack p={12}>
                <Title>Cart</Title>
                { (pizzas.isLoading || orderModel.isLoading) &&  <Center><Loader /></Center>}

                { pizzas.data && orderModel.data &&
                <Table striped horizontalSpacing="md">
                    <Table.Thead>
                        <Table.Tr>
                            <Table.Th>Item Name</Table.Th>
                            <Table.Th>Price</Table.Th>
                            <Table.Th>Quantity</Table.Th>
                            <Table.Th></Table.Th>
                        </Table.Tr>
                    </Table.Thead>

                    <Table.Tbody>
                        {sortedItems.map((item, i) => {
                            const menuItem = pizzas.data?.find((pizza) => pizza.id === item.menuItemId)!;
                            return (
                                <Table.Tr key={item.menuItemId}>
                                    <Table.Td>
                                    <Group>
                                        <Image src={menuItem.img} width="60px" height="60px" radius={4} />
                                        <Text>{menuItem.title}</Text>
                                    </Group>
                                    </Table.Td>
                                    <Table.Td w={80}>${(menuItem.price * item.count).toFixed(2)}</Table.Td>
                                    <Table.Td w={80}>{item.count}</Table.Td>
                                    <Table.Td w={140}>
                                        <Group>
                                            <ActionIconGroup>
                                                <ActionIcon variant="light" onClick={() => addItem(item.menuItemId)}>
                                                    <PlusIcon />
                                                </ActionIcon>

                                                <ActionIcon variant="light" disabled={item.count == 0} onClick={() => removeItem(item.menuItemId)}>
                                                    <MinusIcon />
                                                </ActionIcon>
                                            </ActionIconGroup>
                                            <ActionIcon variant="light" color="red" onClick={() => deleteItem(item.menuItemId)}>
                                                <CloseIcon />
                                            </ActionIcon>
                                        </Group>
                                    </Table.Td>
                                </Table.Tr>
                            )
                        })}

                        <Table.Tr>
                            <Table.Td>
                                Total
                            </Table.Td>
                            <Table.Td>
                                ${ totalPrice?.toFixed(2) }
                            </Table.Td>

                            <Table.Td>
                                { totalQuantity }
                            </Table.Td>

                            <Table.Td>

                            </Table.Td>
                        </Table.Tr>
                    </Table.Tbody>
                </Table>
                }

                <Button fullWidth>Checkout</Button>
                <Anchor href="/menu">
                    <Button fullWidth variant="light">Back to Menu</Button>
                </Anchor>
            </Stack>
        </Container>
    )
}