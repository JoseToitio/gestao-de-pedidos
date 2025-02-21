export interface Pedido {
  id: string;
  cliente: string;
  valor: number;
  descricao: string;
  data_criacao: string;
}

let pedidos: Pedido[] = [
  {
    id: '1',
    cliente: 'Cliente A',
    valor: 100.0,
    descricao: 'Pedido de exemplo 1',
    data_criacao: '2023-10-01T12:00:00Z',
  },
  {
    id: '2',
    cliente: 'Cliente B',
    valor: 200.0,
    descricao: 'Pedido de exemplo 2',
    data_criacao: '2023-10-02T12:00:00Z',
  },
];

export const getPedidos = (): Promise<Pedido[]> => {
  return new Promise((resolve) => setTimeout(() => resolve(pedidos), 0));
};

export const criarPedido = (novoPedido: Omit<Pedido, 'id' | 'data_criacao'>): Promise<void> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      pedidos.push({
        id: (pedidos.length + 1).toString(),
        ...novoPedido,
        data_criacao: new Date().toISOString(),
      });
      resolve();
    }, 500)
  );
};

export const atualizarPedido = (id: string, dadosAtualizados: Partial<Pedido>): Promise<void> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      pedidos = pedidos.map((pedido) =>
        pedido.id === id ? { ...pedido, ...dadosAtualizados } : pedido
      );
      resolve();
    }, 500)
  );
};

export const excluirPedido = (id: string): Promise<void> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      pedidos = pedidos.filter((pedido) => pedido.id !== id);
      resolve();
    }, 500)
  );
};

export const getIndicador = (): Promise<number> => {
  return new Promise((resolve) => {
    const totalPedidos = pedidos.length;
    const totalClientes = new Set(pedidos.map((pedido) => pedido.cliente)).size;
    const media = totalClientes > 0 ? totalPedidos / totalClientes : 0;
    setTimeout(() => resolve(media), 500);
  });
};

export const getPedidoById = (id: string): Promise<Pedido | undefined> => {
  return new Promise((resolve) =>
    setTimeout(() => {
      const pedido = pedidos.find((pedido) => pedido.id === id);
      resolve(pedido);
    }, 0)
  );
};