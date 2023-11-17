import axios from 'axios';
import url from '../ApiPublic';

const link = url();

export async function getLoan() {
    try {
       
        const response = await axios.get(link + 'api/Loans/getAll');
        
        return response.data; // Devuelve el contenido JSON de la respuesta
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en otro lugar.
    }
}

export async function createLoan(data){

    console.log('service',data);
    const newLoan = {
        "startDate": data.startDate,
        "endDate": data.endDate,
        "registerDate": data.registerDate,
       
       
    }
   
    return await axios.post(link+"api/Loans/createLoan",newLoan)
}
export async function getLoanById(id){
    let i= await axios.get(link+"api/Loans/getLoan/"+id);
   
    return i.data;
}
export async function updateLoan(data){
    console.log('service',data)
    const loan = {
        "id":data.id,
        "startDate": data.startDate,
        "endDate": data.endDate,
        "registerDate": data.registerDate,
    }
    return await axios.put(link+"api/Loans/updateLoan/"+data.id,loan);
}

export async function deleteLoan(id){
    return await axios.delete(link+"api/Loans/deleteLoan/"+id);
}