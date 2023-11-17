
import axios from 'axios';
import url from '../ApiPublic';


const link = url();

export async function getFurniture() {
    try {
        console.log(link);
        const response = await axios.get(link + 'api/Furnitures/getAll');
        console.log(response.data);
        return response.data; // Devuelve el contenido JSON de la respuesta
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en otro lugar.
    }
}

export async function createFurniture(d){

    console.log('service',d);
    const newFurniture = {
       
        "id_study_room": d.id_study_room,
        "furniture": d.furniture,
        "active":d.active==1?true:false,
        "capacity": d.capacity
       
    }
    console.log('antes:',newFurniture);
    return await axios.post(link+"api/Furnitures/createFurniture",newFurniture)
}
export async function getFurnitureById(id){
    return await axios.get(link+"api/Furnitures/getFurniture/"+id);
}
export async function updateFurniture(data){
   console.log('service',data)
    const furniture = {
        "id":data.id,
        "id_study_room": data.id_study_room,
        "furniture": data.furniture,
        "active":data.active==1?true:false,
        "capacity": data.capacity
    }

    return await axios.put(link+"api/Furnitures/updateFurnitures/"+data.id,furniture)
}

export async function deleteFurniture(id){
    return await axios.delete(link+"api/Furnitures/deleteFurnitures/"+id);
}