
let search_text = document.querySelector("#search-btn");
let search_icon = document.querySelector("#search-icon");
let searchList = document.querySelector(".search-list");
let allData;
let searchId;
let fav_list = [];

const getInputValue = (event) => {
    event.preventDefault();
    let text = search_text.value;
    //console.log(text);
    fetchSuperheros(text);
}

search_icon.addEventListener("click", getInputValue);

// api key - 1846003859067464
const fetchSuperheros = async (text) => {
    let url = `https://www.superheroapi.com/api.php/1846003859067464/search/${text}`;
    try {
        const response = await fetch(url);
        allData = await response.json();
        if (allData.response === 'success') {
            //console.log(allData);
            showSearchList(allData.results);
        }
    } catch (error) {
        console.log(error);
    }

}

const showSearchList = (data) => {
    searchList.innerHTML = "";
    data.forEach(dataItem => {
        const divElem = document.createElement('div');
        divElem.classList.add('search-list-item');
        divElem.innerHTML = `
            <img src = "${dataItem.image.url ? dataItem.image.url : ""}" alt = "">
            <p data-id = "${dataItem.id}">${dataItem.name}</p>
        `;
        searchList.appendChild(divElem);
    })
}

search_text.addEventListener('keyup', () => {
    if (search_text.value.length > 1) {
        fetchSuperheros(search_text.value);
    } else {
        searchList.innerHTML = "";
    }
});

searchList.addEventListener('click', (event) => {
    searchId = event.target.dataset.id;

    console.log(searchId);
    let singleData = allData.results.filter(singleData => {
        return searchId === singleData.id;
    })

    showSuperheroDetails(singleData);
    searchList.innerHTML = "";

    let fav_icon = document.querySelector(".fa-heart");
    let isTab = false;
    fav_icon.addEventListener("click", () => {
        if (isTab == false) {
            fav_icon.style.color = "red";
            isTab = true;
            fav_list.push(searchId);

        }
        else {
            fav_icon.style.color = "lightgoldenrodyellow";
            isTab = false;
            fav_list.pop();
        }

    });
});

const showSuperheroDetails = (data) => {
    console.log(data);
    document.querySelector(".poster").innerHTML = ` <img src = "${data[0].image.url}"> `;
    document.querySelector('.name').innerHTML = `<h2  id = "ml">${data[0].name}</h2>`;
    document.querySelector('.bio').innerHTML = `
        <div class="full-name">
            <i class="fa-solid fa-diamond"></i>
            <b>Full Name</b><span>:</span><span>${data[0].biography['full-name']}</span>
        </div>
        <div class="place-of-birth">
            <i class="fa-solid fa-diamond"></i>
            <b>Birth Place</b><span>:</span><span>${data[0].biography['place-of-birth']}</span>
         </div>
         
        <div class="height">
            <i class="fa-solid fa-diamond"></i>
            <b>Height</b><span>:</span><span>${data[0].appearance['height'][1]}</span>
        </div>
        <div class="weight">
            <i class="fa-solid fa-diamond"></i>
            <b>weight</b><span>:</span><span>${data[0].appearance['weight'][0]}</span>
        </div>
        <div class="publisher">
            <i class="fa-solid fa-diamond"></i>
            <b>Publisher</b><span>:</span><span>${data[0].biography['publisher']}</span>
        </div>
        `;

    document.querySelector(".powerstats").innerHTML = `
        <div class="powerstats-1">
            <div class="intelligence">
                <i class="fa-solid fa-shield-halved"></i>
                <b>Intelligence</b><span>:</span><p>${data[0].powerstats.intelligence}</p>
            </div>
            <div class="strength">
                <i class="fa-solid fa-shield-halved"></i>
                <b>Strength</b><span>:</span><p>${data[0].powerstats.strength}</p>
            </div>
            <div class="speed">
                <i class="fa-solid fa-shield-halved"></i>
                <b>Speed</b><span>:</span><p>${data[0].powerstats.speed}</p>
            </div>
        </div>
        <div class="powerstats-2">
                        
            <div class="durability">
                <i class="fa-solid fa-shield-halved"></i>
                <b>Durability</b><span>:</span><p>${data[0].powerstats.durability}</p>
            </div>
            <div class="power">
                <i class="fa-solid fa-shield-halved"></i>
                <b>Power</b><span>:</span><p>${data[0].powerstats.power}</p>
            </div>
            <div class="combat">
                <i class="fa-solid fa-shield-halved"></i>
                <b>Combat</b><span>:</span><p>${data[0].powerstats.combat}</p>
            </div>
        </div>
        `;

    document.querySelector(".favs").innerHTML = `
        <i class="fa-sharp fa-solid fa-heart" id = "${searchId}"></i>
        `;

}

document.querySelector(".myHero").addEventListener("click", () => {
    localStorage.setItem("favIds", JSON.stringify(fav_list));
})











