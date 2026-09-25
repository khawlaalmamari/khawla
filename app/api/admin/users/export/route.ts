import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAdmin } from "@/lib/auth/require-admin";
import { buildUserWhere, type UserStatusFilter } from "@/lib/admin/user-filters";
import { isCurrentlyLocked } from "@/lib/auth/login-guard";

function csvEscape(value: string): string {
  // Neutralize formula injection: a user-controlled fullName/username
  // starting with =, +, -, or @ would otherwise be evaluated as a live
  // formula (e.g. =HYPERLINK(...)) when the admin opens this file in
  // Excel/Sheets. Prefixing with a single quote forces it to be read as
  // literal text everywhere without changing what the cell displays.
  const safe = /^[=+\-@]/.test(value) ? `'${value}` : value;
  if (/[",\n]/.test(safe)) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
}

export async function GET(req: NextRequest) {
  const admin = await requireAdmin();
  if (!admin) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const q = req.nextUrl.searchParams.get("q") ?? undefined;
  const status = (req.nextUrl.searchParams.get("status") as UserStatusFilter) || "all";

  const users = await prisma.user.findMany({
    where: buildUserWhere(q, status),
    orderBy: { createdAt: "desc" },
    select: {
      fullName: true,
      username: true,
      email: true,
      role: true,
      emailVerified: true,
      lockedUntil: true,
      createdAt: true,
      lastLoginAt: true,
    },
  });

  const header = [
    "Full Name",
    "Username",
    "Email",
    "Role",
    "Status",
    "Joined",
    "Last Login",
  ];

  const rows = users.map((u) => {
    const statusLabel = isCurrentlyLocked(u)
      ? "Needs Password Reset"
      : u.emailVerified
        ? "Active"
        : "Unverified";
    return [
      u.fullName,
      u.username,
      u.email,
      u.role,
      statusLabel,
      u.createdAt.toISOString(),
      u.lastLoginAt ? u.lastLoginAt.toISOString() : "",
    ];
  });

  const csv = [header, ...rows].map((row) => row.map(csvEscape).join(",")).join("\r\n");
  // UTF-8 BOM so Excel opens Arabic names without mangling the encoding.
  const csvWithBom = `﻿${csv}`;

  return new NextResponse(csvWithBom, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="students-${new Date().toISOString().slice(0, 10)}.csv"`,
    },
  });
}
