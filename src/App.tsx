import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import PageLoader from "@/components/PageLoader";

// Lazy load all pages
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const WeddingPhotography = lazy(() => import("./pages/WeddingPhotography"));
const PreWeddingPhotography = lazy(() => import("./pages/PreWeddingPhotography"));
const WeddingFilms = lazy(() => import("./pages/WeddingFilms"));
const EngagementPhotography = lazy(() => import("./pages/EngagementPhotography"));
const CandidPhotography = lazy(() => import("./pages/CandidPhotography"));
const BirthdayPhotography = lazy(() => import("./pages/BirthdayPhotography"));
const CouplePortraits = lazy(() => import("./pages/CouplePortraits"));
const NamingCeremony = lazy(() => import("./pages/NamingCeremony"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Admin = lazy(() => import("./pages/Admin"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route
              path="/services/wedding-photography"
              element={<WeddingPhotography />}
            />
            <Route path="/services/pre-wedding" element={<PreWeddingPhotography />} />
            <Route path="/services/wedding-films" element={<WeddingFilms />} />
            <Route path="/services/engagement" element={<EngagementPhotography />} />
            <Route path="/services/candid-photography" element={<CandidPhotography />} />
            <Route path="/services/birthday-photography" element={<BirthdayPhotography />} />
            <Route path="/services/couple-portraits" element={<CouplePortraits />} />
            <Route path="/services/naming-ceremony" element={<NamingCeremony />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

