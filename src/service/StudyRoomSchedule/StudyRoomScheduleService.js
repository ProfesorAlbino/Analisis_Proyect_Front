//VERIFICAR
import axios from 'axios';
import url from '../ApiPublic';

const link = url();

export async function getStudyRoomSchedule() {
    try {
        
        const response = await axios.get(link + 'api/StudyRoomSchedules/getAll');
        
        return response.data; // Devuelve el contenido JSON de la respuesta
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en otro lugar.
    }
}

export async function createStudyRoomSchedule(data){

    console.log('service',data);
    const newStudyRoomSchedule = {
        "day": data.day,
        "day": data.day,
        "idStudyRoom": data.idStudyRoom,
        "startHour": data.startHour,
        "endHour": data.endHour,
        "active":data.active==1?true:false
       
    }
    console.log('despues: ',newStudyRoomSchedule);
    return await axios.post(link+"api/StudyRoomSchedules/createStudyRoomSchedule",newStudyRoomSchedule)
}
export async function getStudyRoomScheduleById(id){
    return await axios.get(link+"api/StudyRoomSchedules/getStudyRoomSchedule/"+id);
}
export async function updateStudyRoomSchedule(data){
    console.log('service',data)
    const studyRoom = {
        "id":data.id,
        "day": data.day,
        "idStudyRoom": data.idStudyRoom,
        "startHour": data.startHour,
        "endHour": data.endHour,
        "active":data.active==1?true:false
    }
    console.log(studyRoom);
    return await axios.put(link+"api/StudyRoomSchedules/updateStudyRoomSchedule/"+data.id,studyRoom)
}

export async function deleteStudyRoomSchedule(id){
    return await axios.delete(link+"api/StudyRoomSchedules/deleteStudyRoomSchedule/"+id);
}