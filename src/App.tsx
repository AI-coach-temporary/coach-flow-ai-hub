import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LeadsBoard from "./pages/LeadsBoard";
import Clients from "./pages/Clients";
import Calendar from "./pages/Calendar";
import Campaigns from "./pages/Campaigns";
import Reports from "./pages/Reports";
import AIAssistant from "./pages/AIAssistant";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import MainLayout from "./components/layout/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/leads" element={<MainLayout><LeadsBoard /></MainLayout>} />
          <Route path="/clients" element={<MainLayout><Clients /></MainLayout>} />
          <Route path="/calendar" element={<MainLayout><Calendar /></MainLayout>} />
          <Route path="/campaigns" element={<MainLayout><Campaigns /></MainLayout>} />
          <Route path="/reports" element={<MainLayout><Reports /></MainLayout>} />
          <Route path="/ai-assistant" element={<MainLayout><AIAssistant /></MainLayout>} />
          <Route path="/admin" element={<MainLayout><Admin /></MainLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
