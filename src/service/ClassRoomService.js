import axios from 'axios';
import url from './ApiPublic';

const link = url();

export async function getClassRooms() {
    try {
        console.log(link);
        const response = await axios.get(link + 'api/ClassRooms');
        //console.log(response.data);
        return response.data; // Devuelve el contenido JSON de la respuesta
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en otro lugar.
    }
}

export async function createClassRoom(data){

   // console.log('service',data);
    const newClassRoom = {
        "type": data.type,
        "requirements": data.requirements,
        "quantity": data.quantity,
        "numeration": data.numeration
       
    }
   
    return await axios.post(link+"api/ClassRooms",newClassRoom)
}
export async function getClassRoom(id){
    return await axios.get(link+"api/ClassRoom/"+id);
}
export async function updateClassRoom(data){
    console.log('service',data)
    const classRoom = {
        "id":data.id,
        "type": data.type,
        "requirements": data.requirements,
        "quantity": data.quantity,
        "numeration": data.numeration
    }
    return await axios.put(link+"api/ClassRoom"+data.id,classRoom)
}

export async function deleteClassRoom(id){
    return await axios.delete(link+"api/ClassRooms/"+id);
}