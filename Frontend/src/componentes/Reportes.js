import React, { useEffect, useState } from 'react';  
import { Bar } from 'react-chartjs-2';  
import axios from 'axios';  

const Reportes = () => {  
    const [chartData, setChartData] = useState({  
        labels: [],  
        datasets: []  
    });  

    useEffect(() => {  
        const obtenerProductos = async () => {  
            try {  
                
                const response = await axios.get("http://localhost:3000/api/producto/el-producto");  
                const productos = response.data;  

                 
                const labels = productos.map(producto => producto.nombre);  
                const preciosCompra = productos.map(producto => producto.precio_compra);  
                const preciosVenta = productos.map(producto => producto.precio_venta);  

                
                setChartData({  
                    labels: labels,  
                    datasets: [  
                        {  
                            label: 'Precio de Compra',  
                            data: preciosCompra,  
                            backgroundColor: 'rgba(75, 192, 192, 0.6)',  
                        },  
                        {  
                            label: 'Precio de Venta',  
                            data: preciosVenta,  
                            backgroundColor: 'rgba(255, 99, 132, 0.6)',  
                        }  
                    ]  
                });  
            } catch (error) {  
                console.error('Error al obtener los productos:', error);  
            }  
        };  

        obtenerProductos();  
    }, []); 

    return (  
        <div>  
            <h2>Gráfico de Precios de Productos</h2>  
            <Bar data={chartData} options={{ scales: { y: { beginAtZero: true } } }} />  
        </div>  
    );  
};  

export default Reportes;  

