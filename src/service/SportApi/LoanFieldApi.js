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
    const field = data.field === 'on';

    const loanField = {
        "IdLoan": data.id_loan,
        "IdUser": data.id_user,
        "lightning":data.lightning,
        "inactive":data.inactive,
        "startHour":data.start_hour+":00.0000000",
        "endHour":data.end_hour+":00.0000000",
        "field":field,
        "materials":data.materials

    }
    const response=await axios.post(link+"api/LoanFields",loanField);

    return response.data;
}


export async function getLoanField(id){
    return await axios.get(link+"api/LoanFields/"+id);
}

export async function updateLoanField(data){
    const field = data.field === 'on';
    console.log("Datos a enviar")
    console.log(data)

    const loanField = {
        "id":data.id,
        "IdLoan": data.idLoan,
        "IdUser": data.idUser,
        "lightning":data.lightning,
        "inactive":data.inactive,
        "startHour":data.startHour+".0000000",
        "endHour":data.endHour+".0000000",
        "field":field,
        "materials":data.materials
    }
    const response=await axios.put(link+"api/LoanFields/update",loanField);

    return response.loanField;
}

export async function deleteLoanField(data){
    const loanField = {
        "id":data.id,
        "IdLoan": data.idLoan,
        "IdUser": data.idUser,
        "lightning":data.lightning,
        "inactive":1,
        "startHour":data.startHour,
        "endHour":data.endHour,
        "field":data.field,
        "materials":data.materials
    }
    const response=await axios.put(link+"api/LoanFields/Delete",loanField);
    return response.loanClassRoom;
}