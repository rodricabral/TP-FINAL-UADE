import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

const Reportes = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const obtenerProductos = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3002/api/producto/el-producto"
      );
      const productos = response.data;
      console.log("datos " + response.data);

      const labels = productos.map((producto) => producto.nombre);
      const preciosCompra = productos.map((producto) => producto.precioCompra);
      const preciosVenta = productos.map((producto) => producto.precioVenta);

      setChartData({
        labels: labels,
        datasets: [
          {
            label: "Precio de Compra",
            data: preciosCompra,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
          {
            label: "Precio de Venta",
            data: preciosVenta,
            backgroundColor: "rgba(255, 99, 132, 0.6)",
          },
        ],
      });
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <div>
      <h2>Gráfico de Precios de Productos</h2>
      <Bar
        data={chartData}
        options={{ scales: { y: { beginAtZero: true } } }}
      />
    </div>
  );
};

export default Reportes;
