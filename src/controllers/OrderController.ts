'use client';

import { OrderModel, addCount, addItem, createOrder, deleteItem, getOrder, removeCount } from "@/actions/Order";

export class Order {
    id: string;

    constructor(id: string) {
        this.id = id;
    }

    static async getOrder(): Promise<Order> {
        let order = localStorage.getItem('order');
        if (!order) {
            order = await createOrder();
            localStorage.setItem('order', order)
        }

        return new Order(order!);
    }

    async model(): Promise<OrderModel | null> {
        return await getOrder(this.id);
    }

    async addItem(id: string): Promise<void> {
        await addItem(this.id, id)
    }

    async addCount(id: string): Promise<void> {
        await addCount(this.id, id)
    }

    async removeCount(id: string): Promise<void> {
        await removeCount(this.id, id)
    }

    async deleteItem(id: string): Promise<void> {
        await deleteItem(this.id, id)
    }
}