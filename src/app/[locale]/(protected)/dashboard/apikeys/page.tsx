"use client";

import { useEffect, useState } from "react";
import { APIKey, createAPIKey, deleteAPIKey, getAPIKeys } from "@/lib/apikeys";
import { Button, Table, Space, message, Tooltip, Row, Col } from "antd";
import { CopyOutlined, DeleteOutlined } from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import { DashboardHeader } from "@/components/dashboard/header";
import dayjs from 'dayjs';

export default function APIKeysPage() {
  const [apiKeys, setApiKeys] = useState<APIKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

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
      message.error("Failed to fetch API keys");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateKey() {
    try {
      const newKey = await createAPIKey();
      setApiKeys((prevKeys) => [newKey, ...prevKeys]);
      message.success("API key created successfully");
    } catch (err) {
      message.error("Failed to create API key");
    }
  }

  async function handleDeleteKey(id: string) {
    try {
      await deleteAPIKey(id);
      setApiKeys((prevKeys) => prevKeys.filter((key) => key.id !== id));
      message.success("API key deleted successfully");
    } catch (err) {
      message.error("Failed to delete API key");
    }
  }

  function handleCopyKey(key: string) {
    navigator.clipboard.writeText(key);
    message.success("Full API key copied to clipboard");
  }

  function maskApiKey(key: string) {
    return `${key.slice(0, 10)}${'*'.repeat(15)}`;
  }

  const columns: ColumnsType<APIKey> = [
    {
      title: "API Key",
      dataIndex: "key",
      key: "key",
      render: (key: string) => (
        <Space>
          {maskApiKey(key)}
          <Tooltip title="Copy full API key">
            <Button
              icon={<CopyOutlined />}
              onClick={() => handleCopyKey(key)}
              size="small"
            />
          </Tooltip>
        </Space>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleDeleteKey(record.id)}
          danger
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <>
      <DashboardHeader heading="API Keys" text="Manage your API keys here." />
      <Table
        columns={columns}
        dataSource={apiKeys}
        rowKey="id"
        loading={loading}
        pagination={{
          ...pagination,
          onChange: (page, pageSize) => {
            setPagination((prev) => ({
              ...prev,
              current: page,
              pageSize,
            }));
          },
        }}
        title={() => (
          <Row justify="end">
            <Col>
              <Button type="primary" onClick={handleCreateKey} disabled={loading}>
                Create New API Key
              </Button>
            </Col>
          </Row>
        )}
      />
    </>
  );
}