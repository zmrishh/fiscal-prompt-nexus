
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PromptPage from "./pages/PromptPage";
import Documents from "./pages/Documents";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/prompt" element={<PromptPage />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/bank" element={<div className="p-6">Bank Sync - Coming Soon</div>} />
          <Route path="/expenses" element={<div className="p-6">Expenses - Coming Soon</div>} />
          <Route path="/gst" element={<div className="p-6">GST & Compliance - Coming Soon</div>} />
          <Route path="/payroll" element={<div className="p-6">Payroll - Coming Soon</div>} />
          <Route path="/reports" element={<div className="p-6">Investor Reports - Coming Soon</div>} />
          <Route path="/settings" element={<div className="p-6">Settings - Coming Soon</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
