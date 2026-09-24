export function ProgressBar({ percent, className = "" }: { percent: number; className?: string }) {
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-surface ${className}`}>
      <div
        className="h-full rounded-full bg-primary-600 transition-all duration-500 ease-out"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
