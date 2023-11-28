import axios from 'axios';
import url from '../ApiPublic';

const link = url();

export async function getLoanStudyRoom() {
    try {
        console.log(link);
        const response = await axios.get(link + 'api/LoanStudyRooms/getAll');
        //console.log(response.data);
        return response.data; // Devuelve el contenido JSON de la respuesta
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en otro lugar.
    }
}
export async function getLoanStudyRoomByLoan(id) {
    try {
        console.log(link);
        const response = await axios.get(link + 'api/LoanStudyRooms/getLoanStudyRoom'+id);
        //console.log(response.data);
        return response.data; // Devuelve el contenido JSON de la respuesta
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en otro lugar.
    }
}

export async function createLoanStudyRoom(data){

    console.log('service',data);
    const newLoanStudyRoom = {
        "numberPeople": data.numberPeople,
        "idLoan": data.idLoan,
        "idUserLibrary": data.idUserLibrary,
        "studyRoom": data.studyRoom,
        "exitHour": data.exitHour,
        "returnHour": data.returnHour,
        "active": data.active==1?true:false
       
    }
   
    return await axios.post(link+"api/LoanStudyRooms/createLoanLoanStudyRoom",newLoanStudyRoom)
}
export async function getLoanStudyRoomById(id){
    let i= await axios.get(link+"api/LoanStudyRooms/getLoanVehicle/"+id);
   
    return i.data;
}
export async function updateLoanStudyRoom(data){
    console.log('service',data)
    const loanVehicle = {
        "id":data.id,
        "numberPeople": data.numberPeople,
        "idLoan": data.idLoan,
        "idUserLibrary": data.idUserLibrary,
        "studyRoom": data.studyRoom,
        "exitHour": data.exitHour,
        "returnHour": data.returnHour,
        "active": data.active==1?true:false
    }
    return await axios.put(link+"api/LoanStudyRooms/updateLoanStudyRooms/"+data.id,loanVehicle);
}

export async function deleteLoanStudyRoom(id){
    return await axios.delete(link+"api/LoanStudyRooms/deleteLoanStudyRooms/"+id);
}