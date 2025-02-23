'use client';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { excluirPedido } from '../data/api';

interface Pedido {
  id: string;
  cliente: string;
  valor: number;
  descricao: string;
  data_criacao: string;
}

interface PedidoGridProps {
  pedidos: Pedido[];
}

export default function PedidoGrid({ pedidos }: PedidoGridProps) {
  const queryClient = useQueryClient();

  const {mutate} = useMutation({
    mutationFn: excluirPedido,
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey.includes('pedidos') || query.queryKey.includes('indicador'),
      });
    },
  });

  const handleExcluirPedido = (id: string) => {
    mutate(id);
  };
  return (
    <TableContainer component={Paper} sx={{ mt: 2 }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#1976d2' }}>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Cliente</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Valor</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Descrição</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Data de Criação</TableCell>
            <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pedidos?.map((pedido) => (
            <TableRow key={pedido.id} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
              <TableCell>{pedido.cliente}</TableCell>
              <TableCell>R$ {pedido.valor?.toFixed(2)}</TableCell>
              <TableCell>{pedido.descricao}</TableCell>
              <TableCell>{new Date(pedido.data_criacao).toLocaleDateString()}</TableCell>
              <TableCell>
                <Link href={`/editar/${pedido.id}`} passHref>
                  <Button variant="contained" color="primary" size="small">
                    Editar
                  </Button>
                </Link>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleExcluirPedido(pedido.id)}
                  sx={{ ml: 1 }}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}