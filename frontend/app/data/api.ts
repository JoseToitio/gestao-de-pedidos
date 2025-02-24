import { Pedido } from "../types/Pedidos";

const API_URL = "http://127.0.0.1:5000/";

export const getPedidos = async (): Promise<Pedido[]> => {
  try {
    const response = await fetch(`${API_URL}/pedidos`);
    if (!response.ok) {
      throw new Error("Erro ao listar pedidos");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getPedidosById = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/pedidos/${id}`);
    if (!response.ok) {
      throw new Error("Erro ao identificar o id");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
export const criarPedido = async (novoPedido: {
  cliente: string;
  valor: number;
  descricao: string;
}) => {
  try {
    const response = await fetch(`${API_URL}/pedidos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...novoPedido,
      }),
    });
    if (!response.ok) {
      throw new Error("Erro ao criar pedido");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const atualizarPedido = async (
  id: string,
  dadosAtualizados: { cliente: string; valor: number; descricao: string }
) => {
  const response = await fetch(`${API_URL}/pedidos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dadosAtualizados),
  });
  return response.json();
};

export const excluirPedido = async (id: string) => {
  const response = await fetch(`${API_URL}/pedidos/${id}`, {
    method: "DELETE",
  });
  return response.json();
};

export const getIndicador = async () => {
  try {
    const response = await fetch(`${API_URL}/indicador`);
    if (!response.ok) {
      throw new Error("Erro ao carregar indicador");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
