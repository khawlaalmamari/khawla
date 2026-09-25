"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "@/components/locale-provider";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Field, inputClass } from "@/components/ui/field";

export type AdminUser = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  role: string;
  emailVerified: boolean;
  createdAt: Date;
  lastLoginAt: Date | null;
  isLocked: boolean;
};

const emptyAddForm = { fullName: "", username: "", email: "", password: "", role: "student" };

export function UserManagementTable({
  users,
  currentUserId,
  locale,
  q,
  status,
  page,
  totalPages,
}: {
  users: AdminUser[];
  currentUserId: string;
  locale: "ar" | "en";
  q: string;
  status: string;
  page: number;
  totalPages: number;
}) {
  const { dict } = useLocale();
  const router = useRouter();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [addForm, setAddForm] = useState(emptyAddForm);
  const [sendingResetId, setSendingResetId] = useState<string | null>(null);
  const [resetSentId, setResetSentId] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState(q);
  const [editForm, setEditForm] = useState({
    fullName: "",
    username: "",
    email: "",
    role: "student",
    emailVerified: true,
  });

  function goToFilters(next: { q?: string; status?: string; page?: number }) {
    const params = new URLSearchParams();
    const nextQ = next.q ?? q;
    const nextStatus = next.status ?? status;
    const nextPage = next.page ?? 1;
    if (nextQ) params.set("q", nextQ);
    if (nextStatus && nextStatus !== "all") params.set("status", nextStatus);
    if (nextPage > 1) params.set("page", String(nextPage));
    router.push(`/admin?${params.toString()}`);
  }

  function onSearchSubmit(e: React.FormEvent) {
    e.preventDefault();
    goToFilters({ q: searchInput, page: 1 });
  }

  const exportUrl = (() => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (status && status !== "all") params.set("status", status);
    return `/api/admin/users/export?${params.toString()}`;
  })();

  function formatDate(date: Date) {
    return new Date(date).toLocaleDateString(locale === "ar" ? "ar" : "en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function errorMessage(code?: string) {
    switch (code) {
      case "emailTaken":
        return dict.auth.errors.emailTaken;
      case "usernameTaken":
        return dict.auth.errors.usernameTaken;
      case "invalidUsername":
        return dict.auth.errors.invalidUsername;
      case "weakPassword":
        return dict.auth.errors.weakPasswordRejected;
      case "cannotDeleteSelf":
        return dict.admin.cannotDeleteSelf;
      default:
        return dict.auth.errors.genericError;
    }
  }

  async function onAddSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addForm),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(errorMessage(data.error));
        return;
      }
      setShowAddForm(false);
      setAddForm(emptyAddForm);
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(u: AdminUser) {
    setEditingId(u.id);
    setEditForm({
      fullName: u.fullName,
      username: u.username,
      email: u.email,
      role: u.role,
      emailVerified: u.emailVerified,
    });
    setError(null);
  }

  async function onEditSubmit(id: string) {
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editForm),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(errorMessage(data.error));
        return;
      }
      setEditingId(null);
      router.refresh();
    } finally {
      setSubmitting(false);
    }
  }

  async function onSendResetLink(u: AdminUser) {
    setError(null);
    setResetSentId(null);
    setSendingResetId(u.id);
    try {
      const res = await fetch(`/api/admin/users/${u.id}/send-reset-password`, {
        method: "POST",
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(errorMessage(data.error));
        return;
      }
      setResetSentId(u.id);
    } finally {
      setSendingResetId(null);
    }
  }

  async function onDelete(u: AdminUser) {
    if (!confirm(dict.admin.deleteConfirm.replace("{name}", u.fullName))) return;
    setError(null);
    const res = await fetch(`/api/admin/users/${u.id}`, { method: "DELETE" });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(errorMessage(data.error));
      return;
    }
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <form onSubmit={onSearchSubmit} className="flex items-center gap-2">
            <input
              type="search"
              placeholder={dict.admin.searchPlaceholder}
              className={`${inputClass} w-56`}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Button type="submit" variant="outline">
              {dict.admin.search}
            </Button>
          </form>
          <select
            className={inputClass}
            value={status}
            onChange={(e) => goToFilters({ status: e.target.value, page: 1 })}
          >
            <option value="all">{dict.admin.filterAll}</option>
            <option value="active">{dict.admin.accountActive}</option>
            <option value="locked">{dict.admin.accountNeedsReset}</option>
            <option value="unverified">{dict.admin.unverified}</option>
          </select>
          <a href={exportUrl} className="text-sm font-medium text-primary-700 hover:underline">
            {dict.admin.exportCsv}
          </a>
        </div>
        <Button type="button" onClick={() => setShowAddForm((v) => !v)}>
          {dict.admin.addUser}
        </Button>
      </div>

      {error && <p className="text-sm text-danger">{error}</p>}

      {showAddForm && (
        <Card>
          <form onSubmit={onAddSubmit} className="grid gap-4 sm:grid-cols-2">
            <Field label={dict.auth.fullNameLabel} htmlFor="add-fullName">
              <input
                id="add-fullName"
                required
                className={inputClass}
                value={addForm.fullName}
                onChange={(e) => setAddForm((f) => ({ ...f, fullName: e.target.value }))}
              />
            </Field>
            <Field label={dict.auth.usernameLabel} htmlFor="add-username">
              <input
                id="add-username"
                required
                className={inputClass}
                value={addForm.username}
                onChange={(e) => setAddForm((f) => ({ ...f, username: e.target.value }))}
              />
            </Field>
            <Field label={dict.auth.emailLabel} htmlFor="add-email">
              <input
                id="add-email"
                type="email"
                required
                className={inputClass}
                value={addForm.email}
                onChange={(e) => setAddForm((f) => ({ ...f, email: e.target.value }))}
              />
            </Field>
            <Field label={dict.auth.passwordLabel} htmlFor="add-password">
              <input
                id="add-password"
                type="password"
                required
                minLength={8}
                className={inputClass}
                value={addForm.password}
                onChange={(e) => setAddForm((f) => ({ ...f, password: e.target.value }))}
              />
            </Field>
            <Field label={dict.admin.role} htmlFor="add-role">
              <select
                id="add-role"
                className={inputClass}
                value={addForm.role}
                onChange={(e) => setAddForm((f) => ({ ...f, role: e.target.value }))}
              >
                <option value="student">{dict.admin.roleStudent}</option>
                <option value="admin">{dict.admin.roleAdmin}</option>
              </select>
            </Field>
            <div className="flex items-end gap-2">
              <Button type="submit" disabled={submitting}>
                {dict.common.save}
              </Button>
              <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                {dict.common.cancel}
              </Button>
            </div>
          </form>
        </Card>
      )}

      <Card className="overflow-x-auto p-0">
        {users.length === 0 ? (
          <p className="p-6 text-sm text-muted">{dict.admin.noUsers}</p>
        ) : (
          <table className="w-full min-w-[900px] text-start text-sm">
            <thead className="border-b border-border text-start text-xs uppercase text-muted">
              <tr>
                <th className="px-4 py-3 text-start">{dict.admin.tableName}</th>
                <th className="px-4 py-3 text-start">{dict.admin.tableUsername}</th>
                <th className="px-4 py-3 text-start">{dict.admin.tableEmail}</th>
                <th className="px-4 py-3 text-start">{dict.admin.role}</th>
                <th className="px-4 py-3 text-start">{dict.admin.tableStatus}</th>
                <th className="px-4 py-3 text-start">{dict.admin.tableJoined}</th>
                <th className="px-4 py-3 text-start">{dict.admin.tableLastLogin}</th>
                <th className="px-4 py-3 text-start">{dict.admin.tableActions}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) =>
                editingId === u.id ? (
                  <tr key={u.id} className="border-b border-border bg-surface last:border-0">
                    <td className="px-4 py-3">
                      <input
                        className={inputClass}
                        value={editForm.fullName}
                        onChange={(e) => setEditForm((f) => ({ ...f, fullName: e.target.value }))}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        className={inputClass}
                        value={editForm.username}
                        onChange={(e) => setEditForm((f) => ({ ...f, username: e.target.value }))}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        type="email"
                        className={inputClass}
                        value={editForm.email}
                        onChange={(e) => setEditForm((f) => ({ ...f, email: e.target.value }))}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <select
                        className={inputClass}
                        value={editForm.role}
                        onChange={(e) => setEditForm((f) => ({ ...f, role: e.target.value }))}
                      >
                        <option value="student">{dict.admin.roleStudent}</option>
                        <option value="admin">{dict.admin.roleAdmin}</option>
                      </select>
                    </td>
                    <td className="px-4 py-3">
                      <label className="flex items-center gap-2 text-xs">
                        <input
                          type="checkbox"
                          checked={editForm.emailVerified}
                          onChange={(e) =>
                            setEditForm((f) => ({ ...f, emailVerified: e.target.checked }))
                          }
                        />
                        {dict.admin.emailVerifiedLabel}
                      </label>
                    </td>
                    <td className="px-4 py-3 text-muted">{formatDate(u.createdAt)}</td>
                    <td className="px-4 py-3 text-muted">
                      {u.lastLoginAt ? formatDate(u.lastLoginAt) : dict.admin.never}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={submitting}
                          onClick={() => onEditSubmit(u.id)}
                          className="text-xs font-medium text-primary-700 hover:underline disabled:opacity-60"
                        >
                          {dict.common.save}
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="text-xs font-medium text-muted hover:underline"
                        >
                          {dict.common.cancel}
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr key={u.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium">{u.fullName}</td>
                    <td className="px-4 py-3 text-muted">{u.username}</td>
                    <td className="px-4 py-3 text-muted">{u.email}</td>
                    <td className="px-4 py-3">
                      <Badge tone={u.role === "admin" ? "primary" : "neutral"}>
                        {u.role === "admin" ? dict.admin.roleAdmin : dict.admin.roleStudent}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      {u.isLocked ? (
                        <Badge tone="danger">{dict.admin.accountNeedsReset}</Badge>
                      ) : u.emailVerified ? (
                        <Badge tone="success">{dict.admin.accountActive}</Badge>
                      ) : (
                        <Badge tone="neutral">{dict.admin.unverified}</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-muted">{formatDate(u.createdAt)}</td>
                    <td className="px-4 py-3 text-muted">
                      {u.lastLoginAt ? formatDate(u.lastLoginAt) : dict.admin.never}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => startEdit(u)}
                          className="text-xs font-medium text-primary-700 hover:underline"
                        >
                          {dict.admin.edit}
                        </button>
                        <button
                          type="button"
                          disabled={sendingResetId === u.id}
                          onClick={() => onSendResetLink(u)}
                          className="text-xs font-medium text-accent-700 hover:underline disabled:opacity-60"
                        >
                          {dict.admin.sendResetLink}
                        </button>
                        {resetSentId === u.id && (
                          <span className="text-xs text-success">{dict.admin.resetLinkSent}</span>
                        )}
                        {u.id !== currentUserId && (
                          <button
                            type="button"
                            onClick={() => onDelete(u)}
                            className="text-xs font-medium text-danger hover:underline"
                          >
                            {dict.admin.delete}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
        )}
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 text-sm">
          <Button
            type="button"
            variant="outline"
            disabled={page <= 1}
            onClick={() => goToFilters({ page: page - 1 })}
          >
            {dict.admin.previousPage}
          </Button>
          <span className="text-muted">
            {dict.admin.pageOf.replace("{page}", String(page)).replace("{total}", String(totalPages))}
          </span>
          <Button
            type="button"
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => goToFilters({ page: page + 1 })}
          >
            {dict.admin.nextPage}
          </Button>
        </div>
      )}
    </div>
  );
}
