"use client";

import { Container, Typography } from "@mui/material";
import PedidoForm from "../components/PedidoForm";
import { criarPedido } from "../data/mockPedidos";

export default function CriarPedidoPage() {
  const handleSubmit = async (data: {
    cliente: string;
    valor: number;
    descricao: string;
  }) => {
    await criarPedido(data);
    alert("Pedido criado com sucesso!");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="black">
        Criar Pedido
      </Typography>
      <PedidoForm onSubmit={handleSubmit} />
    </Container>
  );
}
