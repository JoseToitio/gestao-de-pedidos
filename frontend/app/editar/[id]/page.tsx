'use client';

import PedidoForm from '@/app/components/PedidoForm';
import { useParams } from 'next/navigation';
import { Container, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { atualizarPedido, getPedidosById } from '@/app/data/api';
import { useRouter } from "next/navigation";

export default function EditarPedidoPage() {
  const params = useParams();
  const id = params.id as string;
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: pedido, isLoading, isError } = useQuery({
    queryKey: ['pedido', id],
    queryFn: () => getPedidosById(id),
  });

  const {mutate} = useMutation({
    mutationFn: (dadosAtualizados: { cliente: string; valor: number; descricao: string }) =>
      atualizarPedido(id, dadosAtualizados),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pedidos'] });
      router.push('/');
    },
  });

  const handleSubmit = (data: { cliente: string; valor: number; descricao: string }) => {
    mutate(data);
  };

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar o pedido.</div>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="black">
        Editar Pedido
      </Typography>
      <PedidoForm initialData={pedido} onSubmit={handleSubmit} />
    </Container>
  );
}