
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AWS from 'aws-sdk';
import { useToast } from "@/hooks/use-toast";

interface AwsConfigModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AwsConfigModal: React.FC<AwsConfigModalProps> = ({ open, onOpenChange }) => {
  const [accessKeyId, setAccessKeyId] = useState('');
  const [secretAccessKey, setSecretAccessKey] = useState('');
  const [region, setRegion] = useState('us-east-1');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSave = () => {
    if (!accessKeyId || !secretAccessKey) {
      toast({
        title: "Missing credentials",
        description: "Please enter both Access Key ID and Secret Access Key",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Update AWS configuration
      AWS.config.update({
        accessKeyId,
        secretAccessKey,
        region
      });

      // Store credentials in localStorage (not recommended for production)
      localStorage.setItem('aws_access_key_id', accessKeyId);
      localStorage.setItem('aws_secret_access_key', secretAccessKey);
      localStorage.setItem('aws_region', region);

      toast({
        title: "AWS Configuration Saved",
        description: "Your AWS credentials have been saved successfully.",
      });

      onOpenChange(false);
    } catch (error) {
      console.error("Error saving AWS configuration:", error);
      toast({
        title: "Configuration Failed",
        description: "There was an error saving your AWS configuration.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AWS Configuration</DialogTitle>
          <DialogDescription>
            Enter your AWS credentials to connect to S3 storage.
            These credentials will be stored in your browser.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="accessKeyId" className="text-right">
              Access Key ID
            </Label>
            <Input
              id="accessKeyId"
              value={accessKeyId}
              onChange={(e) => setAccessKeyId(e.target.value)}
              className="col-span-3"
              placeholder="AKIAIOSFODNN7EXAMPLE"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="secretAccessKey" className="text-right">
              Secret Access Key
            </Label>
            <Input
              id="secretAccessKey"
              type="password"
              value={secretAccessKey}
              onChange={(e) => setSecretAccessKey(e.target.value)}
              className="col-span-3"
              placeholder="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="region" className="text-right">
              Region
            </Label>
            <Input
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="col-span-3"
              placeholder="us-east-1"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isLoading}>
            {isLoading ? "Saving..." : "Save Configuration"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AwsConfigModal;
