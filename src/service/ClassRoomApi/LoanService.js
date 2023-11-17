import axios from 'axios';
import url from '../ApiPublic';

const link = url();

export async function getLoans() {
    try {
        console.log(link);
        const response = await axios.get(link + 'api/Loans');
        return response.data; // Devuelve el contenido JSON de la respuesta
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en otro lugar.
    }
}

export async function createLoan(data){
    const newLoan = {
       "StartDate":data.start_date,
       "EndDate":data.end_date,
       "RegisterDate":data.register_date
    }
    console.log(newLoan);
    const response=await axios.post(link+"api/Loans",newLoan);

    return response.data;
}

export async function getLoan(id){
    return await axios.get(link+"api/Loan/"+id);
}

export async function updateLoan(data){
    console.log('service',data)
    const loan = {
        "id":data.id,
        "type": data.type,
        "description": data.description,
        "quantity": data.quantity,
        "numeration": data.numeration,
        "classroomSchedules": [],  // Colección vacía
        "loanClassrooms": []      // Colección vacía
    }
    return await axios.put(link+"api/Loan"+data.id,loan)
}

export async function deleteLoan(id){
    return await axios.delete(link+"api/Loan/"+id);
}