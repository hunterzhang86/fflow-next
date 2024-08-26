// 定义 APIKey 类型
export interface APIKey {
  id: string;
  key: string;
  createdAt: string;
  updatedAt: string;
}

// 修改 getAPIKeys 函数
export async function getAPIKeys(page: number, limit: number) {
    const response = await fetch(`/api/apikeys?page=${page}&limit=${limit}`);
    if (!response.ok) {
        throw new Error('Failed to fetch API keys');
    }
    return await response.json();
}

// 创建API密钥
export async function createAPIKey() : Promise<APIKey>  {
    const resp = await fetch("/api/apikeys", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const respJson = await resp.json();
    const data = respJson.data;
    return {
        id: data.id,
        key: data.key,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
    };
}

// 删除API密钥
export async function deleteAPIKey(id: string) {
    const resp = await fetch(`/api/apikeys/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!resp.ok) {
        throw new Error('Failed to delete API key');
    }
    return resp.json();
}