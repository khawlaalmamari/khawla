const styles = {
  neutral: "bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300",
  primary: "bg-primary-100 text-primary-800",
  success: "bg-green-100 text-green-800",
  accent: "bg-accent-100 text-accent-700",
  danger: "bg-danger/10 text-danger",
};

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: keyof typeof styles;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${styles[tone]}`}
    >
      {children}
    </span>
  );
}
