import { useEffect, useState } from "react";
import './Formulario.css';
import { Modal } from "react-bootstrap";

interface Props{
    insertar: (name: string, origin: string, series: string, subgroup: string, release_year: number, image_url: string, price: number, stock: number) => void;
    editar: (id: number, name: string, origin: string, series: string, subgroup: string, release_year: number, image_url: string, price: number, stock: number) => void;
    datoEditar: {id: number, name: string, origin: string, series: string, subgroup: string, release_year: number, image_url: string, price: number, stock: number} | null;
    setDatoEditar: (dato: {id: number, name: string, origin: string, series: string, subgroup: string, release_year: number, image_url: string, price: number, stock: number} | null) => void;
}

export default function Formulario({ insertar, editar, datoEditar, setDatoEditar }: Props) {
  const [nombre, setNombre] = useState('');
  const [origen, setOrigen] = useState('');
  const [serie, setSerie] = useState('');
  const [subgrupo, setSubgrupo] = useState('');
  const [anioLanzamiento, setAnioLanzamiento] = useState(0);
  const [urlImagen, setUrlImagen] = useState('');
  const [precio, setPrecio] = useState(0);
  const [stock, setStock] = useState(0);

  useEffect(() => {
    if (datoEditar) {
      setNombre(datoEditar.name);
      setOrigen(datoEditar.origin);
      setSerie(datoEditar.series);
      setSubgrupo(datoEditar.subgroup);
      setAnioLanzamiento(datoEditar.release_year);
      setUrlImagen(datoEditar.image_url);
      setPrecio(datoEditar.price);
      setStock(datoEditar.stock);
    }
  }, [datoEditar]);

  const manejarSubmit = (e) => {
    e.preventDefault();
    if (datoEditar !== null) {
      editar(datoEditar.id, nombre, origen, serie, subgrupo, anioLanzamiento, urlImagen, precio, stock);
      setDatoEditar(null); // Limpiar el estado de edición después de actualizar
    } else {
      insertar(nombre, origen, serie, subgrupo, anioLanzamiento, urlImagen, precio, stock);
    }
    setNombre('');
    setOrigen('');
    setSerie('');
    setSubgrupo('');
    setAnioLanzamiento(0);
    setUrlImagen('');
    setPrecio(0);
    setStock(0);
  }
  return (
    <>
      <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">{datoEditar !== null ? 'Actualizar' : 'Guardar'}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={manejarSubmit}>
              <div className="modal-body">
                  <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                  <input type="text" placeholder="Origen" value={origen} onChange={(e) => setOrigen(e.target.value)} />
                  <input type="text" placeholder="Serie" value={serie} onChange={(e) => setSerie(e.target.value)} />
                  <input type="text" placeholder="Subgrupo" value={subgrupo} onChange={(e) => setSubgrupo(e.target.value)} />
                  <input type="number" placeholder="Año de Lanzamiento" value={anioLanzamiento} onChange={(e) => setAnioLanzamiento(Number(e.target.value))} />
                  <input type="text" placeholder="URL de Imagen" value={urlImagen} onChange={(e) => setUrlImagen(e.target.value)} />
                  <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(Number(e.target.value))} />
                  <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">{datoEditar !== null ? 'Actualizar' : 'Guardar'}</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div>
        
      </div>
    </>
  )
}
