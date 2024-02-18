'use client'

import { DefaultMenuController } from "@/controllers/MenuController";
import { Button, Card, Container, Group, SimpleGrid, Skeleton, Stack, Text, Title, Image } from "@mantine/core";
import { useQuery } from "@tanstack/react-query";

export default function Page() {
    const pizzas = useQuery({
      queryKey: [ 'menu' ],
      queryFn: async () => {
        return DefaultMenuController.getMenuItems()
      }
    })

    return (
      <Container>
        <Stack p="md">
          <Title>Menu</Title>
          
          <SimpleGrid cols={2}>
          {pizzas.data?.map((pizza, i) =>
            <Card key={i} withBorder>
              {pizza.img && 
                <Card.Section>
                  <Image src={pizza.img}
                        height={200}
                        alt={pizza.title} />
                </Card.Section>
            }
              <Stack justify="space-between" pt="md">
                <Group justify="space-between">
                  <Title order={4}>{pizza.title}</Title>

                  <Text>${pizza.price}</Text>
                </Group>

                <Text fs="italic">{pizza.description}</Text>

                <Button>Add to Cart</Button>
                <Button variant="light">Buy Now</Button>
              </Stack>
            </Card>
          )}

          {pizzas.isLoading && new Array(6).map((_, i) => 
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