import { ControlBar, TableList, Formulario } from './components';
import { useTransformers } from './hooks';

export default function App() {
    const {TransformerFiltrado,
        insertar,
        editar,
        eliminar,
        setSeries,
        setSubgroup,
        setOrigin,
        setReleaseYear,
        setPrice,
        setStock,
        setFiltro,
        datoEditar,
        setDatoEditar} = useTransformers();    
    return (
      <>
        <ControlBar
        alPresionarSeries={setSeries}
        alPresionarSubgroup={setSubgroup}
        alPresionarOrigin={setOrigin}
        alPresionarReleaseYear={setReleaseYear}
        alPresionarPrice={setPrice}
        alPresionarStock={setStock}
        alEscribir={setFiltro}
        />
        <Formulario
        insertar={insertar}
        editar={editar}
        datoEditar={datoEditar}
        setDatoEditar={setDatoEditar}
        />
        {TransformerFiltrado.map((dato) => (
          <TableList
            key={dato.id}
            id={dato.id}
            name={dato.name}
            origin={dato.origin}
            series={dato.series}
            subgroup={dato.subgroup}
            release_year={dato.release_year}
            image_url={dato.image_url}
            price={dato.price}
            stock={dato.stock}
            onEditar={(id, name, origin, series, subgroup, release_year, image_url, price, stock) => setDatoEditar({ id, name, origin, series, subgroup, release_year, image_url, price, stock })}
            onEliminar={(id) => eliminar(id)}
          />
        ))}
      </>
    )
}
