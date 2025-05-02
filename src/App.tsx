
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AuthGuard from "./components/auth/AuthGuard";

// Pages
import Index from "./pages/Index";
import LeadsBoard from "./pages/LeadsBoard";
import Clients from "./pages/Clients";
import Calendar from "./pages/Calendar";
import Campaigns from "./pages/Campaigns";
import Reports from "./pages/Reports";
import AIAssistant from "./pages/AIAssistant";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Components
import MainLayout from "./components/layout/MainLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route path="/" element={
              <AuthGuard>
                <MainLayout>
                  <Index />
                </MainLayout>
              </AuthGuard>
            } />
            <Route path="/leads" element={
              <AuthGuard>
                <MainLayout>
                  <LeadsBoard />
                </MainLayout>
              </AuthGuard>
            } />
            <Route path="/clients" element={
              <AuthGuard>
                <MainLayout>
                  <Clients />
                </MainLayout>
              </AuthGuard>
            } />
            <Route path="/calendar" element={
              <AuthGuard>
                <MainLayout>
                  <Calendar />
                </MainLayout>
              </AuthGuard>
            } />
            <Route path="/campaigns" element={
              <AuthGuard>
                <MainLayout>
                  <Campaigns />
                </MainLayout>
              </AuthGuard>
            } />
            <Route path="/reports" element={
              <AuthGuard>
                <MainLayout>
                  <Reports />
                </MainLayout>
              </AuthGuard>
            } />
            <Route path="/ai-assistant" element={
              <AuthGuard>
                <MainLayout>
                  <AIAssistant />
                </MainLayout>
              </AuthGuard>
            } />
            <Route path="/admin" element={
              <AuthGuard>
                <MainLayout>
                  <Admin />
                </MainLayout>
              </AuthGuard>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
