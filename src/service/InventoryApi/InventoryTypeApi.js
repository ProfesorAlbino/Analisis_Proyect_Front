import axios from 'axios';

const url = 'https://localhost:7210/api/InventoryTypes/';

export async function getInventoryTypes() {
    try {
        const response = await axios.get(url + 'getAll/');
        return response.data; 
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function getInventoryType(id) {
    try {
        const response = await axios.get(url + 'getInventoryType/' + id);
        return response.data; 
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function getInventoryTypesByIdInventory(id) {
    try {
        const response = await axios.get(url + 'getInventoryTypesByIdInventory/' + id);
        return response.data; 
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function getInventoryTypeByIdInventory(id) {
    try {
        const response = await axios.get(url + 'getInventoryTypeByIdInventory/' + id);
        return response.data; 
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function createInventoryType(data) {
    try {
        const response = await axios.post(url + 'createInventoryType/', data);
        return response.data; 
    } catch (error) {
        console.error('Error al crear el tipo de inventario:', error);
        throw error;
    }
}

export async function updateInventoryType(data) {
    try {
        const response = await axios.put(url + 'updateInventoryType/', data);
        return response.data; 
    } catch (error) {
        console.error('Error al actualizar el tipo de inventario:', error);
        throw error;
    }
}

export async function deleteInventoryType(id) {
    try {
        const response = await axios.delete(url + 'deleteInventoryType/' + id);
        return response.data; 
    } catch (error) {
        console.error('Error al eliminar el tipo de inventario:', error);
        throw error;
    }
}