"use client";

import PedidoForm from "@/app/components/PedidoForm";
import { useParams } from "next/navigation";
import { Alert, Container, Typography } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { atualizarPedido, getPedidosById } from "@/app/data/api";
import { useRouter } from "next/navigation";

export default function EditarPedidoPage() {
  const params = useParams();
  const id = params.id as string;
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data: pedido, isLoading } = useQuery({
    queryKey: ["pedidos", id],
    queryFn: () => getPedidosById(id),
  });

  const { mutate, isSuccess, isError } = useMutation({
    mutationFn: (dadosAtualizados: {
      cliente: string;
      valor: number;
      descricao: string;
    }) => atualizarPedido(id, dadosAtualizados),
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

  if (isLoading)
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        Carregando...
      </Container>
    );
  if (isError)
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        Erro ao carregar o pedido.
      </Container>
    );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, position: "relative" }}>
      {isSuccess && (
        <Alert
          variant="filled"
          severity="success"
          sx={{ position: "absolute", right: 25 }}
        >
          Pedido atualizado com sucesso!
        </Alert>
      )}
      {isError && <Alert severity="error">Erro ao atualizar pedido.</Alert>}
      <Typography variant="h4" component="h1" gutterBottom color="black">
        Editar Pedido
      </Typography>
      <PedidoForm initialData={pedido} onSubmit={handleSubmit} />
    </Container>
  );
}
