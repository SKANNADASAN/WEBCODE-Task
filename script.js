
function fetchTable(url) {
    var pokemonList = fetch(url);
    getallpokemon();


    async function getallpokemon() {
        try {
            var list = await pokemonList;
            var plist = await list.json();

            displayTable(plist);
            setButton(plist);
        }
        catch (error) {
            console.log(error);
        }
    }

}


fetchTable("https://pokeapi.co/api/v2/pokemon/?limit=20&offset=0");

getSinglePokemon('https://pokeapi.co/api/v2/pokemon/1/');

 
var container = document.createElement("div");
container.setAttribute("class", "container");

var table = document.createElement("table");
var tr = document.createElement("tr");
var th1 = document.createElement("th");
var th2 = document.createElement("th");
var tbody = document.createElement("tbody");
table.setAttribute("border", "1");
tr.append(th1, th2);
table.append(tr, tbody);
th1.innerHTML = "Name";
th2.innerHTML = "Action";
var cardContainer = document.createElement("div");
cardContainer.setAttribute("class", "card-container");
var card = document.createElement("div");
card.setAttribute("class", "card");
card.setAttribute("id", "item");
var buttonDiv = document.createElement("div");
buttonDiv.setAttribute("class", "buttons");


cardContainer.append(card);
container.append(table, cardContainer);
document.body.append(container, buttonDiv);
function displayTable(data) {
    tbody.innerHTML = "";
    for (let i = 0; i < data.results.length; i++) {
        tbody.innerHTML += `<tr>
    <td>${data.results[i].name}</td>
    <td><a onclick="getSinglePokemon('${data.results[i].url}')">Show Detail</a></td>
    </tr>
    `;

    }


}
function setButton(data) {
    buttonDiv.innerHTML = "";
    buttonDiv.innerHTML += `<button onclick="fetchTable('${data.previous}')">Prev</button><button onclick="fetchTable('${data.next}')">Next</button>`;
}
function getSinglePokemon(data) {
    var pokemon = fetch(data);
    getpokemon();
    async function getpokemon() {
        try {
            var item = await pokemon;
            var pitem = await item.json();

            displayCard(pitem);
        }
        catch (error) {
            console.log(error);
        }
    }
}
function displayCard(data) {
    var pokemon1 = document.getElementById("item");  
    pokemon1.innerHTML = `<div class="card">
   <div class="card-img"><img src="${data.sprites.front_default}" alt="${data.name}">
     <h1>${data.name}</h1>
   </div>
   <div class="card-details"><span>Weight: ${data.weight}</span><span>Moves:${data.moves.length}</span></div>
   
   
 </div>`;

    var cardText = document.createElement("div");
    cardText.setAttribute("class", "card-text");
    cardText.innerHTML = `<h2>Ability</h2>`
    for (let i = 0; i < data.abilities.length; i++) {
        cardText.innerHTML += `<p>${data.abilities[i].ability.name}</p>`;
    }
    pokemon1.append(cardText);

}

