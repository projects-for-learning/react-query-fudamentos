import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { Users } from "./Users";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { Posts } from "./Posts";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      refetchOnWindowFocus: false,
      retry: false,
      gcTime: 10 * 60 * 1000, // 10 minutes
    },
  },
});

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Usuarios</Link>
            <Link to="/posts">Posts</Link>
          </li>
        </ul>

        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/posts" element={<Posts />} />
        </Routes>
        <ReactQueryDevtools buttonPosition="bottom-right" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
