//Conecta com o elemento do HTML.
const pokemonName = document.querySelector('.pokemon_name');
const pokemonNumber = document.querySelector('.pokemon_number');
const pokemonImage = document.querySelector('.pokemon_image');

const form = document.querySelector('.form');
const input = document.querySelector('.input_search');

const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) =>{
    //await só pde ser usado em funções assíncronas = async. 
    //await espera a resposta da requisição chegar para proseguir com o programa.
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if(APIResponse.status == 200){
        //Usando a biblioteca .json para extrair o json da requisição.
        const data = await APIResponse.json();
        return data;
    }  
}

const renderPokemon = async (pokemon) => {

    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';

    //Como chamamos um função que é async, também deveremos esperar a resposta com o awaint.
    const data = await fetchPokemon(pokemon);

    if(data){
        pokemonImage.style.display = 'block';
        
        //Pega o nome do pokemon no json.
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;

        //Usando [''] em vez de . pois usando . neste caso da erro, o js não entende o caminho .generation-v (caractere especial).
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];

        //Para limpar a box de input.
        input.value = '';

        //Atualiza a variável searchPokemon para acessarmos em outras funções.
        searchPokemon = data.id;

    }else{
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
}

//Pega nome ou número inserido.
form.addEventListener('submit', (event)=>{
    
    //Bloqueando comportamento padrão do formulário.
    event.preventDefault();

    //toLowerCase para sempre passar o nome minúsculo para requisição e não quebrar.
    renderPokemon(input.value.toLowerCase());
});

buttonPrev.addEventListener('click', () => {
    if (searchPokemon > 1) {
      searchPokemon -= 1;
      renderPokemon(searchPokemon);
    }
  });

buttonNext.addEventListener('click', ()=>{
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);