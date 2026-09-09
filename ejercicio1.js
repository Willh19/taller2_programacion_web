const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/api/calculo/:monto", (req, res) => {
  const monto = Number(req.params.monto);

  if (isNaN(monto) || monto <= 0) {
    return res.status(400).json({
      error: "El salario debe ser un número mayor a cero",
    });
  }

  const iva = monto * 0.13;
  const renta = monto * 0.1;

  return res.json({
    monto: monto,
    iva: iva,
    renta: renta,
  });
});

app.listen(PORT, () => {
  console.log(`Servidor activo en http://localhost:${PORT}`);
});
