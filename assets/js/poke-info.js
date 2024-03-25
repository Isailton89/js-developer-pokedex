const liPoke = document.querySelectorAll('.name')
const modal = document.querySelector('dialog')
const btnSair = document.getElementById('sair')

async function acessarPoke(poke) {
    const conexao = await fetch(`https://pokeapi.co/api/v2/pokemon/${poke}`)
    const conexaoConvertida = await conexao.json()
    return conexaoConvertida
}

pokemonList.addEventListener('click', async (evento) => {
    const clicado = evento.target.textContent

    const acessarPokemon = await acessarPoke(clicado)
    modal.showModal()
    modal.classList.add(`${acessarPokemon.types[0].type.name}`)
    modal.innerHTML = cardPokeModal(acessarPokemon)
})

function cardPokeModal(poke) {
    return `
        <div class="poke-detalhe-nome">
            <span>${poke.name}</span>
            <span>#${poke.id}</span>
        </div>
        <img class="img-poke" src="${poke.sprites.other.dream_world.front_default}">
        <div class="base-poke">
            <h2>Base Stats</h2>
            <div class="informacoes-card">
                <div class="status-nome">
                    ${poke.stats.map((item) => `<div>${item.stat.name}</div>`).join('')}
                </div>
                
                <div class="status-ponto">
                    ${poke.stats.map((item) => `<div>${item.base_stat}</div>`).join('')}
                </div>
            </div>
            
            <button id="sair" onclick="fecharModal()">Sair</button>
        </div>
        

    `
}

function fecharModal() {
    modal.close()
    modal.innerHTML = ""
    modal.classList = []
}