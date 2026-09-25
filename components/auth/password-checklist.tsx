"use client";

import { useLocale } from "@/components/locale-provider";
import { getPasswordRuleResults } from "@/lib/auth/password-strength";

function RuleItem({ passed, label }: { passed: boolean; label: string }) {
  return (
    <li
      className={`flex items-center gap-1.5 transition-colors duration-150 ${
        passed ? "text-success" : "text-muted"
      }`}
    >
      <span aria-hidden="true" className="text-sm leading-none">
        {passed ? "✔️" : "○"}
      </span>
      {label}
    </li>
  );
}

/** Live 5-rule strength checklist, shown under the password field. */
export function PasswordRulesChecklist({ password }: { password: string }) {
  const { dict } = useLocale();
  const r = getPasswordRuleResults(password);

  return (
    <ul className="mt-2 space-y-1 text-xs">
      <RuleItem passed={r.length} label={dict.auth.passwordRuleLength} />
      <RuleItem passed={r.uppercase} label={dict.auth.passwordRuleUppercase} />
      <RuleItem passed={r.lowercase} label={dict.auth.passwordRuleLowercase} />
      <RuleItem passed={r.digit} label={dict.auth.passwordRuleDigit} />
      <RuleItem passed={r.symbol} label={dict.auth.passwordRuleSymbol} />
    </ul>
  );
}

/** The 6th rule (match), shown under the confirm-password field. */
export function PasswordMatchIndicator({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) {
  const { dict } = useLocale();
  const passed = confirmPassword.length > 0 && password === confirmPassword;

  return (
    <ul className="mt-2 text-xs">
      <RuleItem passed={passed} label={dict.auth.passwordRuleMatch} />
    </ul>
  );
}
