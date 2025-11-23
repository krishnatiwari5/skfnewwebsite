import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";

import WhatsAppSlideIn from "@/components/ui/WhatsAppSlideIn";





function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
        <WhatsAppSlideIn
          phone="919327120122"
          message="Hi, I want a quote for a grill/gate. My location is ..."
          threshold={300}
          logoUrl="https://shreekrishnafabrication.in/skf-logo-email.png" // or keep the sandbox path
        />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
