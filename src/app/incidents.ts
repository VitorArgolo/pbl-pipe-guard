import axios from 'axios';

export interface IIncident {
    id: number;
    title: string;
    description: string;
    leak: boolean;
    severity: string;
}

export interface IIncidentsProgresso extends IIncident {
    quantidade: number;
}

var credenciais = { username: 'admin', password: 'admin' };

// Função para realizar o login e obter o token
export async function loginAndGetToken() {
    try {
        let response = await axios.post('https://api-incidents-1.onrender.com/login', credenciais);
        return response.data.token;
    } catch (error: any) {
        throw new Error('Erro ao fazer login');
    }
}

// Função para listar os incidentes usando o token obtido do login
export async function listIncidents(token: string) {
    try {
        var autorizacao = { headers: { authorization: `${token}` } };
        let response = await axios.get('https://api-incidents-1.onrender.com/incidents', autorizacao);
        return response.data;
    } catch (error: any) {
        throw new Error('Erro ao listar incidentes');
    }
}

// Função para preencher os incidentes com os dados da API
export async function fillIncidents() {
    try {
        const token = await loginAndGetToken();
        return await listIncidents(token);
    } catch (error: any) {
        throw new Error('Erro ao preencher incidentes');
    }
}

// Função para criar um novo incidente
export async function createIncident(token: string, incidentData: Partial<IIncident>) {
    try {
        const autorizacao = { headers: { authorization: token } };
        const response = await axios.post('https://api-incidents-1.onrender.com/incidents', incidentData, autorizacao);
        return response.data;
    } catch (error: any) {
        throw new Error('Erro ao criar incidente');
    }
}

// Função para atualizar um incidente existente
export async function updateIncident(token: string, incidentId: number, incidentData: Partial<IIncident>) {
    try {
        const autorizacao = { headers: { authorization: token } };
        const response = await axios.put(`https://api-incidents-1.onrender.com/incidents/${incidentId}`, incidentData, autorizacao);
        return response.data;
    } catch (error: any) {
        throw new Error('Erro ao atualizar incidente');
    }
}

// Função para deletar um incidente existente
export async function deleteIncident(token: string, incidentId: number) {
    try {
        const autorizacao = { headers: { authorization: token } };
        const response = await axios.delete(`https://api-incidents-1.onrender.com/incidents/${incidentId}`, autorizacao);
        return response.data;
    } catch (error: any) {
        throw new Error('Erro ao deletar incidente');
    }
}
// Exportando a Promise que preenche os incidentes
export const incidentsPromise = fillIncidents();
