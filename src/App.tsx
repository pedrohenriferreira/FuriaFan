
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Connect from "./pages/Connect";
import NotFound from "./pages/NotFound";
import EngagementMetrics from "./components/EngagementMetrics";
import { mockFanProfile } from "./utils/mockData";

const App = () => {
  // Criar uma nova instância QueryClient para cada renderização do componente
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/connect" element={<Connect />} />
            {/* Adicionar rota de métricas para exibir métricas de engajamento */}
            <Route path="/metrics" element={<EngagementMetrics metrics={mockFanProfile.engagementMetrics} />} />
            {/* ADICIONE TODAS AS ROTAS PERSONALIZADAS ACIMA DA ROTA CATCH-ALL "*" */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
