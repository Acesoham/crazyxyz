import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

import './i18n/config';
import LanguageSwitcher from './components/LanguageSwitcher';

const queryClient = new QueryClient();

function App() {
  return (
    <div className="app">
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
            {/* Added SampleForm component here */}
            
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;