let counter = 0;
let enterarr = [];
//Suggestoin bar Algo
async function fetchdata(str) {
  try {
    const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${str}`);
    if (!request.ok) {
      throw new Error('some thig is wrong');
    }
    const data = await request.json();
    return data;
  } catch (e) {
    console.error(e);
  }
}
async function suggestion() {
  let input = document.getElementById('search');
  //on entering anything on input following will trigger
  input.onkeyup = () => {
    enterarr.length = 0;
    //if active element is not input block will disaapear
    let interval = setInterval(() => {
      let active = document.activeElement;
      if (active.id != 'search') {
        document.querySelector('.resultBox').style.display = 'none';
        clearInterval(interval);
      }
    }, 1000);
    //if input is empty then dissapear
    let str = input.value;
    if (str == '') {
      document.querySelector('.resultBox').style.display = 'none';
    } else if (str.length > 0) {
      document.querySelector('.resultBox').style.display = 'block';
    }
    //displaing the data
    fetchdata(str).then(data => {
      let result = data.meals;
      let con = document.querySelector('.resultBox');
      con.innerHTML = '';
      let ul = document.createElement('ul');
      for (let i = 0; i < result.length; i++) {
        enterarr.push(result[i].idMeal);
        let li = document.createElement('li');
        let link = document.createElement('a');
        link.textContent = result[i].strMeal;
        link.setAttribute('href', `mealinfo.html?id=${result[i].idMeal}`);
        //LINK ADD PENDING

        li.appendChild(link);
        ul.appendChild(li);
      }
      con.appendChild(ul);

    });

  }
  ///IF click enter
  input.addEventListener('keydown', (e) => {
    if (e.key == 'Enter') {
      let container = document.querySelector('.left');
      container.innerHTML = '';
      displayEntered(input.value);
    }
  });
  ////IF clicked on search icon
  document.getElementById('searchbtn').addEventListener('click', () => {
    let container = document.querySelector('.left');
    container.innerHTML = '';
    displayEntered(input.value);
  });

}
suggestion();

///////////////////end of suggestion bar/////////////////////////

///function to display the entered data
function displayEntered(str) {
  fetchdata(str).then(data => {
    let result = data.meals;
    for (let i = 0; i < result.length; i++) {
      let container = document.querySelector('.left');
      container.classList.add('box');
      let item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = `<div class="card" style="width: 10rem;">
          <a href="mealinfo.html?id=${result[i].idMeal}"><img src="${result[i].strMealThumb}" class="card-img-top" alt="..."></a>

            <div class="card-body">
              <h5 class="card-title">${result[i].strMeal}</h5>
              <a href="#" onclick = "addfav(${result[i].idMeal})" class="btn btn-primary">ADD FAV</a>
            </div>
          </div>`;
      container.appendChild(item);
    }

  });

}




//latest block 
//get info by id 
async function byid(id) {
  try {
    const idreq = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
    if (!idreq.ok) {
      throw new Error('something is wrong');
    }
    const iddata = await idreq.json();
    return iddata;
  } catch (e) {
    console.error(e);
  }
}


///adding latet block

function latest() {
  let mealid = [52823, 52940, 52841, 52853, 52830, 52791, 52782, 52774];
  for (let i of mealid) {
    byid(i).then(data => {
      let result = data.meals[0];
      let con = document.querySelector('.latest');
      let item = document.createElement('div');
      item.className = 'item';
      item.id = result.idMeal;
      ///Setting image in an anchor tag when clicked sends the id to mealinfo.html(mealinfo)
      item.innerHTML = `<div class="card" style="width: 10rem;">
      <a href="mealinfo.html?id=${result.idMeal}"><img src="${result.strMealThumb}" class="card-img-top" alt="..."></a>
        <div class="card-body">
          <h5 class="card-title">${result.strMeal}</h5>
          <a href="#"  class="btn btn-primary">ADD FAV</a>
        </div>
      </div>`;
      con.appendChild(item);

      item.querySelector('.btn').addEventListener('click', function(e) {
        e.preventDefault();
        addfav(result.idMeal);
      });
    });
  }

}
latest();


///add faav function 
function addfav(id) {
  byid(id).then(data => {
    let res = data.meals[0];
    if (localStorage.getItem(res.strMeal) == null) {
      localStorage.setItem(res.strMeal, res.strMealThumb);
      displayfav(res.strMeal, res.strMealThumb, id);
      alert('added to fav items')
    }
    else {
      alert('already in fav items')
    }
  });
}

///display fav items list

function displayfav(name, img, id) {
  console.log(id);
  let con = document.querySelector('.rightinner');
  let item = document.createElement('div');
  item.className = 'fav';
  item.innerHTML = `<div class="img">
  <a href="mealinfo.html?id=${id}" ><img src="${img}"></a>
                <p>${name}</p>
              </div>
              <div class="remo">
                <button type="button" value="${id}" name="${name}" class="rembtn"> Remove</button>
              </div>`;
  con.appendChild(item);
  let rem = document.querySelectorAll('.rembtn');
  for (let i of rem) {
    i.addEventListener('click', (e) => {
      let elment = e.target.closest('.fav');
      elment.remove();
      localStorage.removeItem(e.target.name);

    });
  }

}

///if the page or broswer is refreshed then the fav items will be displayed

function defaultfav() {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let name = localStorage.key(i);
      let img = localStorage.getItem(name);
      displayfav(name, img);
    }
  }
}

defaultfav();



// ============================================================================================

/////adding popular ingredients
async function fetching() {
  try {
    const ireq = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    if (!ireq.ok) {
      throw new Error('something is wrong');
    }
    const idata = await ireq.json();
    return idata;
  }
  catch (e) {
    console.error(e);
  }
}


function getidata() {
  fetching().then(data => {
    let ires = data.meals;
    let poping = document.querySelector('.poping');
    for (let i = 0; i < 5; i++) {
      let ingItem = document.createElement('div');
      ingItem.className = 'ingitem';
      ingItem.id = ires[i].idIngredient;
      ingItem.innerHTML = `
      <a href="ingridents.html?nameingi=${ires[i].strIngredient}"   ><img src="https://www.themealdb.com/images/ingredients/${ires[i].strIngredient}-Small.png"/></a>
        
        <p>${ires[i].strIngredient}</p>`;
      poping.appendChild(ingItem);

      // Adding event listener to the div
      ingItem.addEventListener('click', (e) => {
        console.log(e.currentTarget.id);
      });
    }
  });
}
getidata();


// ====================================================================================


////Adding Random meals
async function fetchrandom() {
  try {
    const ranReq = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    if (!ranReq.ok) {
      throw new Error('something is wrong');
    }
    const ranData = await ranReq.json();
    return ranData;
  }
  catch (e) {
    console.error(e);
  }
}

function displayrandom() {
  for (let i = 0; i < 8; i++) {
    fetchrandom().then(data => {
      let result = data.meals[0];
      let con = document.querySelector('.random');
      let item = document.createElement('div');
      item.className = 'item';
      item.innerHTML = `<div class="card" style="width: 10rem;">
          <a href="mealinfo.html?id=${result.idMeal}"><img src="${result.strMealThumb}" class="card-img-top" alt="..."></a>
          <div class="card-body">
            <h5 class="card-title">${result.strMeal}</h5>
            <a href="#"  class="btn btn-primary">ADD FAV</a>
          </div>
        </div>`;
      con.appendChild(item);
      item.querySelector('.btn').addEventListener('click', function(e) {
        e.preventDefault();
        addfav(result.idMeal);
      });

    });
  }

}
displayrandom();

