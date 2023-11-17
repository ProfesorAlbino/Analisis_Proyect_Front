import axios from 'axios';
import url from '../ApiPublic';

const link = url();

export async function getLoanClassRooms() {
    try {
        console.log(link);
        const response = await axios.get(link + 'api/LoanClassrooms');
        return response.data; 
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; 
    }
}

export async function createLoanClassRoom(data){

    const loanClassRoom = {
        "IdLoan": data.id_loan,
        "IdClassroom": data.id_ClassRoom,
        "IdUser": data.id_user,
        "PersonQuantity":data.person_quantity,
        "Requirements":data.requirements,
        "RequestState":data.request_state
    }
    const response=await axios.post(link+"api/LoanClassrooms",loanClassRoom);

    return response.data;
}
export async function CheckAvailability(data){

    const loanClassRoom = {
        "ClassroomId": data.classroomId,
        "Day": data.day,
        "StartHour":data.startHour+":00.0000000",
        "EndHour":data.endHour+":00.0000000",
        "StartDate":data.startDate,
        "EndDate":data.endDate
    }
    const response=await axios.post(link+"api/LoanClassrooms/CheckAvailability",loanClassRoom);

    return response.data;
}

export async function getLoanClassRoom(id){
    return await axios.get(link+"api/LoanClassrooms/"+id);
}

export async function updateLoanClassRoom(data){
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
    return await axios.put(link+"api/LoanClassrooms"+data.id,classRoom)
}

export async function deleteLoanClassRoom(id){
    return await axios.delete(link+"api/LoanClassrooms/"+id);
}