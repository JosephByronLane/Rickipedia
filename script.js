const searchInput = document.querySelector("input[type='search']")

let currentTemplateId = "#profe";



document.getElementById('my-design').addEventListener('click', function() {
    currentTemplateId = "#joseph"; 
    if (!document.querySelector('.root .container .search-prompt')) {
        getProduct(searchInput.value);
    }});

document.getElementById('profes-design').addEventListener('click', function() {
    currentTemplateId = "#profe"; 
    if (!document.querySelector('.root .container .search-prompt')) {
        getProduct(searchInput.value);
    }
});

searchInput.addEventListener("keyup", ()=>{
        getProduct(searchInput.value);
})


function getProduct(inputValue){
    fetch(`https://rickandmortyapi.com/api/character/?name=${inputValue}`)
    .then(response=>response.json())
    .then((response)=>{
        createLayout(response.results)
    })
}

function createLayout(results){
    
    //Para usar el mio (que le mande mensaje por teams reemplazelo por #joseph)
    //Para que este exactamente como el suyo, ponga #profe
    const template_product = document.querySelector(currentTemplateId);

    const contenedor_template = document.createDocumentFragment()

    results.forEach(item => {
        const template = document.importNode(template_product.content,true)
        const name = template.querySelector("#name")
        name.textContent = item.name

        const status = template.querySelector("#status-value")
        if (status) {
            status.textContent = item.status;
        }

        const image = template.querySelector(".character-image")
        image.setAttribute("src", item.image)

        const species = template.querySelector("#species-value")
        if (species) {
            species.textContent = item.species;
        }

        const origin = template.querySelector("#origin-value")
        console.log(item.origin.name)
        origin.textContent = "Origin: " + item.origin.name;

        const buttos_success = template.querySelector(".see-more-button")
        const buttos_delete = template.querySelector(".delete-button")

        const card = template.querySelector('.card')
        card.setAttribute("id", `card-${results.id}`)

        buttos_delete.setAttribute("onClick", `deleteCard(${results.id})`)


        buttos_success.setAttribute("onClick", `saludar(${results.id})`)
        contenedor_template.appendChild(template)
    });
    const container = document.querySelector(".container")
    container.innerHTML= ""
    container.appendChild(contenedor_template)
}

function saludar(params){
    alert("hola")
}

function deleteCard(id){
    const container = document.querySelector(".container")
    const cardSelected = document.querySelector(`#card-${id}`)
    const name = cardSelected.querySelector(".character-name")
    if(confirm(`Are you sure you want to delete the card of ${name.textContent}?`)){
        container.removeChild(cardSelected)
        saveLocalStorage(id)
    }
}

function saveLocalStorage(id){
    localStorage.setItem(`card-${id}`, id)
}