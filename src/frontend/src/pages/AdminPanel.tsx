import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Loader2, LogOut, RefreshCw, Shield } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import {
  useGetAllQueries,
  useGetQueryCountByStatus,
  useUpdateQueryStatus,
} from "../hooks/useQueries";

const ADMIN_PASSWORD = "Krishna@2024";

function StatusBadge({ status }: { status: string }) {
  if (status === "new")
    return (
      <Badge className="bg-orange-100 text-orange-700 border border-orange-200 hover:bg-orange-100">
        New
      </Badge>
    );
  if (status === "read")
    return (
      <Badge className="bg-blue-100 text-blue-700 border border-blue-200 hover:bg-blue-100">
        Read
      </Badge>
    );
  if (status === "resolved")
    return (
      <Badge className="bg-green-100 text-green-700 border border-green-200 hover:bg-green-100">
        Resolved
      </Badge>
    );
  return <Badge variant="outline">{status}</Badge>;
}

function formatDate(timestamp: bigint): string {
  const ms = Number(timestamp) / 1_000_000;
  return new Date(ms).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function AdminPanel() {
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { data: queries, isLoading, refetch } = useGetAllQueries();
  const { data: statusCounts } = useGetQueryCountByStatus();
  const updateStatus = useUpdateQueryStatus();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    await new Promise((r) => setTimeout(r, 500));
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      toast.success("Welcome, Admin!");
    } else {
      setLoginError("Incorrect password. Please try again.");
    }
    setIsLoggingIn(false);
  };

  const handleStatusUpdate = async (queryId: bigint, newStatus: string) => {
    try {
      await updateStatus.mutateAsync({ queryId, newStatus });
      toast.success("Status updated successfully");
    } catch {
      toast.error("Failed to update status");
    }
  };

  const getCountForStatus = (status: string) => {
    if (!statusCounts) return 0;
    const entry = statusCounts.find(([s]) => s === status);
    return entry ? Number(entry[1]) : 0;
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-kp-beige flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl border border-kp-border shadow-card w-full max-w-sm p-8"
          data-ocid="admin.panel"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-kp-gold/10 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-kp-gold" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Krishna Properties
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label
                htmlFor="admin-password"
                className="text-sm font-medium mb-1.5 block"
              >
                Admin Password
              </Label>
              <Input
                id="admin-password"
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={loginError ? "border-red-400" : ""}
                data-ocid="admin.input"
              />
              {loginError && (
                <p
                  className="text-red-500 text-xs mt-1"
                  data-ocid="admin.error_state"
                >
                  {loginError}
                </p>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-kp-gold hover:bg-kp-gold-dark text-white font-semibold"
              data-ocid="admin.submit_button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Verifying...
                </>
              ) : (
                "Login to Admin"
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => {
                window.location.hash = "";
              }}
              className="text-sm text-kp-gold hover:text-kp-gold-dark transition-colors"
              data-ocid="admin.button"
            >
              ← Back to Website
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-kp-footer text-white py-4 px-6 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <span className="text-xl">🏠</span>
          <div>
            <div className="font-bold text-kp-gold">Krishna Properties</div>
            <div className="text-xs text-kp-footer-accent">Admin Dashboard</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="text-kp-footer-accent border-kp-footer-accent/30 hover:bg-white/10"
            data-ocid="admin.secondary_button"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Refresh
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsLoggedIn(false);
              window.location.hash = "";
            }}
            className="text-kp-footer-accent hover:bg-white/10"
            data-ocid="admin.secondary_button"
          >
            <LogOut className="w-3.5 h-3.5 mr-1.5" /> Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div
            className="bg-white rounded-lg border border-gray-200 p-4 text-center"
            data-ocid="admin.card"
          >
            <div className="text-2xl font-bold text-foreground">
              {queries?.length ?? 0}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Total Queries
            </div>
          </div>
          <div
            className="bg-white rounded-lg border border-orange-200 p-4 text-center"
            data-ocid="admin.card"
          >
            <div className="text-2xl font-bold text-orange-600">
              {getCountForStatus("new")}
            </div>
            <div className="text-xs text-muted-foreground mt-1">New</div>
          </div>
          <div
            className="bg-white rounded-lg border border-blue-200 p-4 text-center"
            data-ocid="admin.card"
          >
            <div className="text-2xl font-bold text-blue-600">
              {getCountForStatus("read")}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Read</div>
          </div>
          <div
            className="bg-white rounded-lg border border-green-200 p-4 text-center"
            data-ocid="admin.card"
          >
            <div className="text-2xl font-bold text-green-600">
              {getCountForStatus("resolved")}
            </div>
            <div className="text-xs text-muted-foreground mt-1">Resolved</div>
          </div>
        </div>

        {/* Queries Table */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="font-bold text-foreground flex items-center gap-2">
              <Eye className="w-4 h-4 text-kp-gold" />
              Customer Queries
            </h2>
            <span className="text-xs text-muted-foreground">
              {queries?.length ?? 0} total
            </span>
          </div>

          {isLoading ? (
            <div
              className="flex items-center justify-center py-16"
              data-ocid="admin.loading_state"
            >
              <Loader2 className="w-6 h-6 text-kp-gold animate-spin" />
              <span className="ml-2 text-muted-foreground">
                Loading queries...
              </span>
            </div>
          ) : !queries || queries.length === 0 ? (
            <div
              className="text-center py-16 text-muted-foreground"
              data-ocid="admin.empty_state"
            >
              <div className="text-4xl mb-3">📭</div>
              <p className="font-medium">No queries yet</p>
              <p className="text-sm">
                Customer queries will appear here once submitted.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-ocid="admin.table">
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      #
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Name
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Phone
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Email
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Service
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Message
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Date
                    </TableHead>
                    <TableHead className="font-semibold text-xs uppercase tracking-wide">
                      Status
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {queries.map((q, i) => (
                    <TableRow
                      key={String(q.id)}
                      className="hover:bg-gray-50"
                      data-ocid={`admin.row.${i + 1}`}
                    >
                      <TableCell className="text-muted-foreground text-sm">
                        {String(q.id)}
                      </TableCell>
                      <TableCell className="font-medium text-sm">
                        {q.name}
                      </TableCell>
                      <TableCell className="text-sm">{q.phone}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {q.email || "—"}
                      </TableCell>
                      <TableCell>
                        <span className="text-xs bg-kp-beige text-kp-brown px-2 py-0.5 rounded-full">
                          {q.serviceType}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <p
                          className="text-xs text-muted-foreground truncate"
                          title={q.message}
                        >
                          {q.message || "—"}
                        </p>
                      </TableCell>
                      <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(q.timestamp)}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1.5">
                          <StatusBadge status={q.status} />
                          <Select
                            value={q.status}
                            onValueChange={(val) =>
                              handleStatusUpdate(q.id, val)
                            }
                          >
                            <SelectTrigger
                              className="w-28 h-7 text-xs"
                              data-ocid={`admin.select.${i + 1}`}
                            >
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="new">New</SelectItem>
                              <SelectItem value="read">Read</SelectItem>
                              <SelectItem value="resolved">Resolved</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
