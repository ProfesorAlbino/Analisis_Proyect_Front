import axios from 'axios';
const url = 'https://localhost:7210/api/';

export async function getComputerEquipments() {
    try {
        const response = await axios.get(url + 'ComputerEquipments/getAll/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function deleteComputerEquipment(id) {
    try {
        const response = await axios.delete(url + 'ComputerEquipments/delete/' + id);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function addComputerEquipment(data) {
    console.log("guardando");
    try {
        data.lastModifications=new Date();
        data.entryDate=new Date();
        data.active=true;
        const response = await axios.post(url + 'ComputerEquipments/create', data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function updateComputerEquipment(data) {
    try {
        data.lastModifications=new Date();
        const response = await axios.put(url + 'ComputerEquipments/update', data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function getComputerEquipmentById(id) {
    try {
        const response = await axios.get(url + 'ComputerEquipments/getById/' + id);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function getComputerEquipmentBySerialNumber(serialNumber){
    try {
        const response = await axios.get(url + 'ComputerEquipments/getBySerialNumber/' + serialNumber);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function getComputerEquipmentByPlate(licensePlate){
    console.log(licensePlate);
    try {
        const response = await axios.get(url + 'ComputerEquipments/getByPlate/' + licensePlate);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}