import { supabase } from '../utils/supabase'
import { useState, useEffect } from 'react';
import { Transformer } from '../type';

export default function useTransformers() {
    const [datos, setDatos] = useState<Transformer[]>([]);
    const [datoEditar, setDatoEditar] = useState<Transformer | null>(null);
    
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
            setDatos(data as Transformer[]);
        }
        if(error){
            console.error('Error al traer datos:', error);
        }
    }

    async function insertar(name: string, origin: string, series: string, subgroup: string, release_year: number, image_url: string, price: number, stock: number){
        try {
            const {error} = await supabase.from('transformers_toys').insert([{
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
    const TransformersPrice = price === "all"
    ? TransformersReleaseYear
    : TransformersReleaseYear.filter((t) => {
        if (price === "<= $500 MXN")    return t.price <= 500;
        if (price === "> $500 MXN & <= $1,000 MXN")  return t.price > 500 && t.price <= 1000;
        if (price === "> $1,000 MXN & <= $2,000 MXN")  return t.price > 1000 && t.price <= 2000;
        if (price === "> $2,000 MXN")  return t.price > 2000;
        return true;
    });

    const TransformersStock = stock === "all"
    ? TransformersPrice
    : TransformersPrice.filter((t) => {
        if (stock === "<= 5")   return t.stock <= 5;
        if (stock === "> 5 & <= 10")  return t.stock > 5 && t.stock <= 10;
        if (stock === "> 10 & <= 15")  return t.stock > 10 && t.stock <= 15;
        if (stock === "> 15")  return t.stock > 15;
        return true;
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