"use client";

import { useEffect, useState } from "react";
import { getIndicador, getPedidos, Pedido } from "./data/mockPedidos";
import IndicadorCard from "./components/IndicadorCard";
import PedidoGrid from "./components/PedidoGrid";
import { Box, Container, Typography } from "@mui/material";

export default function Home() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [indicador, setIndicador] = useState(0);

  useEffect(() => {
    getPedidos().then(setPedidos);
    getIndicador().then(setIndicador);
  }, []);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom color="black">
        Pedidos
      </Typography>
      <Box sx={{ mb: 4 }}>
        <IndicadorCard valor={indicador} />
      </Box>
      <PedidoGrid pedidos={pedidos} />
    </Container>
  );
}
