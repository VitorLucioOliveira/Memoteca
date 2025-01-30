const URL_BASE = "http://localhost:3000"

const api = {
    async  buscarPensamentos() {
        try {
            const response = await axios.get(URL_BASE + '/pensamentos')
            return  await response.data
       
        } catch (error) {
            alert('Erro ao Buscar pensamentos' + error)
            throw error
        }
    },

    async  salvarPensamento(pensamento) {
        try {
            const response = await axios.post( URL_BASE + '/pensamentos', pensamento)
            return  await response.data
       
        } catch (error) {
            alert('Erro ao Salvar pensamentos' + error)
            throw error
        }
    },

    async buscarPensamentoPorID(id){
        try {
            const response = await axios.get(URL_BASE + `/pensamentos/${id}`)
            return await response.data
        } catch (error) {
            alert('Erro ao buscar pensamento por ID' + error)
            throw error
        }
    },
    
    async  editarPensamento(pensamento) {
        try {
            const response = await axios.put(`${URL_BASE}/pensamentos/${pensamento.id}`, pensamento)
            return  await response.data
       
        } catch (error) {
            alert('Erro ao editar pensamentos' + error)
            throw error
        }
    },

    async excluirPensamento(id) {
        try {
            const response = await axios.delete(URL_BASE + `/pensamentos/${id}`)
            return  await response.data
       
        } catch (error) {
            alert('Erro ao excluir pensamentos' + error)
            throw error
        }
    },
}

export default api;