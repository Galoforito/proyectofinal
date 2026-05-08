import { supabase } from '../utils/supabase'
import { useState, useEffect } from 'react';

export default function useTransformers() {
    const [datos, setDatos] = useState([]);
    const [datoEditar, setDatoEditar] = useState<{id: number, name: string, origin: string, series: string, subgroup: string, release_year: number, image_url: string, price: number, stock: number} | null>(null);

    async function getTransformers() {
        const{data, error} = await supabase.from('transformers_toys').select('*');
        if(data){
            setDatos(data);
        }
        if(error){
            console.error('Error al traer datos:', error);
        }
    }

    async function insertar(name, origin, series, subgroup, release_year, image_url, price, stock){
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

    async function editar(id, name, origin, series, subgroup, release_year, image_url, price, stock){
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

    async function eliminar(id){
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

    return {
        datos,
        getTransformers,
        insertar,
        editar,
        eliminar
    }
}