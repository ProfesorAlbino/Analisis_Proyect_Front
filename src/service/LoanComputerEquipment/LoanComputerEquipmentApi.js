import axios from 'axios';
const url = 'https://localhost:7210/api/';

export async function getLoanComputerEquipment(idUser) {
    try {
        const response = await axios.get(url + 'LoanComputerEquipments/getLoanComputerEquipmentByIdUser/'+idUser);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function addLoanComputerEquipment(data) {
    try {
        const response = await axios.post(url + 'LoanComputerEquipments', data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function getLoanComputerEquipmentsByIdComputerEquipment(idComputerEquipment, idUser) {
    try {
        const response = await axios.get(url + 'LoanComputerEquipments/getLoanComputerEquipmentByIdComputerEquipment/'+idComputerEquipment+'/'+idUser);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function getAllLoanComputerEquipment() {
    try {
        const response = await axios.get(url + 'LoanComputerEquipments');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function updateActiveLoanComputerEquipment(idLoanComputerEquipment, data) {
    try {
        const response = await axios.put(url + 'LoanComputerEquipments/updateActive/'+idLoanComputerEquipment+"/"+data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}