'use server';

import { prisma } from "@/db/database";
import { randomUUID } from "crypto";

export async function createOrder(): Promise<string> {
    const id = randomUUID();

    await prisma.order.create({
        data: {
            id,
            status: "cart",
            created: new Date(),
            placed: null
        }
    })

    return id;
}

export interface OrderModel {
    id: string;
    status: string;
    created: Date;
    placed: Date | null;
    items: OrderItem[];
}

export interface OrderItem {
    id: string;
    orderId: string;
    menuItemId: string;
    count: number;
}

export async function getOrder(id: string): Promise<OrderModel | null> {
    const order = await prisma.order.findFirst({
        where: {
            id: id
        }
    });

    const items = await prisma.orderItem.findMany({
        where: {
            orderId: id
        }
    })

    if (!order) {
        return null;
    }

    return {
        ...order,
        items
    };
}

export async function addItem(order: string, item: string): Promise<void> {
    const exisitingItem = await prisma.orderItem.findFirst({
        where: {
            orderId: order,
            menuItemId: item
        }
    })

    if (exisitingItem) {
        await prisma.orderItem.update({
            where: {
                id: exisitingItem.id
            },
            data: {
                count: exisitingItem.count + 1
            }
        });
        return;
    }
    else {
        await prisma.orderItem.create({
            data: {
                id: randomUUID(),
                orderId: order,
                menuItemId: item,
                count: 1
            }
        });
    }
}

export async function addCount(order: string, item: string): Promise<void> {
    const exisitingItem = await prisma.orderItem.findFirst({
        where: {
            orderId: order,
            menuItemId: item
        }
    })

    if (!exisitingItem) {
        return;
    }

    await prisma.orderItem.update({
        where: {
            id: exisitingItem.id
        },
        data: {
            count: exisitingItem.count + 1
        }
    });
}

export async function removeCount(order: string, item: string): Promise<void> {
    const exisitingItem = await prisma.orderItem.findFirst({
        where: {
            orderId: order,
            menuItemId: item
        }
    })

    if (!exisitingItem) {
        return;
    }

    if (exisitingItem.count === 1) {
        await prisma.orderItem.delete({
            where: {
                id: exisitingItem.id
            }
        });
        return;
    }

    await prisma.orderItem.update({
        where: {
            id: exisitingItem.id
        },
        data: {
            count: exisitingItem.count - 1
        }
    });
}

export async function deleteItem(order: string, item: string): Promise<void> {
    await prisma.orderItem.deleteMany({
        where: {
            orderId: order,
            menuItemId: item
        }
    });
}