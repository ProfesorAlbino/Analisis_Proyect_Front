import axios from "axios";
const url = 'https://localhost:7210/api/';

export async function createCopy(data) {
    try {
      const response = await axios.post(url + 'Copies/create', data);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }
  export async function getAll(id) {
    try {
      const response = await axios.get(url + 'Copies/getAll/'+id);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }
  export async function getById(id) {
    try {
      const response = await axios.get(url + 'Copies/getById/'+id);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      throw error;
    }
  }
  
  export async function updateCopy(data) {
    try {
      const response = await axios.put(url + 'Copies/update',data);
      return response.data;
    } catch (error) {
      console.error('Error al modificar los datos:', error);
      throw error;
    }
  }
  export async function deleteCopy(id) {
    try {
      const response = await axios.delete(url + 'Copies/delete/'+id);
      return response.data;
    } catch (error) {
      console.error('Error al modificar los datos:', error);
      throw error;
    }
  }
  
  