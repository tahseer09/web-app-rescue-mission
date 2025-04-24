
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DiagnosticCard from '@/components/DiagnosticCard';
import FixButton from '@/components/FixButton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { bug, settings, Wrench } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Index = () => {
  const { toast } = useToast();
  const [progress, setProgress] = useState(68);

  const runDiagnostic = () => {
    toast({
      title: "Running diagnostic",
      description: "Scanning your web application...",
    });
    
    // Simulate progress change
    setProgress(32);
    setTimeout(() => {
      setProgress(68);
      toast({
        title: "Diagnostic complete",
        description: "Found 5 issues that need attention",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Web App Rescue Mission</h1>
          <p className="text-muted-foreground">Fix your web application issues with our diagnostic tools.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">System Health</CardTitle>
              <CardDescription>Overall health of your application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Health Score</span>
                  <span className="text-sm font-medium">{progress}%</span>
                </div>
                <Progress value={progress} className={progress > 50 ? "text-rescue-green" : "text-rescue-red"} />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" className="text-xs" onClick={runDiagnostic}>
                  Run Diagnostic
                </Button>
                <Button variant="outline" size="sm" className="text-xs">
                  View Report
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Issue Summary</CardTitle>
              <CardDescription>Current application issues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Critical</span>
                  <span className="text-sm font-bold text-rescue-red">2</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Warnings</span>
                  <span className="text-sm font-bold text-rescue-yellow">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Fixed</span>
                  <span className="text-sm font-bold text-rescue-green">7</span>
                </div>
              </div>
              <div className="mt-4">
                <FixButton label="Fix All Issues" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Latest Fix</CardTitle>
              <CardDescription>Most recent issue fixed</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rescue-green"></div>
                  <span className="text-sm font-medium">Navigation Link Bug</span>
                </div>
                <p className="text-xs text-gray-500">Fixed broken navigation links that were causing routing errors</p>
                <p className="text-xs text-gray-400">Fixed 35 minutes ago</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="frontend" className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="frontend">Frontend</TabsTrigger>
            <TabsTrigger value="backend">Backend</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="frontend" className="space-y-6">
            <DiagnosticCard
              title="User Interface"
              description="Issues related to the user interface and visual elements"
              status="warning"
              items={[
                { name: "Responsive Layout Issues", fixed: false },
                { name: "Button Styling Inconsistencies", fixed: true },
                { name: "Form Validation Errors", fixed: false }
              ]}
            />
            
            <DiagnosticCard
              title="Navigation"
              description="Issues related to application routing and navigation"
              status="fixed"
              items={[
                { name: "Broken Links", fixed: true },
                { name: "Route Parameter Handling", fixed: true },
                { name: "Navigation State Persistence", fixed: true }
              ]}
            />
          </TabsContent>
          
          <TabsContent value="backend" className="space-y-6">
            <DiagnosticCard
              title="API Integration"
              description="Issues related to API calls and data fetching"
              status="broken"
              items={[
                { name: "Authentication Token Expiry", fixed: false },
                { name: "API Error Handling", fixed: false },
                { name: "Data Transformation", fixed: true }
              ]}
            />
            
            <DiagnosticCard
              title="Data Management"
              description="Issues related to state management and data flow"
              status="warning"
              items={[
                { name: "Redux Store Organization", fixed: true },
                { name: "Context API Implementation", fixed: false },
                { name: "Local Storage Handling", fixed: true }
              ]}
            />
          </TabsContent>
          
          <TabsContent value="performance" className="space-y-6">
            <DiagnosticCard
              title="Load Time"
              description="Issues affecting application load time"
              status="broken"
              items={[
                { name: "Asset Optimization", fixed: false },
                { name: "Code Splitting", fixed: false },
                { name: "Bundle Size", fixed: false }
              ]}
            />
            
            <DiagnosticCard
              title="Runtime Performance"
              description="Issues affecting application performance during use"
              status="warning"
              items={[
                { name: "Memory Leaks", fixed: false },
                { name: "Render Optimization", fixed: true },
                { name: "Event Handler Cleanup", fixed: false }
              ]}
            />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
