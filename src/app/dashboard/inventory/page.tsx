'use client'

import { Button, Group, Input, Modal, NumberInput, Stack, Table, TextInput, Title } from "@mantine/core";
import { modals } from "@mantine/modals";
import { useState } from "react";

const defaultPizzas = [
  {
    id: 1,
    name: "Cheese Pizza",
    description: "A classic cheese pizza with marinara sauce and mozzarella cheese.",
    price: 10.99,
    inventory: 10
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    description: "A classic pepperoni pizza with marinara sauce and mozzarella cheese.",
    price: 12.99,
    inventory: 10
  },
  {
    id: 3,
    name: "Sausage Pizza",
    description: "A classic sausage pizza with marinara sauce and mozzarella cheese.",
    price: 12.99,
    inventory: 10
  },
  {
    id: 4,
    name: "Supreme Pizza",
    description: "A classic supreme pizza with marinara sauce and mozzarella cheese.",
    price: 14.99,
    inventory: 10
  },
  {
    id: 5,
    name: "Veggie Pizza",
    description: "A classic veggie pizza with marinara sauce and mozzarella cheese.",
    price: 14.99,
    inventory: 10
  }
]

interface NewPizzaModalProps {
  onSubmit: (name: string, description: string, price: number) => void;
}

const NewPizzaModal = ({onSubmit}: NewPizzaModalProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);

  const handleSubmit = () => {
    onSubmit(name, description, price);
  }

  return (
    <Stack>
      <TextInput label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <TextInput label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
      <NumberInput label="Price" value={price} onChange={(e) => setPrice(e as number)} />
      <Button onClick={handleSubmit}>Save</Button>
    </Stack>
  )
}

export default function PizzaTable() {
  const [pizzas, setPizzas] = useState(defaultPizzas.map((pizza) => {
    return {
      pizza,
      isEditing: false
    }
  }));
  const [isNewItemOpen, setIsNewItemOpen] = useState(false);

  const handleSave = (i: number) => {
    let newPizzas = [...pizzas];
    newPizzas[i].isEditing = false;
    setPizzas(newPizzas);
  }
  const handleEdit = (i: number) => {
    let newPizzas = [...pizzas];
    newPizzas[i].isEditing = true;
    setPizzas(newPizzas);
  }
  const handleSetInventory = (i: number, value: number) => {
    let newPizzas = [...pizzas];
    newPizzas[i].pizza.inventory = value;
    setPizzas(newPizzas);
  }
  const handleDelete = (i: number) => {
    let newPizzas = [...pizzas];
    newPizzas.splice(i, 1);
    setPizzas(newPizzas);
  }
  const handleNewPizza = (name: string, description: string, price: number) => {
    let newPizzas = [...pizzas];
    newPizzas.push({
      pizza: {
        id: newPizzas.length + 1,
        name,
        description,
        price,
        inventory: 0
      },
      isEditing: false
    });
    setPizzas(newPizzas);
  }

  const handleNew = () => {
    setIsNewItemOpen(true);
  }

  const rows = pizzas.map(({pizza, isEditing}, i) => {
    return (
      <Table.Tr key={pizza.id}>
        <Table.Td>{pizza.name}</Table.Td>
        <Table.Td>{pizza.description}</Table.Td>
        <Table.Td>${pizza.price}</Table.Td>
        <Table.Td>
          { isEditing
            ? <NumberInput value={pizza.inventory} onChange={(e) => handleSetInventory(i, e as number)} />
            : `${pizza.inventory}`
          }
        </Table.Td>
        <Table.Td>
          <Group>
            <Button  onClick={() => isEditing ? handleSave(i) : handleEdit(i)}>
              {isEditing ? "Save" : "Edit"}
            </Button>
            <Button color="red" onClick={() => handleDelete(i)}>
              Delete
            </Button>
          </Group>
          
        </Table.Td>
      </Table.Tr>
    )
});
  
    return (
      <Stack p={24}>
        <Modal title="New Pizza" opened={isNewItemOpen} onClose={() => setIsNewItemOpen(false)}>
          <NewPizzaModal onSubmit={(a, b, c) => {
            handleNewPizza(a, b, c)
            setIsNewItemOpen(false);
          }} />
        </Modal>
        <Title>Pizza Inventory</Title>
        <Group>
          <Button onClick={handleNew}>New Pizza</Button>
        </Group>
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Item Name</Table.Th>
              <Table.Th>Item Description</Table.Th>
              <Table.Th>Item Price</Table.Th>
              <Table.Th>Item Inventory</Table.Th>
              <Table.Th></Table.Th>
            </Table.Tr>
          </Table.Thead>
          
          <Table.Tbody>
            {rows}
          </Table.Tbody>
        </Table>
      </Stack>
    )
}