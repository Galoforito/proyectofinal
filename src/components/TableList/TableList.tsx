import "./TableList.css"

interface Props{
    id: number,
    name: string,
    origin: string,
    series: string,
    subgroup: string,
    release_year: number,
    image_url: string,
    price: string,
    stock: string
    onEditar: (id: number, name: string, origin: string, series: string, subgroup: string, release_year: number, image_url: string, price: string, stock: string) => void;
    onEliminar: (id: number) => void;
}

export default function TableList({id, name, origin, series, subgroup, release_year, image_url, price, stock, onEditar, onEliminar}: Props) {
    return (
        <div>
            <ul>
                <li>ID: {id}</li>
                <li>Nombre: {name}</li>
                <li>Origen: {origin}</li>
                <li>Serie: {series}</li>
                <li>Subgrupo: {subgroup}</li>
                <li>Año de Lanzamiento: {release_year}</li>
                <li>URL de Imagen: {image_url}</li>
                <li>Precio: {price}</li>
                <li>Stock: {stock}</li>
                <button onClick={() => onEditar(id, name, origin, series, subgroup, release_year, image_url, price, stock)}>Editar</button>
                <button onClick={() => onEliminar(id)}>Eliminar</button>
            </ul>
        </div>
    )
}