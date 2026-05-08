import { useEffect, useState } from "react";
import './Formulario.css';

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
    <div>
      <form onSubmit={manejarSubmit}>
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        <input type="text" placeholder="Origen" value={origen} onChange={(e) => setOrigen(e.target.value)} />
        <input type="text" placeholder="Serie" value={serie} onChange={(e) => setSerie(e.target.value)} />
        <input type="text" placeholder="Subgrupo" value={subgrupo} onChange={(e) => setSubgrupo(e.target.value)} />
        <input type="number" placeholder="Año de Lanzamiento" value={anioLanzamiento} onChange={(e) => setAnioLanzamiento(Number(e.target.value))} />
        <input type="text" placeholder="URL de Imagen" value={urlImagen} onChange={(e) => setUrlImagen(e.target.value)} />
        <input type="number" placeholder="Precio" value={precio} onChange={(e) => setPrecio(Number(e.target.value))} />
        <input type="number" placeholder="Stock" value={stock} onChange={(e) => setStock(Number(e.target.value))} />
        <button type="submit">{datoEditar !== null ? 'Actualizar' : 'Guardar'}</button>
      </form>
    </div>
  )
}
