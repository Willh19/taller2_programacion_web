//Ejercicio 2
const express = require('express');
const app = express();

app.use(express.json());

// Lista de impuestos por cada pais
const impuestos = {
  elsalvador: { iva: 0.13, renta: 0.10, pIva: "13%", pRenta: "10%" },
  guatemala:  { iva: 0.12, renta: 0.05, pIva: "12%", pRenta: "5%" },
  costarica:  { iva: 0.13, renta: 0.15, pIva: "13%", pRenta: "15%" },
  honduras:   { iva: 0.15, renta: 0.10, pIva: "15%", pRenta: "10%" },
  panama:     { iva: 0.07, renta: 0.15, pIva: "7%",  pRenta: "15%" },
  nicaragua:  { iva: 0.15, renta: 0.10, pIva: "15%", pRenta: "10%" }
};

// Funcion para calcular los descuentos
function calcularSalario(pais, salario) {
  const tasas = impuestos[pais];
  
  const iva = salario * tasas.iva;
  const renta = salario * tasas.renta;
  const salarioNeto = salario - (iva + renta);

  return {
    pais: pais,
    salarioBruto: salario,
    porcentajeIVA: tasas.pIva,
    porcentajeRenta: tasas.pRenta,
    iva: iva,
    renta: renta,
    salarioNeto: salarioNeto
  };
}

app.post('/calcular', (req, res) => {
  try {
    const { pais, salario } = req.body;

    if (!pais || !salario) {
      return res.status(400).json({ error: "Debe enviar tanto el pais como el salario." });
    }

    if (typeof salario !== 'number' || salario <= 0) {
      return res.status(400).json({ error: "El salario debe ser un numero mayor a 0." });
    }

    const paisFormateado = pais.toLowerCase().replace(" ", "");

    if (!impuestos[paisFormateado]) {
      return res.status(400).json({ 
        error: "Pais no valido. Paises permitidos: El Salvador, Guatemala, Costa Rica, Honduras, Panama, Nicaragua." 
      });
    }

    const respuesta = calcularSalario(paisFormateado, salario);
    return res.json(respuesta);

  } catch (error) {
    return res.status(500).json({ error: "Error: " + error.message });
  }
});

app.listen(3000, () => {
  console.log("puerto 3000");
});