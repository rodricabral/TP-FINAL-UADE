import React, { useState, useEffect } from "react";
import axios from "axios";
import "../componentes/estilos.css";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";

function Proveedor() {
  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [cuit, setCuit] = useState("");

  const [proveedorList, setProveedorList] = useState([]);
  const [visible, setVisible] = useState(false);

  // Lista proveedores
  useEffect(() => {
    const fetchProveedorList = async () => {
      try {
        const response = await axios.get("http://localhost:3002/api/proveedor/el-proveedor");
        setProveedorList(response.data);
      } catch (error) {
        console.error("Error al cargar los proveedores", error);
      }
    };
    fetchProveedorList();
  }, []);

  // Añadir proveedor
  const agregarProveedor = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3002/api/proveedor/guardar", { nombre, cuit });
      alert("Proveedor guardado con éxito");
      actualizarLista();
      limpiarCampos();
    } catch (error) {
      console.error("Error al guardar el proveedor", error);
      alert("Hubo un error al guardar el proveedor");
    }
  };

  // Edicion
  const editarProveedor = async () => {
    try {
      await axios.put(`http://localhost:3002/api/proveedor/modificar-proveedor/${id}`, {
        id,
        nombre,
        cuit,
      });
      alert("Proveedor actualizado con éxito");
      actualizarLista();
      setVisible(false);
      limpiarCampos();
    } catch (error) {
      console.error("Error al actualizar el proveedor", error);
    }
  };

  // Eliminar
  const eliminarProveedor = async () => {
    try {
      await axios.delete(`http://localhost:3002/api/proveedor/eliminar/${id}`);
      alert("Proveedor eliminado con éxito");
      setProveedorList(proveedorList.filter((proveedor) => proveedor.id !== id));
      setVisible(false);
      limpiarCampos();
    } catch (error) {
      console.error("Error al eliminar el proveedor", error);
      alert("Hubo un error al eliminar el proveedor");
    }
  };

  // Actualizar
  const actualizarLista = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/proveedor/el-proveedor");
      setProveedorList(response.data);
    } catch (error) {
      console.error("Error al actualizar la lista de proveedores", error);
    }
  };

  const handleEdit = (proveedor) => {
    setId(proveedor.id);
    setNombre(proveedor.nombre);
    setCuit(proveedor.cuit);
    setVisible(true);
  };

  // Limpiar campos
  const limpiarCampos = () => {
    setId("");
    setNombre("");
    setCuit("");
  };

  return (
    <div>
      <div className="card bg-dark border-dark mb-3">
        <div className="card-header">
          <h2 className="text-center bg-dark p-2 text-warning">Datos de los Proveedores</h2>
        </div>
        <div className="card-body">
          {/* Agregar proveedor */}
          <form onSubmit={agregarProveedor}>
            <div className="input-group mb-3 bg-dark p-2 text-white bg-opacity-75">
              <label className="input-group-text" htmlFor="nombre">Nombre</label>
              <input className="form-control" id="nombre" type="text" value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="input-group mb-3 bg-dark p-2 text-white bg-opacity-75">
              <label className="input-group-text" htmlFor="cuit">Cuit</label>
              <input className="form-control" id="cuit" type="text" value={cuit}
                onChange={(e) => setCuit(e.target.value)}
                required
              />
            </div>
            <button className="btn btn-warning float-end" type="submit"> <b>Agregar Proveedor</b> </button>
          </form>
        </div>
      </div>

      <div className="card text-bg-dark mb-5">
        <h2 className="text-center text-warning">Lista de Proveedores</h2>
        <table className="table table-striped" style={{ minWidth: "50rem" }}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Cuit</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedorList.map((proveedor) => (
              <tr key={proveedor.id}>
                <td>{proveedor.id}</td>
                <td>{proveedor.nombre}</td>
                <td>{proveedor.cuit}</td>
                <td>
                  <Button label="Ver" icon="pi pi-pencil" onClick={() => handleEdit(proveedor)} className="p-button-warning" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Editar, eliminar */}
      <Dialog header="Editar Proveedor" visible={visible} style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <form>
          <div className="input-group mb-3">
            <span className="input-group-text">Nombre</span>
            <input type="text" className="form-control" value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Cuit</span>
            <input type="text" className="form-control" value={cuit}
              onChange={(e) => setCuit(e.target.value)}
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <Button label="Actualizar" icon="pi pi-check" onClick={editarProveedor} className="p-button-success" />
            <Button label="Eliminar" icon="pi pi-trash" onClick={eliminarProveedor} className="p-button-danger" />
          </div>
        </form>
      </Dialog>
    </div>
  );
}

export default Proveedor;
