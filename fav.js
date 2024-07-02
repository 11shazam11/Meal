import { fetchdata } from './export.js';
function defalutfav() {
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
      let name = localStorage.key(i);
      let img = localStorage.getItem(name);
      displayfav(name, img);
    }
  }
}
defalutfav();


function displayfav(name, img) {
  fetchdata(name).then(data => {
    let result = data.meals[0];
    console.log(result.idMeal);
    let con = document.querySelector('.favP');
    let div = document.createElement('div');
    div.className - 'item';
    div.innerHTML = `<div class="card" style="width: 10rem;">
        <a href="mealinfo.html?id=${result.idMeal}"><img src="${img}" class="card-img-top" alt="..."></a>
          <div class="card-body">
            <h5 class="card-title">${name}</h5>
            <a href="#" id="${name}" class="btn btn-primary">Remove</a>
          </div>
        </div>`;
    con.appendChild(div);
    document.getElementById(`${name}`).addEventListener('click', () => {
      localStorage.removeItem(name);
      document.querySelector('.favP').textContent = '';
      defalutfav();
    });
  });
}
