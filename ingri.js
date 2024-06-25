//getiing name 
import { byid, fetchByIng } from './export.js';

function getValue(name) {
  let urlpara = new URLSearchParams(window.location.search);
  return urlpara.get(name);
}
//displaying ingredients
function displayIng() {
  let nameIng = getValue('nameingi');
  displayRelMeals(nameIng);
  getIngiList().then(data => {
    let result = data.meals;
    for (let i = 0; i < result.length; i++) {
      if (result[i].strIngredient == nameIng) {
        let con = document.querySelector('.top');
        let div = document.createElement('div');
        div.className = 'ingbig';
        div.innerHTML = `<div class="info">
                  <h1>${result[i].strIngredient}</h1>
                  <img src="https://www.themealdb.com/images/ingredients/${result[i].strIngredient}-Small.png">
                </div>`;
        con.appendChild(div);
        let disCon = document.querySelector('.bottom');
        let dis = document.createElement('p');
        if (result[i].strDescription == null) {
          dis.textContent = 'No description available';
        }
        else {
          dis.textContent = result[i].strDescription;
        }
        disCon.appendChild(dis);
      }
    }
  });
}

displayIng();
//get ingridient list
async function getIngiList() {
  try {
    const req = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    if (!req.ok) {
      throw new Error('something is wrong');
    }
    const data = await req.json();
    return data
  }
  catch (e) {
    console.error(e);
  }
}

function displayRelMeals(name) {
  fetchByIng(name).then(data => {
    let res = data.meals;
    let con = document.querySelector('.inglist');
    for (let i = 0; i < res.length; i++) {
      let div = document.createElement('div');
      div.className = 'item';
      div.innerHTML = ` <div class="card" style="width: 10rem;">
                    <a href="mealinfo.html?id=${res[i].idMeal}"><img
                        src="${res[i].strMealThumb}" class="card-img-top"
                        alt="..."></a>
                    <div class="card-body">
                      <h5 class="card-title">${res[i].strMeal}</h5>
                      <a href="#" onclick="addfav(${res[i].idMeal})" class="btn btn-primary">ADD FAV</a>
                    </div>
                  </div>`;
      con.appendChild(div);
    }
  });
}

window.addfav = function(id) {
  byid(id).then(data => {
    let res = data.meals[0];
    if (localStorage.getItem(res.strMeal) == null) {
      localStorage.setItem(res.strMeal, res.strMealThumb);
      // displayfav(res.strMeal, res.strMealThumb, id);
      alert('added to fav items');
    }
    else {
      alert('already there in fav items');
    }
  });
}
