'use client';

import PedidoForm from "../components/PedidoForm";
import { criarPedido } from "../data/mockPedidos";

export default function CriarPedidoPage() {
  const handleSubmit = async (data: { cliente: string; valor: number; descricao: string }) => {
    await criarPedido(data);
    alert('Pedido criado com sucesso!');
  };

  return (
    <div>
      <h1>Criar Pedido</h1>
      <PedidoForm onSubmit={handleSubmit} />
    </div>
  );
}