"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import PedidoForm from "../components/PedidoForm";
import { criarPedido } from "../data/api";
import { Alert, Container, Typography } from "@mui/material";

export default function CriarPedidoPage() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: criarPedido,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pedidos"] });
      setTimeout(() => {
        router.push("/");
      }, 2000);
    },
  });

  const handleSubmit = (data: {
    cliente: string;
    valor: number;
    descricao: string;
  }) => {
    mutate(data);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, position: "relative" }}>
      {isSuccess && (
        <Alert
          variant="filled"
          severity="success"
          sx={{ position: "absolute", right: 25 }}
        >
          Pedido criado com sucesso!
        </Alert>
      )}
      {isError && <Alert severity="error">Erro ao criar pedido.</Alert>}
      <Typography variant="h4" component="h1" gutterBottom color="black">
        Criar Pedido
      </Typography>
      <PedidoForm onSubmit={handleSubmit} />
    </Container>
  );
}
