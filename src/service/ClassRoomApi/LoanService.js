import axios from 'axios';
import url from '../ApiPublic';

const link = url();

export async function getLoans() {
    try {
        console.log(link);
        const response = await axios.get(link + 'api/Loans/getAll');
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
    const response=await axios.post(link+"api/Loans/create",newLoan);

    return response.data;
}

export async function getLoan(id){
    return await axios.get(link+"api/Loans/getById/"+id);
}

export async function updateLoan(data){
    const response=await axios.put(link+"api/Loans/update",data);

    return "loan actualizado";
}

export async function deleteLoan(id){
    return await axios.delete(link+"api/Loan/delete/"+id);
}