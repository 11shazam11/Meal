import { fetchdata, suggestion, displayEntered, clickSearch } from './export.js';

document.addEventListener('DOMContentLoaded', () => {
  suggestion();
  clickSearch();
});
async function fetchmeal(id) {
  try {
    const req = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (!req.ok) {
      throw new Error('something is wrong');
    }
    const data = await req.json();
    return data;
  }
  catch (e) {
    console.error(e);
  }
}


///get the sent through URL
function getid(id) {
  let urlpara = new URLSearchParams(window.location.search);
  return urlpara.get(id);
}

///display the meal info

function mealinfo() {
  let id = getid('id');
  fetchmeal(id).then(data => {
    let result = data.meals[0];
    let con = document.querySelector('.container');
    con.innerHTML = `<div class="top">
      <div class="info">
        <h1>${result.strMeal}</h1>
        <img  src="${result.strMealThumb}" class="minfoimg">
        <a href="#" onclick="addfav(${result.idMeal})"><button class="btn btn-primary">ADD to fav</button></a>
      </div>
      <div class="ing">
        <h1>Ingridents</h1>
        <div class="inglist">
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="cook">
        <h1>Instructions</h1>
        <p>${result.strInstructions}</p>
      </div>
    </div>`;
    ///the list of ingridents
    let listcon = document.querySelector('.inglist');
    for (let i = 1; i < 21; i++) {
      if (result[`strIngredient${i}`] == "") {
        break;
      }
      else {
        let name = result[`strIngredient${i}`];
        let diva = document.createElement('a');
        diva.href = `ingridents.html?idingi=${name}`;
        let ingItem = document.createElement('div');
        ingItem.className = 'item';
        ingItem.classList.add('center');
        let img = result[`strIngredient${i}`];
        let mea = result[`strMeasure${i}`];
        ingItem.innerHTML = `<a href="ingridents.html?nameingi=${img}" ><img src="https://www.themealdb.com/images/ingredients/${img}-Small.png"></a>
        <p>${mea}</p>`;
        diva.appendChild(ingItem);
        listcon.appendChild(diva);
      }

    }


  });
}
mealinfo();
window.addfav = function(id) {
  fetchmeal(id).then(data => {
    let res = data.meals[0];
    if (localStorage.getItem(res.strMeal) == null) {
      localStorage.setItem(res.strMeal, res.strMealThumb);
      // displayfav(res.strMeal, res.strMealThumb, id);
      alert('added to fav items')
    }
    else {
      alert('already there in fav items');
    }
  });
}