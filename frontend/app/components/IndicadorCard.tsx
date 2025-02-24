"use client";

import { Card, CardContent, Typography, Box } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
interface IndicadorCardProps {
  valor: {
    media_pedidos: number;
  };
}

export default function IndicadorCard({ valor }: IndicadorCardProps) {
  return (
    <Card sx={{ minWidth: 275, backgroundColor: "#f5f5f5" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
          <ShoppingCartIcon fontSize="medium" />
          <Typography variant="h6" component="div">
            Média de Pedidos por Cliente
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h4"
            component="div"
            sx={{ fontWeight: "bold", color: "#2b58b9" }}
          >
            {valor.media_pedidos?.toFixed(2)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
