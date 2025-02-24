"use client";

import IndicadorCard from "./components/IndicadorCard";
import PedidoGrid from "./components/PedidoGrid";
import { Box, Button, Container, Typography } from "@mui/material";
import { getIndicador, getPedidos } from "./data/api";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Home() {
  const { data: pedidos = [] } = useQuery({
    queryKey: ["pedidos"],
    queryFn: getPedidos,
  });
  const { data: indicador } = useQuery({
    queryKey: ["indicador"],
    queryFn: getIndicador,
    initialData: { media_pedidos: 0 },
  });
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="black">
        Pedidos
      </Typography>
      <Box sx={{ mb: 4 }}>
        <IndicadorCard valor={indicador} />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Link href="/criarPedido" passHref>
          <Button variant="contained" color="primary">
            Criar Novo Pedido
          </Button>
        </Link>
      </Box>
      <PedidoGrid pedidos={pedidos} />
    </Container>
  );
}
