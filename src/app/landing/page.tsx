import { Button, Group, Stack, TextInput, Title, Text } from "@mantine/core";

export default function Page() {
    return (
        <div style={{
            background: 'red'
        }}>
            <Stack align="start">
                <Title>Order a Pizza</Title>
                <Text>Join our</Text>

                <Group>
                    <TextInput placeholder="Sign up for details">

                    </TextInput>
                    <Button>Notify me</Button>
                </Group>
            </Stack>
        </div>
    )
}