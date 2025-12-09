"use client"

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "@prisma/client";

interface UserWithCounts extends User {
  _count: {
    teams: number;
    assignedTasks: number;
  };
}

export default function UserManagementTable({
  users,
}: {
  users: UserWithCounts[];
}) {
  const [loading, setLoading] = useState<string | null>(null);

  const handleRoleChange = async (userId: string, newRole: "ADMIN" | "USER") => {
    try {
      setLoading(userId);
      const res = await fetch(`/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) throw new Error("Failed to update role");
      window.location.reload();
    } catch (error) {
      console.error("Error updating role:", error);
      alert("Failed to update role. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      setLoading(userId);
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete user");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Teams</TableHead>
            <TableHead>Tasks</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    user.role === "ADMIN"
                      ? "bg-purple-100 text-purple-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {user.role}
                </span>
              </TableCell>
              <TableCell>{user._count.teams}</TableCell>
              <TableCell>{user._count.assignedTasks}</TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={loading === user.id}
                    >
                      {loading === user.id ? "..." : "Actions"}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() =>
                        handleRoleChange(
                          user.id,
                          user.role === "ADMIN" ? "USER" : "ADMIN"
                        )
                      }
                    >
                      {user.role === "ADMIN"
                        ? "Remove Admin Role"
                        : "Make Admin"}
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete User
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}