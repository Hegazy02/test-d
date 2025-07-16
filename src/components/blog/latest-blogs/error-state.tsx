import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface ErrorStateProps {
  error: string;
}

export default function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center">
      <div className="bg-red-50 p-4 rounded-lg flex items-center space-x-3 mb-4">
        <AlertCircle className="h-6 w-6 text-red-500" />
        <p className="text-red-700">{error}</p>
      </div>
      <Button
        className="bg-[#004B4B] hover:bg-[#003838]"
        onClick={() => window.location.reload()}
      >
        Try Again
      </Button>
    </div>
  );
}
