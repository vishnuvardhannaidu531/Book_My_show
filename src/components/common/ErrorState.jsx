import { AlertTriangle } from "lucide-react";
import Button from "../ui/Button";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-5 text-red-100">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5" />
        <div className="flex-1">
          <h3 className="font-semibold">Something went wrong</h3>
          <p className="mt-1 text-sm text-red-100/80">{message}</p>
          {onRetry && (
            <Button className="mt-4" variant="secondary" onClick={onRetry}>
              Try again
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
