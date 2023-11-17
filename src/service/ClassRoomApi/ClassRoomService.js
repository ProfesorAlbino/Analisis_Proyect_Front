import axios from 'axios';
import url from '../ApiPublic';

const link = url();

export async function getClassRooms() {
    try {
        console.log(link);
        const response = await axios.get(link + 'api/ClassRooms');
       
        return response.data; 
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; 
    }
}

export async function createClassRoom(data){
    const newClassRoom = {
        "type": data.type,
        "description": data.description,
        "quantity": data.quantity,
        "numeration": data.numeration  
    }
    const response=await axios.post(link+"api/ClassRooms",newClassRoom);

    return response.data;
}

export async function getClassRoom(id){
    return await axios.get(link+"api/ClassRooms/"+id);
}

export async function updateClassRoom(data){
    console.log('service',data)
    const classRoom = {
        "id":data.id,
        "type": data.type,
        "description": data.description,
        "quantity": data.quantity,
        "numeration": data.numeration,
    }
    return await axios.put(link+"api/ClassRoom"+data.id,classRoom)
}

export async function deleteClassRoom(id){
    return await axios.delete(link+"api/ClassRooms/"+id);
}