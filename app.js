const catchElement = (callback, isAll) => {
  const searchField = document.getElementById("search-field");
  const searchFieldText = searchField.value;
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchFieldText}`;
  const searchResult = document.getElementById("search-result");
  const phoneDetail = document.getElementById("phone-detail");
  const allertText = document.getElementById("allert");
  const p = document.createElement("p");
  p.classList.add("text-danger");
  p.innerHTML = "* Pleased search the phone barnd name";
  // console.log(allertText);
  if (searchFieldText == "") {
    searchResult.innerHTML = "";
    phoneDetail.innerHTML = "";
    allertText.appendChild(p);
  } else {
    allertText.innerHTML = "";
    phoneDetail.innerHTML = "";
    searchResult.innerHTML = "";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.data.length > 0) {
          callback(data.data, isAll);
        } else {
          // console.log(data.data);
          searchResult.innerHTML = "";
          p.innerHTML = "* Search result not found";
          allertText.appendChild(p);
        }
      });
  }
};

const searchPhone = () => {
  catchElement(displayPhone, false);
};
const searchPhoneAll = () => {
  catchElement(displayPhone, true);
};

function displayCard(element) {
  const searchResult = document.getElementById("search-result");
  // const releaseDate= element.
  const div = document.createElement("div");
  div.classList.add("col");
  div.innerHTML = `
  <div class="card">
            <img src="${element.image}" class="card-img-top" alt="..." />
            <div class="card-body">
              <h5 class="card-title"> ${element.phone_name}</h5>
              <p class="card-text">
              ${element.brand}
              </p>
              <a  onclick="phoneDetails('${element.slug}')" class="btn btn-primary">Details</a>
            </div>
          </div>
  
  `;
  searchResult.appendChild(div);
  // console.log(div);
}
const displayPhone = (phones, isAll) => {
  console.log(isAll);
  let indexs = "";
  if (isAll) {
    indexs = phones.length;
  } else {
    indexs = 20;
  }
  phones.map((phone, index) => {
    if (index < indexs) {
      // console.log(phone);
      displayCard(phone);
    } else {
      return;
    }
  });
};

// display Phone details

const phoneDetails = (data) => {
  const url = `https://openapi.programming-hero.com/api/phone/${data}`;

  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhoneDetail(data.data));
};

const displayPhoneDetail = (element) => {
  // console.log(element);
  const phoneDetail = document.getElementById("phone-detail");
  let releaseDate = "";
  if (element.releaseDate) {
    releaseDate = `${element.releaseDate}`;
  } else {
    releaseDate = "* No ReleaseDate found *";
  }
  phoneDetail.innerHTML = "";
  const div = document.createElement("div");
  div.classList.add("card");
  div.innerHTML = `
  <img src="${element.image}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h5 class="card-title">${element.name}</h5>
          <p class="card-text">
            ${releaseDate}.<br>
            chipSet: ${element.mainFeatures.chipSet},<br>
            displaySize: ${element.mainFeatures.displaySize},<br>
            memory: ${element.mainFeatures.memory}.<br>
            <span id="dots">...</span>
          <span id="more" style="display: none;">
            Sensors:${element.mainFeatures.sensors.toString()}<br>
            Others:<br>
            Bluetooth: ${element.others.Bluetooth},<br> 
            GPS: ${element.others.GPS},<br> 
            NFC: ${element.others.NFC},<br> 
            Radio: ${element.others.Radio},<br> 
            USB: ${element.others.USB},<br> 
            WLAN: ${element.others.WLAN}.<br> 
        </span>
      </p>
            <button onclick="myFunction()" id="myBtn">Read more</button>

        </div>
  `;
  phoneDetail.appendChild(div);
};

function myFunction() {
  var dots = document.getElementById("dots");
  var moreText = document.getElementById("more");
  var btnText = document.getElementById("myBtn");

  if (dots.style.display === "none") {
    dots.style.display = "inline";
    btnText.innerHTML = "Read more";
    moreText.style.display = "none";
  } else {
    dots.style.display = "none";
    btnText.innerHTML = "Read less";
    moreText.style.display = "inline";
  }
}
