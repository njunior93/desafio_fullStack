import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import VolunteerCreate from './pages/VolunteerCreate.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
    },
  },
});

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>
  },
  {
    path:"/create-volunteer",
    element: <VolunteerCreate/>
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
)
