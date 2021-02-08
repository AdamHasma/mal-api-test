const apiUrl = "https://api.jikan.moe/v3"

const scoreSelect = document.getElementById("multi-select-3");
const scoreLabel = document.querySelector(".score-label");
const genreSelect = document.getElementById("select-1");
const typeSelect = document.getElementById("select-2");

const checkboxes = document.querySelectorAll(".checkbox-container>.custom-checkbox:not(:first-child)>input");
const checkboxes2 = document.querySelectorAll(".checkbox-container-2>.custom-checkbox:not(:first-child)>input");
const checkboxContainer = document.querySelector(".checkbox-container");
const checkboxContainer2 = document.querySelector(".checkbox-container-2");

const includeNote = document.querySelector(".include-note");
const excludeNote = document.querySelector(".exclude-note");

const cardContainer = document.querySelector(".card-container");
const contentWrapper = document.querySelector(".content-wrapper");
const dateWrapper = document.querySelector(".date-wrapper");
const btn = document.querySelector(".btn-primary");
const toggle = document.querySelector(".toggle");
let status = ""

const plusFrom1 = document.getElementById("plus-from-1");
const plusFrom5 = document.getElementById("plus-from-5");
const minusFrom1 = document.getElementById("minus-from-1");
const minusFrom5 = document.getElementById("minus-from-5");
const startDate = document.getElementById("start-date");
let startDateValue = 1950;

const plusTo1 = document.getElementById("plus-to-1");
const plusTo5 = document.getElementById("plus-to-5");
const minusTo1 = document.getElementById("minus-to-1");
const minusTo5 = document.getElementById("minus-to-5");
const endDate = document.getElementById("end-date");
let endDateValue = 2021;

let genreArray = [];
let excludeGenreArray = [];
let excludeUrl = ``
let includeUrl = ``


// HTML Basic Structure START

btn.addEventListener("click", getPosts);

//DESELECT FUNCTION FOR SCORESELECT
// contentWrapper.addEventListener('click', function(e) {
//   if (scoreSelect.contains(e.target) || btn.contains(e.target) || typeSelect.contains(e.target) || genreSelect.contains(e.target) || dateWrapper.contains(e.target)) {} else {
//     scoreSelect.selectedIndex = "-1";
//   }
// });

//OLD LIGHT MODE SWITCHER
// toggle.addEventListener("click", function() {
//   if (toggle.innerText === "💡") {
//     toggle.innerText = "🌑";
//   } else {
//     toggle.innerText = "💡";
//   }
// })

const includeRadio = () => {
  excludeGenreArray = [];
  checkboxContainer.style.display = "flex";
  checkboxContainer2.style.display = "none";
  excludeUrl = ``;
  if (includeNote.classList.contains("invisible")) {
    includeNote.classList.toggle("invisible")
    excludeNote.classList.toggle("invisible")
  }
  for (let i = 0, len = checkboxes2.length; i < len; i++) {
    checkboxes2[i].checked = false;
  }
}

const excludeRadio = () => {
  genreArray = [];
  checkboxContainer.style.display = "none";
  checkboxContainer2.style.display = "flex";
  includeUrl = ``;
  if (excludeNote.classList.contains("invisible")) {
    includeNote.classList.toggle("invisible");
    excludeNote.classList.toggle("invisible");
  }
  for (let i = 0, len = checkboxes.length; i < len; i++) {
    checkboxes[i].checked = false;
  }
}

const excludeGenrePush = (id, string) => {
  if (document.getElementById(id).checked === true) {
    excludeGenreArray.push(string)
  } else {
    let index = excludeGenreArray.indexOf(string);
    if (index !== -1) {
      excludeGenreArray.splice(index, 1);
    }
  }
}

const genrePush = (id, string) => {
  if (document.getElementById(id).checked === true) {
    genreArray.push(string)
  } else {
    let index = genreArray.indexOf(string);
    if (index !== -1) {
      genreArray.splice(index, 1);
    }
  }
}

const changeLabel = num => {
  scoreLabel.innerText = `Score range of ${num} - 10`
}

