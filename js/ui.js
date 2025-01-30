import api from "./api.js"

const ui = {
    async renderizarPensamentos() {
        const ul_pensamentos = document.getElementById('lista-pensamentos')
        const listaVaaszia = document.getElementById('mensagem-vazia')
        ul_pensamentos.innerHTML = ""

        try {
            const pensamentos = await api.buscarPensamentos()
            console.log(pensamentos)
            if (pensamentos.length == 0) {
                listaVaaszia.style.display = "block"
            }
            else {
                 listaVaaszia.style.display = "none"
                pensamentos.forEach(pensamento => ui.adicionarPensamentosNaLista(pensamento));
            }

        } catch (error) {
            alert('Erro ao Renderizar')
            throw error
        }
    },

    adicionarPensamentosNaLista(pensamento) {//Criando cada elemento (li) da lista de pensamentos
        const ul_pensamentos = document.getElementById('lista-pensamentos')

        //criando li
        const li = document.createElement('li')
        li.setAttribute("data-id", pensamento.id)
        li.classList.add("li-pensamento")

        //criando icone do li
        const iconeAspas = document.createElement('img')
        iconeAspas.classList.add("icone-aspas")
        iconeAspas.src = "assets/imagens/aspas-azuis.png"
        iconeAspas.alt = "Aspas azuis"

        //criando div de conteudo
        const pensamentoConteudo = document.createElement("div")
        pensamentoConteudo.textContent = pensamento.conteudo
        pensamentoConteudo.classList.add("pensamento-conteudo")

        //criando div de autoria
        const pensamentoAutoria = document.createElement("div")
        pensamentoAutoria.textContent = pensamento.autoria
        pensamentoAutoria.classList.add("pensamento-autoria")

        //criando botoes de editar e apagar
        const botao_editar = document.createElement('button')
        botao_editar.classList.add('botao-editar')
        botao_editar.onclick = () => ui.preencherFormulario(pensamento.id)

        const icone_editar = document.createElement('img')
        icone_editar.src = "assets/imagens/icone-editar.png"
        icone_editar.alt = "Editar"
        botao_editar.appendChild(icone_editar)

        const botao_excluir = document.createElement('button')
        botao_excluir.classList.add('botao-excluir')
        botao_excluir.onclick = async () => {
            try {
                await api.excluirPensamento(pensamento.id)
                ui.renderizarPensamentos()

            } catch (error) {
                throw error
            }

        }

        const icone_excluir = document.createElement('img')
        icone_excluir.src = "assets/imagens/icone-excluir.png"
        icone_excluir.alt = "excluir"
        botao_excluir.appendChild(icone_excluir)

        //criando div para botoes
        const icones = document.createElement('div')
        icones.classList.add('icones')
        icones.appendChild(botao_editar)
        icones.appendChild(botao_excluir)



        //juntando tudo dentro do li
        li.appendChild(iconeAspas)
        li.appendChild(pensamentoConteudo)
        li.appendChild(pensamentoAutoria)
        li.appendChild(icones)
        //Botando na lista ul
        ul_pensamentos.appendChild(li)

    },

    async preencherFormulario(pensamentoID) {
        const pensamento = await api.buscarPensamentoPorID(pensamentoID)
        document.getElementById('pensamento-id').value = pensamento.id
        document.getElementById('pensamento-conteudo').value = pensamento.conteudo
        document.getElementById('pensamento-autoria').value = pensamento.autoria
    },

    limparFormulario() {
        document.getElementById("pensamento-form").reset();
    }
}

export default ui;