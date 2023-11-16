import axios from 'axios';
import url from '../ApiPublic';

const link = url();

export async function getStudyRoom() {
    try {
        console.log(link);
        const response = await axios.get(link + 'api/StudyRooms/getAll');
        //console.log(response.data);
        return response.data; // Devuelve el contenido JSON de la respuesta
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en otro lugar.
    }
}

export async function createStudyRoom(data){

   // console.log('service',data);
    const newStudyRoom = {
        "name": data.name,
        "capacity": data.capacity,
        "isAvailable": data.isAvailable==1?true:false,
        "active": data.active==1?true:false
       
    }
   
    return await axios.post(link+"api/StudyRooms/createStudyRoom",newStudyRoom)
}
export async function getStudyRoomById(id){
    let i= await axios.get(link+"api/StudyRooms/getStudyRoom/"+id);
    
    return i.data;
}
export async function updateStudyRoom(data){
    console.log('service',data)
    const studyRoom = {
        "id":data.id,
        "name": data.name,
        "capacity": data.capacity,
        "isAvailable": data.isAvailable==1?true:false,
        "active": data.active==1?true:false
    }
    return await axios.put(link+"api/StudyRooms/updateStudyRoom/"+data.id,studyRoom)
}

export async function deleteStudyRoom(id){
    return await axios.delete(link+"api/StudyRooms/deleteStudyRoom/"+id);
}