const booleanChange = () => {
  if (status === "") {
    status = "completed";
    console.log(status);
  } else {
    status = "";
    console.log(status);
  }
}

// CHANGING FROM VALUE START
const changeValueFrom = num => {
  startDateValue = parseInt(startDate.value) + num;
  startDate.value = startDateValue;
};

plusFrom1.addEventListener("click", function() {
  if (startDate.value < "2021") {
    changeValueFrom(1);
  }
});

plusFrom5.addEventListener("click", function() {
  if (startDate.value < "2017") {
    changeValueFrom(5);
  }
});

minusFrom5.addEventListener("click", function() {
  if (startDate.value > "1921") {
    changeValueFrom(-5);
  }
});

minusFrom1.addEventListener("click", function() {
  if (startDate.value > "1917") {
    changeValueFrom(-1);
  }
});
// CHANGING FROM VALUE END


// CHANGING END VALUE START
const changeValueEnd = num => {
  endDateValue = parseInt(endDate.value) + num;
  endDate.value = endDateValue;
};

plusTo1.addEventListener("click", function() {
  if (endDate.value < "2021") {
    changeValueEnd(1);
  }
});

plusTo5.addEventListener("click", function() {
  if (endDate.value < "2017") {
    changeValueEnd(5);
  }
});

minusTo5.addEventListener("click", function() {
  if (endDate.value > "1921") {
    changeValueEnd(-5);
  }
});

minusTo1.addEventListener("click", function() {
  if (endDate.value > "1917") {
    changeValueEnd(-1);
  }
});
// CHANGING END VALUE END

// HTML Basic Structure END

// Fetching Data
async function getPosts() {
  if (excludeNote.classList.contains("invisible")) {
    includeUrl = `genre=${genreArray.join(',')}`;
  } else if (includeNote.classList.contains("invisible")) {
    excludeUrl = `&genre=${excludeGenreArray.join(',')}&genre_exclude=0`;
  }
  
  const response = await fetch(`${apiUrl}/search/anime?${includeUrl}${excludeUrl}&type=${typeSelect.value}&score=${scoreSelect.value}&start_date=${startDate.value}-01-01&end_date=${endDate.value}-01-01&status=${status}&order_by=score&sort=desc&limit=25`);
  getURL();
  const data = await response.json();
  console.log(data);

  let html = '';
  cardContainer.innerHTML = '';
  document.querySelector(".results-container").innerHTML = '';
  try {
    for (let i = 0, len = data.results.length; i < len; i++) {
      let htmlSegment =
        `   <div class="mw-full">
              <div class="card p-0">
                <img src="${data.results[i].image_url}" class="img-fluid rounded-top" alt="...">
                <p class="score font-size-12 text-monospace">Score: ${data.results[i].score}</p>
                <div class="content">
                  <h2 class="content-title">
                    ${data.results[i].title}
                  </h2>
                  <p class="text-muted">
                    ${data.results[i].synopsis}
                  </p>
                  <div class="text-right">
                    <a href="${data.results[i].url}" target="_blank" class="btn">Go To MAL</a>
                  </div>
                </div>
              </div>
            </div>`;

      html += htmlSegment;
    }
    document.querySelector(".results-container").innerHTML +=
      `
    <h1 class="content-title results mb-0">Results</h1>
    <p class="text-xl mt-0 mb-0 text-muted">Results are sorted starting from the best score</p>
    `;

    cardContainer.innerHTML += html;
  } catch (err) {
    document.querySelector(".results-container").innerHTML +=
      `
    <h1 class="content-title results mb-0">Oopsie Doopsie</h1>
    <p class="text-xl mt-0 mb-0 text-muted">No results were found!</p>
    `;
  }
};

function getURL() {
  console.log(`${apiUrl}/search/anime?${includeUrl}${excludeUrl}&type=${typeSelect.value}&score=${scoreSelect.value}&start_date=${startDate.value}-01-01&end_date=${endDate.value}-01-01&status=${status}&order_by=score&sort=desc&limit=25`)
}
