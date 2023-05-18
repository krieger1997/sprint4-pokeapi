const obtienePokemonLista = async (offset, limit) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  console.log(data)
  return data;
};

const obtienePokemonId = async (id) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const data = await response.json();
  return data;
};


obtienePokemonLista().then(res=>{
  //ID ES INDICE +1
  // console.table(res.results)
  res.results.forEach(  (element,indice) => {

      obtienePokemonId(indice+1).then(resp=>{
       const {name,types,sprites,id} = resp;

       let inputDOMContent = document.querySelector("#inputDOMContent");

       inputDOMContent.innerHTML+=`
      <div class="col-3 mb-3">
        <div class="card pokemon-card"  >
          <img src="${sprites.other['official-artwork'].front_default}" class="card-img-top" alt="IMAGEN ${name}">
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <p class="card-text">ID ${id}</p>
            <a href="#" class="btn btn-success">hola</a>
          </div>
        </div>
      </div>`







      // console.log("EL NAME: ",name)

      // types.forEach(tipo=>{
      //   console.log("EL tipo: ",tipo.type.name)
      // })

      // console.log("IMAGEN",sprites.other['official-artwork'].front_default)

      // console.log("LA ID",id)

      // console.log("==========================================================================")

     }) 


  });

})




// const pokemonColors = {
//   normal: '#A8A878',
//   fire: '#F08030',
//   water: '#6890F0',
//   electric: '#F8D030',
//   grass: '#78C850',
//   ice: '#98D8D8',
//   fighting: '#C03028',
//   poison: '#A040A0',
//   ground: '#E0C068',
//   flying: '#A890F0',
//   psychic: '#F85888',
//   bug: '#A8B820',
//   rock: '#B8A038',
//   ghost: '#705898',
//   dragon: '#7038F8',
//   dark: '#705848',
//   steel: '#B8B8D0',
//   fairy: '#EE99AC'
// };

// const pokemonColors = [
//   { type: "Normal", colors: ["#A8A878", "#6D6D4E"] },
//   { type: "Fire", colors: ["#F08030", "#9B4722"] },
//   { type: "Water", colors: ["#6890F0", "#445E9C"] },
//   { type: "Electric", colors: ["#F8D030", "#A1871F"] },
//   { type: "Grass", colors: ["#78C850", "#4E8234"] },
//   { type: "Ice", colors: ["#98D8D8", "#638D8D"] },
//   { type: "Fighting", colors: ["#C03028", "#7D1F1A"] },
//   { type: "Poison", colors: ["#A040A0", "#682A68"] },
//   { type: "Ground", colors: ["#E0C068", "#927D44"] },
//   { type: "Flying", colors: ["#A890F0", "#6D5E9C"] },
//   { type: "Psychic", colors: ["#F85888", "#A13959"] },
//   { type: "Bug", colors: ["#A8B820", "#6D7815"] },
//   { type: "Rock", colors: ["#B8A038", "#786824"] },
//   { type: "Ghost", colors: ["#705898", "#493963"] },
//   { type: "Dragon", colors: ["#7038F8", "#4924A1"] },
//   { type: "Dark", colors: ["#705848", "#49392F"] },
//   { type: "Steel", colors: ["#B8B8D0", "#787887"] },
//   { type: "Fairy", colors: ["#EE99AC", "#9B6470"] }
// ];





// obtienePokemonId(25).then(res=>{
//   console.log("EL 25")
//   console.table(res)
// })