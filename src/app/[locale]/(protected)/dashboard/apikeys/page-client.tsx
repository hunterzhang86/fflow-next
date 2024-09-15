"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import dayjs from "dayjs";
import { CopyIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

import { APIKey, createAPIKey, deleteAPIKey, getAPIKeys } from "@/lib/apikeys";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
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
import { EmptyPlaceholder } from "@/components/shared/empty-placeholder";

export default function APIKeysPageClient({ locale }: { locale: string }) {
  const t = useTranslations("APIKeysPage");

  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState(t("defaultKeyName"));

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
      toast.error(t("fetchError"));
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateKey() {
    const trimmedKeyName = newKeyName.trim();
    if (!trimmedKeyName) {
      toast.error(t("emptyKeyNameError"));
      return;
    }
    try {
      const newKey = await createAPIKey(trimmedKeyName);
      setApiKeys((prevKeys) => [newKey, ...prevKeys]);
      toast.success(t("keyCreatedSuccess"));
      setIsCreateDialogOpen(false);
      setNewKeyName(t("defaultKeyName"));
    } catch (err) {
      toast.error(t("keyCreationError"));
    }
  }

  async function handleDeleteKey(id: string) {
    try {
      await deleteAPIKey(id);
      setApiKeys((prevKeys) => prevKeys.filter((key) => key.id !== id));
      toast.success(t("keyDeletedSuccess"));
    } catch (err) {
      toast.error(t("keyDeletionError"));
    }
  }

  function handleCopyKey(key: string) {
    navigator.clipboard.writeText(key);
    toast.success(t("keyCopiedSuccess"));
  }

  function maskApiKey(key: string) {
    const visiblePart = 10;
    const hiddenPart = 20;
    return `${key.slice(0, visiblePart)}${"•".repeat(hiddenPart)}`;
  }

  return (
    <>
      <DashboardHeader heading={t("heading")} text={t("subheading")} />
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-left">{t("createAPIKey")}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="name" className="col-span-4 text-left">
                {t("name")}
              </label>
              <Input
                id="name"
                value={newKeyName}
                placeholder={t("apiKeyNamePlaceholder")}
                onChange={(e) => setNewKeyName(e.target.value || t("defaultKeyName"))}
                className="col-span-4"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={handleCreateKey} disabled={loading}>
              {t("create")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
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
          <EmptyPlaceholder.Title>{t("noAPIKeys")}</EmptyPlaceholder.Title>
          <EmptyPlaceholder.Description>
            {t("noAPIKeysDescription")}
          </EmptyPlaceholder.Description>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            {t("createAPIKey")}
          </Button>
        </EmptyPlaceholder>
      ) : (
        <>
          <div className="mb-4 flex justify-end">
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              {t("createAPIKey")}
            </Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("name")}</TableHead>
                <TableHead>{t("apiKey")}</TableHead>
                <TableHead>{t("created")}</TableHead>
                <TableHead>{t("actions")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((apiKey) => (
                <TableRow key={apiKey.id}>
                  <TableCell>{apiKey.name}</TableCell>
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
                        <TooltipContent>{t("copyFullAPIKey")}</TooltipContent>
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
          <Pagination pagination={pagination} setPagination={setPagination} />
        </>
      )}
    </>
  );
}