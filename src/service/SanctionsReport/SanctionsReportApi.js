import axios from 'axios';
const url = 'https://localhost:7210/api/';

export async function getSanctionsReports() {
    try {
        const response = await axios.get(url + 'SanctionsReports');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function getSanctionsReportById(id) {
    try {
        const response = await axios.get(url + 'SanctionsReports/getById/' + id);
        return response.data;
    } catch (error) {
        console.error('Error trayendo los datos de la api:', error);
        throw error;
    }
}

export async function postSanctionsReport(sanctionsReport) {
    try {
        sanctionsReport.active=true;
        const response = await axios.post(url + 'SanctionsReports', sanctionsReport);
        return response.data;
    } catch (error) {
        console.error('Error trayendo los datos de la api:', error);
        throw error;
    }
}

export async function putSanctionsReport(sanctionsReport) {
    try {
        const response = await axios.put(url + 'SanctionsReports/update/', sanctionsReport);
        return response.data;
    } catch (error) {
        console.error('Error trayendo los datos de la api:', error);
        throw error;
    }
}

export async function deleteSanctionsReport(id) {
    try {
        const response = await axios.delete(url + 'SanctionsReports/' + id);
        return response.data;
    } catch (error) {
        console.error('Error trayendo los datos de la api:', error);
        throw error;
    }
}
 