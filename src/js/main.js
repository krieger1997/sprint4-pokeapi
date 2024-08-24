import { pokemonColors } from "./pokemonColors";
import Chart from 'chart.js/auto';

let OFFSET = 0;
let DATAGLOBAL;
let pokemonCards=[];

//VARIABLES DEL DOM
const inputDOMContent = document.querySelector("#inputDOMContent"),
  btnCargaMas = document.querySelector("#buscarMas"),
  btnLimpia = document.querySelector("#limpiar"),
  inpBusca = document.querySelector("#inpBusca"),
  modalPokeDetalle = new bootstrap.Modal(document.getElementById('modalPokeDetalle')),
  modalPokeDetalleBody = document.querySelector("#modalPokeDetalleBody");


//============================================ FUNCIONES ====================================================
const obtieneDataGlobal = async () => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon`);
  const data = await response.json();
  return data;
}



const obtienePokemonLista = async (offset = 0, limit = 20) => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
  const data = await response.json();
  return data;
};

const obtienePokemonId = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then(response => {
      response.json().then(res => {
        resolve(res);

      });

    }).catch(error => {
      alert("ERROR AL OBTENER DATOS POR ID." + error.status)
      reject(error)
    })


  })

};

const muestraCardPokemon = (data)=>{
  
  const { name, types, sprites, id } = data;
  let contenido = '';


  contenido += `
    <div class="col-lg-3 col-md-4 col-xs-2 col-sm-6 col-12 mb-3">
      <div class="card pokemon-card" role="button" data-idPokemon="${id}" >
        <img src="${sprites.other['official-artwork'].front_default}" class="card-img-top" alt="IMAGEN ${name}">
        <div class="card-body">
          <h5 class="card-title text-capitalize fw-bold">${name}</h5>
          <p class="card-text text-secondary">Id #${id.toString().padStart(4, '0')}</p>
          <div class="d-flex justify-content-evenly">`;

  types.forEach(tipo => {
    let objColor = pokemonColors.find(obj => obj.type == tipo.type.name)
    contenido += `<span class="badge" style="background-color:${objColor.colors[0]};color:white;width:5rem;">${tipo.type.name}</span>`;

  })
  contenido += `</div>
        </div>
      </div>
    </div>`;

  inputDOMContent.innerHTML += contenido;
}

const obtieneDetalle = async (res) => {
  for (const elem of res) {
    const response = await fetch(elem.url);
    const data = await response.json();
    muestraCardPokemon(data);
    
  }
  pokemonCards= document.querySelectorAll(".pokemon-card");
  
pokemonCards.forEach(pokemonCard => {
  pokemonCard.addEventListener('click', () => {
    const idPokemon = pokemonCard.dataset.idpokemon;
    obtienePokemonId(idPokemon).then(res=>{
       console.log("DETALLE RES",res)
       cargaModal(res)

    }).catch(error=>{
      console.error(error)
    })
  });
});
}




const carga20 = () => {
  obtienePokemonLista(OFFSET, 20).then(res => {
    obtieneDetalle(res.results).then(res => {
      OFFSET += 20;
    });
  })
}

const limpia = (carga=true) => {
  OFFSET = 0;
  inputDOMContent.innerHTML = '';
  if(carga) carga20();
}

btnCargaMas.addEventListener("click", carga20)
btnLimpia.addEventListener("click", limpia)

    

obtieneDataGlobal().then(async res => {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=0&limit=${res.count}`);
  const data = await response.json();
  DATAGLOBAL = data.results;
  console.log("DATAGLOBAL", DATAGLOBAL)
});


const buscaPorNombre=async text=>{
  const res = DATAGLOBAL.filter((pokemon) => {
    return pokemon.name==text.toLowerCase() || pokemon.name.startsWith(text.toLowerCase());
  });
  
  for (const elem of res) {
    const response = await fetch(elem.url);
    const data = await response.json();
    muestraCardPokemon(data);
  }
  pokemonCards= document.querySelectorAll(".pokemon-card");
  
  pokemonCards.forEach(pokemonCard => {
    pokemonCard.addEventListener('click', () => {
      const idPokemon = pokemonCard.dataset.idpokemon;
      obtienePokemonId(idPokemon).then(res=>{
         console.log("DETALLE RES",res)
         cargaModal(res)
  
      }).catch(error=>{
        console.error(error)
      })
    });
  });
}

inpBusca.addEventListener("keyup",async (event)=>{
  if(event.target.value.toLowerCase() != ''){
    limpia(false)
    await buscaPorNombre(event.target.value.toLowerCase());
  }else{
    limpia();
  }
})

const cargaModal=data=>{
  console.log("estaestta",data)
  const { name, types, sprites, id, height, weight, stats } = data;
  let objColor = pokemonColors.find(obj => obj.type == types[0].type.name)
  let colorPrincipal = objColor.colors[0];
  let colorSecundario = objColor.colors[1];//variante oscura

  console.log(name,types,objColor.colors[0])



  // modalPokeDetalleTitulo
  modalPokeDetalleBody.setAttribute("style",
  ` background: ${colorPrincipal};
    background: linear-gradient(180deg, ${colorPrincipal} 0%, ${colorSecundario} 100%);`);
  modalPokeDetalleBody.innerHTML= `
  <div class="d-flex flex-row-reverse"><svg role="button" data-bs-dismiss="modal"
  xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="#212529" class="bi bi-x-circle-fill"
  viewBox="0 0 16 16">
  <path
    d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
</svg>
</div>
<div class="row justify-content-center pt-5">
<div class="col-8">
  <span
    style="position: absolute;color: #ffffff4a;font-size: 18rem;font-weight: bold;right: 23rem;z-index: 1;top: -6rem;">#${id.toString().padStart(4, '0')}</span>
  <div class="row">
    <div class="col-6 d-flex align-items-end ">
      <div style="width: 50%;">
        <h1 style="font-size: 8rem;position: relative;
          z-index: 2;color:white;font-weight: bold;text-transform:capitalize;">${name}</h1>
        <h4 style="color:white;"><b> Altura</b></h4>
        <h4 style="color:white;"><b> Peso</b></h4>
        <h4 style="color:white;"><b> Tipo principal</b></h4>
      </div>
      <div style="width: 50%;">
        <h1>&nbsp;</h1>
        <h4 style="color:white;" align="right">${(height*0.1).toFixed(1)} m</h4>
        <h4 style="color:white;" align="right">${(weight*0.1).toFixed(1)} kg</h4>
        <h4 style="color:white;text-transform:capitalize;" align="right">${types[0].type.name}</h4>
      </div>
    </div>
    <div class="col-6 d-flex justify-content-center">
      <img
        src="${sprites.other['official-artwork'].front_default}"
        class="img-fluid" alt="IMAGEN-${name}" style="height: 25rem;z-index:2;position:relative;">

    </div>
  </div>
  <div class="row justify-content-center" >
    <div class="col-8" >
    <canvas id="poderesChart"></canvas>
    </div>
  </div>
</div>
</div>
  `;
const statsNombres = stats.map(stat=> stat.stat.name)
const statsValor = stats.map(stat=> stat.base_stat)
  
  Chart.defaults.borderColor = '#fff0';
  Chart.defaults.color = '#fff';
  new Chart(document.getElementById('poderesChart'),
   {
    type: 'bar',
    data: {
      labels: statsNombres,
      datasets: [{
        label: 'Estadísticas',
        data: statsValor,
        backgroundColor: '#fff'
      }]
    },
    options: {
      indexAxis: 'y',
      

      
      
    }
  });






  modalPokeDetalle.show();
}



carga20();

