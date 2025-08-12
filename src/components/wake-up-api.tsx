import { Database, Snowflake, X } from "lucide-react";
import { useState } from "react";
import { useWakeUpApi } from "@/hooks/use-app-queries/use-wake-up-api";

export default function WakeUpAPI() {
  const [manualClose, setManualClose] = useState(false);
  const { error, isLoading } = useWakeUpApi();

  const isOpen = !manualClose && (isLoading || error);

  return (
    <div
      aria-hidden={!isOpen}
      aria-modal={!!isOpen}
      data-value={!isOpen}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm data-[value=true]:hidden"
    >
      <div className="relative w-full max-w-sm rounded-xl bg-white p-6 text-center shadow-lg">
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
          onClick={() => setManualClose(true)}
        >
          <X />
        </button>

        <div
          aria-hidden={isLoading}
          data-value={isLoading}
          className="mb-4 flex justify-center data-[value=false]:hidden"
        >
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500" />
        </div>

        <div
          aria-hidden={!!error}
          data-value={!!error}
          className="data-[value=false]:hidden"
        >
          <div className="flex justify-center gap-1 text-blue-500">
            <Database />
            <Snowflake />
          </div>
          <p className="mb-4 flex justify-center data-[value=false]:hidden">
            {error?.message}
          </p>
        </div>

        <div
          aria-hidden={isLoading}
          data-value={isLoading}
          className="data-[value=false]:hidden"
        >
          <h2 className="mb-1 text-lg font-semibold">
            We are waking up the API
          </h2>
          <p className="text-sm text-gray-600">
            Please wait a moment while we get things ready.
          </p>
        </div>
      </div>
    </div>
  );
}
