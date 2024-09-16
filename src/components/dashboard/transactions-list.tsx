"use client";

import { useTranslations } from "next-intl";
import Link from "@/components/link/link";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TransactionsList() {
  const t = useTranslations("AdminPage.transactionsList");

  const transactions = [
    { customer: "Liam Johnson", email: "liam@example.com", type: "sale", status: "approved", date: "2023-06-23", amount: "$250.00" },
    { customer: "Olivia Smith", email: "olivia@example.com", type: "refund", status: "declined", date: "2023-06-24", amount: "$150.00" },
    { customer: "Noah Williams", email: "noah@example.com", type: "subscription", status: "approved", date: "2023-06-25", amount: "$350.00" },
    { customer: "Emma Brown", email: "emma@example.com", type: "sale", status: "approved", date: "2023-06-26", amount: "$450.00" },
    { customer: "Liam Johnson", email: "liam@example.com", type: "sale", status: "approved", date: "2023-06-27", amount: "$550.00" },
  ];

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
          <CardTitle>{t("title")}</CardTitle>
          <CardDescription className="text-balance">
            {t("description")}
          </CardDescription>
        </div>
        <Button size="sm" className="ml-auto shrink-0 gap-1 px-4">
          <Link href="#" className="flex items-center gap-2">
            <span>{t("viewAll")}</span>
            <ArrowUpRight className="hidden size-4 sm:block" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("customer")}</TableHead>
              <TableHead className="hidden xl:table-column">{t("type")}</TableHead>
              <TableHead className="hidden xl:table-column">{t("status")}</TableHead>
              <TableHead className="hidden xl:table-column">{t("date")}</TableHead>
              <TableHead className="text-right">{t("amount")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="font-medium">{transaction.customer}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {transaction.email}
                  </div>
                </TableCell>
                <TableCell className="hidden xl:table-column">{t(transaction.type)}</TableCell>
                <TableCell className="hidden xl:table-column">
                  <Badge className="text-xs" variant="outline">
                    {t(transaction.status)}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell lg:hidden xl:table-column">
                  {transaction.date}
                </TableCell>
                <TableCell className="text-right">{transaction.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
