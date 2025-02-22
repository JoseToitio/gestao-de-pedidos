'use client';

import PedidoForm from '@/app/components/PedidoForm';
import { atualizarPedido, getPedidoById, Pedido } from '@/app/data/mockPedidos';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'
import { Container, Typography } from '@mui/material';
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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="black">
        Editar Pedido
      </Typography>
      <PedidoForm initialData={pedido} onSubmit={handleSubmit} />
    </Container>
  );
}