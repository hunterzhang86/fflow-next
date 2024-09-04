"use client";

import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { CopyIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

import { APIKey, createAPIKey, deleteAPIKey, getAPIKeys } from "@/lib/apikeys";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DashboardHeader } from "@/components/dashboard/header";
import { Pagination } from "@/components/ui/pagination";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

export default function APIKeysPage() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState("My API Key");

  useEffect(() => {
    fetchAPIKeys();
  }, [pagination.current, pagination.pageSize]);

  async function fetchAPIKeys() {
    try {
      setLoading(true);
      const response = await getAPIKeys(
        pagination.current,
        pagination.pageSize,
      );
      setApiKeys(response.data.keys);
      setPagination((prev) => ({
        ...prev,
        total: response.data.totalCount,
      }));
    } catch (err) {
      toast.error("Failed to fetch API keys");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateKey() {
    const trimmedKeyName = newKeyName.trim();
    if (!trimmedKeyName) {
      toast.error("API Key name cannot be empty");
      return;
    }
    try {
      const newKey = await createAPIKey(trimmedKeyName);
      setApiKeys((prevKeys) => [newKey, ...prevKeys]);
      toast.success("API key created successfully");
      setIsCreateDialogOpen(false);
      setNewKeyName("My API Key"); // 重置为默认值
    } catch (err) {
      toast.error("Failed to create API key");
    }
  }

  async function handleDeleteKey(id: string) {
    try {
      await deleteAPIKey(id);
      setApiKeys((prevKeys) => prevKeys.filter((key) => key.id !== id));
      toast.success("API key deleted successfully");
    } catch (err) {
      toast.error("Failed to delete API key");
    }
  }

  function handleCopyKey(key: string) {
    navigator.clipboard.writeText(key);
    toast.success("Full API key copied to clipboard");
  }

  function maskApiKey(key: string) {
    const visiblePart = 6; // 可见部分的长度
    const hiddenPart = 16; // 隐藏部分的长度
    return `${key.slice(0, visiblePart)}${"•".repeat(hiddenPart)}`;
  }

  return (
    <>
      <DashboardHeader heading="API Keys" text="Manage your API keys here." />
      {apiKeys.length > 0 && (
        <div className="mb-4 flex justify-end">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button>Create API Key</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle className="text-left">Create API Key</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <label htmlFor="name" className="col-span-4 text-left">
                    Name
                  </label>
                  <Input
                    id="name"
                    value={newKeyName}
                    placeholder="API Key Name"
                    onChange={(e) => setNewKeyName(e.target.value || "My API Key")}
                    className="col-span-4"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button onClick={handleCreateKey} disabled={loading}>
                  Create
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : apiKeys.length === 0 ? (
        <EmptyPlaceholder>
          <EmptyPlaceholder.Icon name="apiKeys" />
          <EmptyPlaceholder.Title>No API Keys</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            You haven&apos;t created any API keys yet. Start by creating a new API key.
          </EmptyPlaceholder.Description>
          <Button onClick={() => setIsCreateDialogOpen(true)}>Create API Key</Button>
        </EmptyPlaceholder>
      ) : (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell>
                    {apiKey.name}
                  </TableCell>
                  <TableCell className="font-mono">
                    {maskApiKey(apiKey.key)}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopyKey(apiKey.key)}
                          >
                            <CopyIcon className="size-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy full API key</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </TableCell>
                  <TableCell>
                    {dayjs(apiKey.createdAt).format("YYYY-MM-DD HH:mm:ss")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteKey(apiKey.id)}
                      className="text-red-500 hover:bg-red-100 hover:text-red-700"
                    >
                      <TrashIcon className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            pagination={pagination}
            setPagination={setPagination}
          />
        </>
      )}
    </>
  );
}
