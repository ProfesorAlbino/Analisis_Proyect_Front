import axios from 'axios'
const url = 'https://localhost:7210/api/';

export async function createTitle(data) {
  try {
    const response = await axios.post(url + 'Titles/create', data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}
export async function getAll() {
  try {
    const response = await axios.get(url + 'Titles/getAll');
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}
export async function getById(id) {
  try {
    const response = await axios.get(url + 'Titles/getById/'+id);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los datos:', error);
    throw error;
  }
}

export async function updateTitle(data) {
  try {
    const response = await axios.put(url + 'Titles/update',data);
    return response.data;
  } catch (error) {
    console.error('Error al modificar los datos:', error);
    throw error;
  }
}

export async function deleteTitle(id) {
  try {
    const response = await axios.delete(url + 'Titles/delete/'+id);
    return response.data;
  } catch (error) {
    console.error('Error al modificar los datos:', error);
    throw error;
  }
}