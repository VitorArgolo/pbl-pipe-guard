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
async function loginAndGetToken() {
    try {
        let response = await axios.post('https://api-incidents-1.onrender.com/login', credenciais);
        return response.data.token;
    } catch (error: any) {
        throw new Error('Erro ao fazer login');
    }
}

// Função para listar os incidentes usando o token obtido do login
async function listIncidents(token: string) {
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

// Exportando a Promise que preenche os incidentes
export const incidentsPromise = fillIncidents();
