import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WhatsAppButton from "./components/WhatsAppButton";
import Home from "./pages/Home";
import About from "./pages/About";
import Packages from "./pages/Packages";
import PackageDetail from "./pages/PackageDetail";
import Hotels from "./pages/Hotels";
import HotelDetail from "./pages/HotelDetail";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import { GlobalProvider } from "./Contaxt/UseGlobelcontaxt";
import Citydetail from "./components/City_section/Citydetail/Citydetail";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <GlobalProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/packages/:slug" element={<PackageDetail />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:slug" element={<HotelDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/citydetail/:slug" element={< Citydetail/>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <WhatsAppButton/>
      </BrowserRouter>
      </GlobalProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
