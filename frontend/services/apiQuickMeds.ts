const BASE_URL = "http://192.168.0.9:5050";

export interface RespuestaApi {
  status: number;
  message: string;
  data?: any;
  token?: string;
  user?: any;
  error?: string;
}

function headersConToken(token?: string) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

export async function getApi(endpoint: string, token?: string): Promise<RespuestaApi> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "GET",
    headers: headersConToken(token),
  });

  return response.json();
}

export async function postApi(endpoint: string, body: object, token?: string): Promise<RespuestaApi> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: headersConToken(token),
    body: JSON.stringify(body),
  });

  return response.json();
}

export async function putApi(endpoint: string, body: object, token?: string): Promise<RespuestaApi> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: headersConToken(token),
    body: JSON.stringify(body),
  });

  return response.json();
}

export async function deleteApi(endpoint: string, token?: string): Promise<RespuestaApi> {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: headersConToken(token),
  });

  return response.json();
}
