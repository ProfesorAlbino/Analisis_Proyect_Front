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