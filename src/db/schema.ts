import { sql } from "drizzle-orm";
import { text, integer, numeric, sqliteTable } from "drizzle-orm/sqlite-core";

const menuItems = sqliteTable('menu_items', {
    id: text('id').primaryKey().notNull(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    price: numeric('price').notNull(),
    image: text('id').notNull(),
})