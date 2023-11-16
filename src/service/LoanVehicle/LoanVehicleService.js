import axios from 'axios';
import url from '../ApiPublic';

const link = url();

export async function getLoanVehicle() {
    try {
        console.log(link);
        const response = await axios.get(link + 'api/LoanVehicles/getAll');
        //console.log(response.data);
        return response.data; // Devuelve el contenido JSON de la respuesta
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en otro lugar.
    }
}

export async function createLoanVehicle(data){

    console.log('service',data);
    const newLoanVehicle = {
        "idLoan": data.idLoan,
        "idUser": data.idUser,
        "activityType": data.activityType,
        "responsible": data.responsible,
        "state": data.state,
        "destination": data.destination,
        "startingPlace": data.startingPlace,
        "exitDate": data.exitDate,
        "returnDate": data.returnDate,
        "exitHour": data.exitHour,
        "returnHour": data.returnHour,
        "registerDate": data.registerDate,
        "personQuantity": data.personQuantity,
        "unityOrCarrer": data.unityOrCarrer,
        "assignedVehicle": data.assignedVehicle,
        "active": data.active==1?true:false
       
    }
   
    return await axios.post(link+"api/LoanVehicles/createLoanVehicle",newLoanVehicle)
}
export async function getLoanVehicleById(id){
    let i= await axios.get(link+"api/LoanVehicles/getLoanVehicle/"+id);
   
    return i.data;
}
export async function updateLoanVehicle(data){
    console.log('service',data)
    const loanVehicle = {
        "id":data.id,
        "idLoan": data.idLoan,
        "idUser": data.idUser,
        "activityType": data.activityType,
        "responsible": data.responsible,
        "state": data.state,
        "destination": data.destination,
        "startingPlace": data.startingPlace,
        "exitDate": data.exitDate,
        "returnDate": data.returnDate,
        "exitHour": data.exitHour,
        "returnHour": data.returnHour,
        "registerDate": data.registerDate,
        "personQuantity": data.personQuantity,
        "unityOrCarrer": data.unityOrCarrer,
        "assignedVehicle": data.assignedVehicle,
        "active": data.active==1?true:false
    }
    return await axios.put(link+"api/LoanVehicles/updateLoanVehicle/"+data.id,loanVehicle);
}

export async function deleteLoanVehicle(id){
    return await axios.delete(link+"api/LoanVehicles/deleteLoanVehicles/"+id);
}