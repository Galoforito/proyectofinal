import { supabase } from '../utils/supabase'
import { useState, useEffect } from 'react';

export default function useTransformers() {
    const [datos, setDatos] = useState([]);
    const [datoEditar, setDatoEditar] = useState<{id: number, name: string, origin: string, series: string, subgroup: string, release_year: number, image_url: string, price: number, stock: number} | null>(null);
    
    const [series, setSeries] = useState("all");

    const [subgroup, setSubgroup] = useState("all");

    const [origin, setOrigin] = useState("all");

    const [releaseYear, setReleaseYear] = useState("all");

    const [price, setPrice] = useState("all");

    const [stock, setStock] = useState("all");

    const [filtro, setFiltro] = useState("")


    async function getTransformers() {
        const{data, error} = await supabase.from('transformers_toys').select('*');
        if(data){
            setDatos(data);
        }
        if(error){
            console.error('Error al traer datos:', error);
        }
    }

    async function insertar(name: string, origin: string, series: string, subgroup: string, release_year: number, image_url: string, price: number, stock: number){
        try {
            const {data, error} = await supabase.from('transformers_toys').insert([{
                name: name,
                origin: origin,
                series: series,
                subgroup: subgroup,
                release_year: release_year,
                image_url: image_url,
                price: price,
                stock: stock
            }]);
            if(error){
                console.error('Error al insertar datos:', error);
            }
            await getTransformers();
        }
        catch (error) {
            console.error('Error al insertar datos:', error);
        }
    }

    async function editar(id: number, name: string, origin: string, series: string, subgroup: string, release_year: number, image_url: string, price: number, stock: number){
        try {
            const{error} = await supabase.from('transformers_toys').update([{ name, origin, series, subgroup, release_year, image_url, price, stock }]).eq('id', id);
            if(error){
                console.log('Error al editar datos:', error);
            }
            await getTransformers();
        } catch (error) {
            console.log('Error al editar datos:', error);
        }
    }

    async function eliminar(id: number){
        try {
            const{error} = await supabase.from('transformers_toys').delete().eq('id', id);
            if(error){
                console.log('Error al eliminar datos:', error);
            }
            await getTransformers();
        } catch (error) {
            console.log('Error al eliminar datos:', error);
        }
    }

    useEffect(() => {
        getTransformers();
    }, []);

    const TransformersOrigin = origin.toLowerCase() === "all"
    ? datos
    : datos.filter((t) => {
        return t.origin.toLowerCase().includes(origin.toLowerCase());
    });
    //Recrea la función anterior para cada categoría: origin, series, subgroup, release_year, price (mayor que, menor que), stock (mayor que, menor que)
    const TransformersSeries = series.toLowerCase() === "all"
    ? TransformersOrigin
    : TransformersOrigin.filter((t) => {
        return t.series.toLowerCase().includes(series.toLowerCase());
    });
    const TransformersSubgroup = subgroup.toLowerCase() === "all"
    ? TransformersSeries
    : TransformersSeries.filter((t) => {
        return t.subgroup.toLowerCase().includes(subgroup.toLowerCase());
    });
    const TransformersReleaseYear = releaseYear.toLowerCase() === "all"
    ? TransformersSubgroup
    : TransformersSubgroup.filter((t) => {
        return t.release_year === parseInt(releaseYear);
    });
    const TransformersPrice = price.toLowerCase() === "all"
    ? TransformersReleaseYear
    : TransformersReleaseYear.filter((t) => {
        return t.price.includes(parseInt(price));
    });
    const TransformersStock = stock.toLowerCase() === "all"
    ? TransformersPrice
    : TransformersPrice.filter((t) => {
        return t.stock.includes(parseInt(stock));
    });

    const TransformerFiltrado = TransformersStock.filter((t)=>{
        return t.name.toLowerCase().includes(filtro.toLowerCase());
    })

    return {
        TransformerFiltrado,
        getTransformers,
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
        setDatoEditar
    }
}