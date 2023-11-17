import axios from "axios";
const urlApi = 'https://localhost:7210/api/LoanBooks/';


export async function createLoanBook(data) {
    try {
        const response = await axios.post(urlApi + "create", data);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        throw error;
    }
}

export async function getLoanBooks() {
    try {
        const response = await axios.get(urlApi + "getAll");
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        throw error;
    }
}

export async function getLoanBooksByUser(id) {
    try {
        const response = await axios.get(urlApi + "getAllByUserId/" + id);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        throw error;
    }
}

export async function getLoanBookById(id) {
    try {
        const response = await axios.get(urlApi + "getById/" + id);
        return response.data;
    } catch (error) {
        console.error("Error al obtener los datos:", error);
        throw error;
    }
}

export async function updateLoanBook(data) {
    try {
        const response = await axios.put(urlApi + "update", data);
        return response.data;
    } catch (error) {
        console.error("Error al modificar los datos:", error);
        throw error;
    }
}

export async function deleteLoanBook(id) {
    try {
        const response = await axios.delete(urlApi + "delete/" + id);
        return response.data;
    } catch (error) {
        console.error("Error al modificar los datos:", error);
        throw error;
    }
}

export async function approveLoanBook(id) {
    try {
        const response = await axios.put(urlApi + "approve/" + id);
        return response.data;
    } catch (error) {
        console.error("Error al modificar los datos:", error);
        throw error;
    }
}

export async function rejectLoanBook(id) {
    try {
        const response = await axios.put(urlApi + "reject/" + id);
        return response.data;
    } catch (error) {
        console.error("Error al modificar los datos:", error);
        throw error;
    }
}