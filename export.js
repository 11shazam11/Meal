
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
  input.onkeyup = (e) => {
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
    let str = e.target.value;
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
    if (e.keyCode == 13) {
      let container = document.querySelector('.left');
      container.innerHTML = '';
      displayEntered(input.value);
    }

  }
}
suggestion();

function clickSearch() {
  let input = document.getElementById('search');
  document.getElementById('searchbtn').addEventListener('click', () => {
    let container = document.querySelector('.left');
    container.innerHTML = '';
    displayEntered(input.value);
  });
}
clickSearch();
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

// async function fetchdata(str) {
//   try {
//     const request = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${str}`);
//     if (!request.ok) {
//       throw new Error('some thig is wrong');
//     }
//     const data = await request.json();
//     return data;
//   } catch (e) {
//     console.error(e);
//   }
// }
// async function suggestion() {
//   let input = document.getElementById('search');
//   //on entering anything on input following will trigger
//   input.onkeyup = () => {
//     enterarr.length = 0;
//     //if active element is not input block will disaapear
//     let interval = setInterval(() => {
//       let active = document.activeElement;
//       if (active.id != 'search') {
//         document.querySelector('.resultBox').style.display = 'none';
//         clearInterval(interval);
//       }
//     }, 1000);
//     //if input is empty then dissapear
//     let str = input.value;
//     if (str == '') {
//       document.querySelector('.resultBox').style.display = 'none';
//     } else if (str.length > 0) {
//       document.querySelector('.resultBox').style.display = 'block';
//     }
//     //displaing the data
//     fetchdata(str).then(data => {
//       let result = data.meals;
//       let con = document.querySelector('.resultBox');
//       con.innerHTML = '';
//       let ul = document.createElement('ul');
//       for (let i = 0; i < result.length; i++) {
//         enterarr.push(result[i].idMeal);
//         let li = document.createElement('li');
//         let link = document.createElement('a');
//         link.textContent = result[i].strMeal;
//         link.setAttribute('href', `mealinfo.html?id=${result[i].idMeal}`);
//         //LINK ADD PENDING

//         li.appendChild(link);
//         ul.appendChild(li);
//       }
//       con.appendChild(ul);

//     });

//   }
//   input.addEventListener('keydown', (e) => {
//     if (e.key == 'Enter') {
//       let container = document.querySelector('.left');
//       container.innerHTML = '';
//       displayEntered(input.value);
//     }
//   });
//   document.getElementById('searchbtn').addEventListener('click', () => {
//     let container = document.querySelector('.left');
//     container.innerHTML = '';
//     displayEntered(input.value);
//   });

// }
// suggestion();

// function displayEntered(str) {
//   fetchdata(str).then(data => {
//     let result = data.meals;
//     for (let i = 0; i < result.length; i++) {
//       let container = document.querySelector('.left');
//       container.classList.add('box');
//       let item = document.createElement('div');
//       item.className = 'item';
//       item.innerHTML = `<div class="card" style="width: 10rem;">
//           <a href="mealinfo.html?id=${result[i].idMeal}"><img src="${result[i].strMealThumb}" class="card-img-top" alt="..."></a>

//             <div class="card-body">
//               <h5 class="card-title">${result[i].strMeal}</h5>
//               <a href="#" onclick = "addfav(${result[i].idMeal})" class="btn btn-primary">ADD FAV</a>
//             </div>
//           </div>`;
//       container.appendChild(item);
//     }

//   });

// }
export async function byid(id) {
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

export async function fetchByIng(name) {
  try {
    const ingreq = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${name}`);
    if (!ingreq.ok) {
      throw new Error('something is wrong');
    }
    const ingdata = await ingreq.json();
    return ingdata;
  }
  catch (e) {
    console.error(e);
  }
}


export { fetchdata, suggestion, displayEntered, clickSearch };