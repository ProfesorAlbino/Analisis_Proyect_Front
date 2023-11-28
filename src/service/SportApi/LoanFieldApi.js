import axios from 'axios';
import url from '../ApiPublic';
import { id } from 'date-fns/locale';

const link = url();

export async function getLoanFields() {
    try {
        console.log(link);
        const response = await axios.get(link + 'api/LoanFields');
        return response.data; 
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; 
    }
}

export async function createLoanField(data){
    const loanField = {
        "IdLoan": data.id_loan,
        "IdUser": data.id_user,
        "lightning":data.lightning,
        "inactive":data.inactive,
        "startHour":data.start_hour+":00.0000000",
        "endHour":data.end_hour+":00.0000000",

    }
    const response=await axios.post(link+"api/LoanFields",loanField);

    return response.data;
}


export async function getLoanField(id){
    return await axios.get(link+"api/LoanFields/"+id);
}

export async function updateLoanField(data){
    const loanClassRoom = {
        "id":data.id,
        "IdLoan": data.id_loan,
        "IdUser": data.id_user,
        "lightning":data.lightning,
        "inactive":data.inactive,
        "startHour":data.start_hour+".0000000",
        "endHour":data.end_hour+".0000000",
    }

    const response=await axios.post(link+"api/LoanFields",loanClassRoom);

    return response.loanClassRoom;
}

export async function deleteLoanField(data){
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
    const response=await axios.post(link+"api/LoanFields",loanClassRoom);
    return response.loanClassRoom;
}