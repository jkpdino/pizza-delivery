import type { Metadata } from "next";
import { Inter } from "next/font/google";
import '@mantine/core/styles.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Lenten Pizza",
  description: "Best pizza in town",
};

import { ColorSchemeScript, createTheme, MantineProvider } from '@mantine/core';
import { ModalsProvider } from "@mantine/modals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Providers } from "./providers";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


const theme = createTheme({
  /** Put your mantine theme override here */
});

const queryClient = new QueryClient();



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/pizza.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
          <Providers>
            <MantineProvider theme={theme}>
              <ModalsProvider>
                  {children}
              </ModalsProvider>
          </MantineProvider>
        </Providers>
      </body>
    </html>
  );
}
