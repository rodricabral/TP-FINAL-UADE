import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
/* import "../estilos-pagina/mostrar.css"; */
import axios from "axios";

/* import logoProducto from "./IMG COMPONENTES/catalogo.png"; */

const API_BASE_URL = "http://localhost:3002/api";

function CatalogoProducto() {
  const [imagen, setImagen] = useState([])
  const [catalogoList, setCatalogoList] = useState([]);

  /* const fetchImagenes = async () => {

      const res = await fetch(`${API_BASE_URL}/producto/el-producto`);
      const data = await res.json();

      const promises = data.map(async(imagens)=>{
        const res = await fetch(imagens.fotoProducto)
        const data = await res.json()

        return data
      })
      const results = await Promise.all(promises)

      console.log(results)

  } */
  
  const fetchProductos = async () => {
    try {
      const { data } = await axios.get(`${API_BASE_URL}/producto/el-producto`);
      console.log(data)
      setCatalogoList(data);
  
    } catch (error) {
      console.error("Error fetching productos:", error);
    }
  };

  useEffect(() => {
    fetchProductos();
    /* fetchImagenes() */
  }, []);

  const eliminarProducto = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/producto/eliminar/${id}`);
      fetchProductos()
    } catch (error) {
      console.error("Error eliminando producto:", error);
    }
  };


  return (
    <div className="container">
      <div className="logo-container">
        {/* <img src={logoProducto} alt="Logo Producto" className="logo-container" /> */}
      </div>

      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          {catalogoList.map((item) => (
            <div key={item.id} className="col-4">
              <Card
                title={item.nombreComercial}
                subTitle={`US$${item.precioVenta}`}
                footer={
                  <>
                    <Button
                      label="Eliminar"
                      severity="danger"
                      icon="pi pi-times"
                      onClick={() => eliminarProducto(item.id)} 
                    />
                    <Button
                      label="Agregar"
                      icon="pi pi-check"
                     /*  onClick={() => handleSubmit(item)} */
                    />
                  </>
                }
                header={
                  
                  <img
                    src={`http://localhost:3002/uploads${item.fotoProducto}`}
                    alt={item.nombre}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
                }
                className="w-100 mt-4 shadow-8 surface-card text-center border-round-sm"
              />
            </div>
          ))}
        </div>

      </div>

      <br />
    </div>
  );
}

export default CatalogoProducto;
