import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Login } from "./pages/Login";
import { LeadsPanel } from "./pages/LeadsPanel";
import { LatamPage } from "./pages/LatamPage";
import { IntegrationsPage } from "./pages/IntegrationsPage";
import { PrcAuthPage } from "./pages/PrcAuthPage";
import { SalesInquiriesPage } from "./pages/SalesInquiriesPage";
import { ImporterResponsibilityPage } from "./pages/ImporterResponsibilityPage";
import { PrivacyPolicyPage } from "./pages/PrivacyPolicyPage";
import { TermsConditionsPage } from "./pages/TermsConditionsPage";

import { PaymentProgressPage } from "./pages/PaymentProgressPage";
import { DeliveryDatePage } from "./pages/DeliveryDatePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Rota para códigos de rastreio - deve vir ANTES da rota raiz */}
          <Route path="/:trackingCode" element={<Index />} />
          <Route path="/" element={<Index />} />
                        <Route path="/login" element={<Login />} />
              <Route path="/leads" element={<LeadsPanel />} />
              <Route path="/latam" element={<LatamPage />} />
              <Route path="/integrations" element={<IntegrationsPage />} />
              <Route path="/prc-auth" element={<PrcAuthPage />} />
              <Route path="/sales-inquiries" element={<SalesInquiriesPage />} />
              <Route path="/importer-responsibility" element={<ImporterResponsibilityPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms-conditions" element={<TermsConditionsPage />} />

              <Route path="/pagamento/progresso" element={<PaymentProgressPage />} />
              <Route path="/data-entrega" element={<DeliveryDatePage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
