'use client'

export interface MenuItem {
    title: string;
    description: string;
    price: number;
    img: string;
}

const PIZZAS = [
    {
        title: "Margarita",
        description: "Our margherita pizza is an Italian classic - a thin, crisp crust topped with sweet tomato sauce, melted mozzarella, and fresh basil. With authentic Neapolitan flavors in every bite, it's amore at first taste!",
        price: 10,
        img: '/pizza/OIG4.jpg'
    },
    {
        title: "Alfredo",
        description: "Indulge in our creamy alfredo pizza with its signature garlicky parmesan sauce blanketing the pie, dotted with crispy bacon pieces and fresh spinach for a tasty bite. This decadent white pizza will satisfy even the strongest cheese cravings!",
        price: 12,
        img: '/pizza/OIG4.jpg'
    },
    {
        title: "Pepperoni Pizza",
        description: "Spice up your pizza night with our hearty pepperoni pizza, loaded with extra pepperoni sliced thick and curled at the edges for a satisfying crisp in every bite. Savory tomato sauce and gooey cheese bring this protein-packed pie to flavor town with some Italian-American flair.",
        price: 12,
        img: '/pizza/OIG4.jpg'
    },
    {
        title: "Pesto and Sun-Dried Tomato",
        description: "Our pesto and sun-dried tomato pizza is a flavor fest, with basil pesto swirled over the crust then topped with sweet and tangy sun-dried tomatoes, smooth mozzarella, parmesan, and toasted pine nuts. Every fresh bite is a balance of herby pesto, tart tomatoes, nutty crunch, and melty cheese.",
        price: 12,
        img: '/pizza/OIG4.jpg'
    }
]

export class MenuController {
    async getMenuItems(): Promise<MenuItem[]> {
        return PIZZAS
    
    }
}

export const DefaultMenuController = new MenuController();