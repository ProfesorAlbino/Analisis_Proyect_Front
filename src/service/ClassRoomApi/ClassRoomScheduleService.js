import axios from 'axios';
import url from '../ApiPublic';

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

export async function createClassroomSchedules(data) {
    const newClassroomSchedules = {
        "Day": data.day,
        "IdClassroom": data.id_ClassRoom,
        "StartHour": data.start_hour+":00.0000000",
        "EndHour": data.end_hour+":00.0000000",
    };

    try {
        const response = await axios.post(link + "api/ClassroomSchedules", newClassroomSchedules);
        return response.data;
    } catch (error) {
        console.error("Error creating classroom schedule:", error);
        throw error; // Re-lanza el error para que pueda ser manejado en el código que llama a esta función.
    }
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
        "classroomSchedules": [],  // Colección vacía
        "loanClassrooms": []      // Colección vacía
    }
    return await axios.put(link+"api/ClassRoom"+data.id,classRoom)
}

export async function deleteClassRoom(id){
    return await axios.delete(link+"api/ClassRooms/"+id);
}