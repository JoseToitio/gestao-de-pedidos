'use client';

import PedidoForm from '@/app/components/PedidoForm';
import { atualizarPedido, getPedidoById, Pedido } from '@/app/data/mockPedidos';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'
export default function EditarPedidoPage() {
  const params = useParams();
  const id = params.id as string;

  const [pedido, setPedido] = useState<Pedido | null>(null);

  useEffect(() => {
    getPedidoById(id).then((pedido) => {
      if (pedido) {
        setPedido(pedido);
      }
    });
  }, [id]);

  const handleSubmit = async (data: { cliente: string; valor: number; descricao: string }) => {
    if (pedido) {
      await atualizarPedido(pedido.id, data);
      alert('Pedido atualizado com sucesso!');
      redirect('/')
    }
  };

  if (!pedido) return <div>Carregando...</div>;

  return (
    <div>
      <h1>Editar Pedido</h1>
      <PedidoForm initialData={pedido} onSubmit={handleSubmit} />
    </div>
  );
}