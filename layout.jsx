"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppProvider } from "../components/AppContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 30000, retry: 1, refetchOnWindowFocus: false },
  },
});

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Karim Naeim — POS & Accounting</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          fontFamily: "'Cairo', 'Inter', sans-serif",
          backgroundColor: "#f8fafc",
        }}
      >
        <QueryClientProvider client={queryClient}>
          <AppProvider>{children}</AppProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
