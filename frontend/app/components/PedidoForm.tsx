"use client";

import { Button, TextField, Box, Card } from "@mui/material";
import React from "react";

interface PedidoFormProps {
  initialData?: {
    cliente: string;
    valor: number;
    descricao: string;
  };
  onSubmit: (data: {
    cliente: string;
    valor: number;
    descricao: string;
  }) => void;
}

export default function PedidoForm({ initialData, onSubmit }: PedidoFormProps) {
  const [cliente, setCliente] = React.useState(initialData?.cliente || "");
  const [valor, setValor] = React.useState(initialData?.valor || 0);
  const [descricao, setDescricao] = React.useState(
    initialData?.descricao || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ cliente, valor, descricao });
  };

  return (
    <Card
      component="form"
      onSubmit={handleSubmit}
      sx={{ backgroundColor: "#f5f5f5", p: 2 }}
    >
      <Box
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        maxWidth="lg"
      >
        <TextField
          label="Cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
          required
        />
        <TextField
          label="Valor"
          type="number"
          value={valor}
          onChange={(e) => setValor(parseFloat(e.target.value))}
          required
        />
        <TextField
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          Salvar
        </Button>
      </Box>
    </Card>
  );
}
