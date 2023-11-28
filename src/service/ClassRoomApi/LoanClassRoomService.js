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
        "RequestState":data.request_state,
        "IdSchedule":data.IdSchedule,
        "Inactive":data.inactive

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
    console.log(loanClassRoom)
    const response=await axios.post(link+"api/LoanClassrooms/CheckAvailability",loanClassRoom);

    return response.data;
}

export async function CheckAvailabilityUpdate(data){

    const loanClassRoom = {
        "ClassroomId": data.classroomId,
        "Day": data.day,
        "StartHour":data.startHour+".0000000",
        "EndHour":data.endHour+".0000000",
        "StartDate":data.startDate,
        "EndDate":data.endDate
    }
    console.log(loanClassRoom)
    const response=await axios.post(link+"api/LoanClassrooms/CheckAvailability",loanClassRoom);

    return response.data;
}

export async function getLoanClassRoom(id){
    return await axios.get(link+"api/LoanClassrooms/"+id);
}

export async function updateLoanClassRoom(data){
    const loanClassRoom = {
        "id":data.id,
       "idLoan": data.idLoan,
       "idClassroom": data.idClassroom,
        "idUser": data.idUser,
        "personQuantity":data.personQuantity,
        "requirements":data.requirements,
        "requestState":data.requestState,
       "idSchedule":data.idSchedule,
       "Inactive":data.inactive
    }

    const response=await axios.put(link+"api/LoanClassrooms/update",loanClassRoom);

    return response.loanClassRoom;
}

export async function deleteLoanClassRoom(data){
    const loanClassRoom = {
        "id":data.id,
       "idLoan": data.idLoan,
       "idClassroom": data.idClassroom,
        "idUser": data.idUser,
        "personQuantity":data.personQuantity,
        "requirements":data.requirements,
        "requestState":data.requestState,
       "idSchedule":data.idSchedule,
       "Inactive": 0
    }
    const response=await axios.put(link+"api/LoanClassrooms/Delete",loanClassRoom);
    return response.loanClassRoom;
}