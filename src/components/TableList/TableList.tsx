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
        <>
            <div className="col-12 col-md-6 col-lg-4">
                <div className={`card ${(parseInt(stock) < 5) ? "border-danger" : ""}`}>
                    <div className="card-img-top">
                        <img src={image_url} alt={name} className="image"/>
                    </div>
                    <div className="card-body">
                        <h2>{name}</h2>
                        <h3><b>Origen: </b>{origin}</h3>
                        <h3><b>Serie: </b>{series}</h3>
                        <h3><b>Subgrupo: </b>{subgroup}</h3>
                        <h3><b>Año de Lanzamiento: </b>{release_year}</h3>
                        <h3><b>URL de Imagen: </b>{image_url}</h3>
                        <h3><b>Precio: </b>{price}</h3>
                        <h3><b>Stock: </b>{stock}</h3>
                        {/* ¿cómo pongo backticks para poner javascript dentro del className?*/}
                        <button className="btn btn-primary"  data-bs-toggle="modal" data-bs-target="#staticBackdrop" onClick={() => onEditar(id, name, origin, series, subgroup, release_year, image_url, price, stock)}>Editar</button>
                        
                        {/*<button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Crear</button>*/}
                        <button className="btn btn-danger" onClick={() => onEliminar(id)}>Eliminar</button>
                    </div>
                </div>
            </div>
        </>
    )
}