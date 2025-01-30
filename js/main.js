import ui from './ui.js'
import api from './api.js'

document.addEventListener('DOMContentLoaded', () => {
    ui.renderizarPensamentos()

    const form_pensamento = document.getElementById('pensamento-form')
    form_pensamento.addEventListener('submit', manipularSubmitForm)

    const botao_cancelar = document.getElementById('botao-cancelar')
    botao_cancelar.addEventListener('click', ManuipularCancelar)
})

async function manipularSubmitForm(evento) {
    evento.preventDefault()
    const id = document.getElementById('pensamento-id').value
    const conteudo = document.getElementById('pensamento-conteudo').value
    const autoria = document.getElementById('pensamento-autoria').value

    try {
        if (id) {
            await api.editarPensamento({ id, conteudo, autoria })
        }
        else{
            await api.salvarPensamento({ conteudo, autoria })
        }
        ui.renderizarPensamentos()
    } catch (error) {
        alert('Erro ao salvar pensamento')
        throw error
    }
}

function ManuipularCancelar() {
    ui.limparFormulario()
}