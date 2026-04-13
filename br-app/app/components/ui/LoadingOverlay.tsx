import { Spinner } from "@/components/ui/spinner";

export const LoadingOverlay = ({ isVisible }: { isVisible: boolean }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="flex flex-col items-center gap-2">
        <Spinner className="size-16"></Spinner>
        <p className="text-sm font-medium text-white">Loading...</p>
      </div>
    </div>
  );
};