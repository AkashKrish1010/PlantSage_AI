import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import AppLayout from "./components/AppLayout";
import HomePage from "./pages/HomePage";
import IdentifyPage from "./pages/IdentifyPage";
import SearchPage from "./pages/SearchPage";
import EncyclopediaPage from "./pages/EncyclopediaPage";
import PlantDetailPage from "./pages/PlantDetailPage";
import GardenPage from "./pages/GardenPage";
import AboutPage from "./pages/AboutPage";
import SavedLocationsPage from "./pages/SavedLocationsPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/identify" element={<IdentifyPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/encyclopedia" element={<EncyclopediaPage />} />
              <Route path="/encyclopedia/:id" element={<PlantDetailPage />} />
              <Route path="/garden" element={<GardenPage />} />
              <Route path="/saved-locations" element={<SavedLocationsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
