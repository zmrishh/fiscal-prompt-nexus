import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PromptPage from "./pages/PromptPage";
import Documents from "./pages/Documents";
import BankSync from "./pages/BankSync";
import Expenses from "./pages/Expenses";
import GSTCompliance from "./pages/GSTCompliance";
import Payroll from "./pages/Payroll";
import InvestorReports from "./pages/InvestorReports";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/prompt" element={<PromptPage />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/bank" element={<BankSync />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/gst" element={<GSTCompliance />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/reports" element={<InvestorReports />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
