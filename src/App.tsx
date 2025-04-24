
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { DataProvider } from "./context/DataContext";
import MainLayout from "./components/layout/MainLayout";
import LandingPage from "./pages/LandingPage";
import { useEffect, useState } from "react";
import AWS from "aws-sdk";

import Dashboard from "./pages/Dashboard";
import AddExpense from "./pages/AddExpense";
import Expenses from "./pages/Expenses";
import Wallet from "./pages/Wallet";
import Goals from "./pages/Goals";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import AwsConfigModal from "./components/AwsConfigModal";
import { Button } from "./components/ui/button";

// Initialize AWS configuration with browser compatibility
window.global = window;

const queryClient = new QueryClient();

const App = () => {
  const [showAwsConfig, setShowAwsConfig] = useState(false);
  const [awsConfigured, setAwsConfigured] = useState(false);

  // Initialize AWS configuration
  useEffect(() => {
    const accessKeyId = localStorage.getItem('aws_access_key_id');
    const secretAccessKey = localStorage.getItem('aws_secret_access_key');
    const region = localStorage.getItem('aws_region') || 'us-east-1';

    if (accessKeyId && secretAccessKey) {
      AWS.config.update({
        accessKeyId,
        secretAccessKey,
        region,
        httpOptions: {
          timeout: 30000 // 30 seconds timeout
        }
      });
      setAwsConfigured(true);
    } else {
      // Show AWS config modal if not already configured
      setShowAwsConfig(true);
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DataProvider>
          <Toaster />
          <Sonner />
          <AwsConfigModal open={showAwsConfig} onOpenChange={setShowAwsConfig} />
          
          {!awsConfigured && !showAwsConfig && (
            <div className="fixed top-0 left-0 z-50 w-full h-full flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <div className="bg-card p-6 rounded-lg shadow-lg max-w-md text-center space-y-4">
                <h2 className="text-xl font-bold">AWS Configuration Required</h2>
                <p className="text-muted-foreground">
                  This app requires AWS S3 access to store your data.
                  Please configure your AWS credentials to continue.
                </p>
                <Button onClick={() => setShowAwsConfig(true)}>
                  Configure AWS
                </Button>
              </div>
            </div>
          )}
          
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/app" element={<MainLayout />}>
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="add-expense" element={<AddExpense />} />
                <Route path="expenses" element={<Expenses />} />
                <Route path="wallet" element={<Wallet />} />
                <Route path="goals" element={<Goals />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="settings" element={<Settings />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </DataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
