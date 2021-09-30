//==============================================Image Change SetInterval===============================================
window.addEventListener("load", setImageTime);

function setImageTime() {
  let playHtml = "";
  playHtml += `
    <i id="pBtn" class="fas fa-pause-circle"></i>
    `;
  document.getElementById("buttonCtrl").innerHTML = playHtml;
  Btncount = 0;
  let image = document.getElementById("changeImage");
  let currentPos = 0;
  let img = [
    "https://cdn-fsly.yottaa.net/5d669b394f1bbf7cb77826ae/www.bathandbodyworks.com/v~4b.160/on/demandware.static/-/Sites-BathAndBodyWorks-Library/default/dw77da7ae3/images/Fall2021/diff_2pk-flash_650_fa2_hm_to_3.jpg?yocs=s_",
    "https://cdn-fsly.yottaa.net/5d669b394f1bbf7cb77826ae/www.bathandbodyworks.com/v~4b.160/on/demandware.static/-/Sites-BathAndBodyWorks-Library/default/dw691b5f1a/images/Fall2021/diff_2pk-flash_650_fa2_hm_to_2.jpg?yocs=s_",
    "https://cdn-fsly.yottaa.net/5d669b394f1bbf7cb77826ae/www.bathandbodyworks.com/v~4b.160/on/demandware.static/-/Sites-BathAndBodyWorks-Library/default/dw00bd3b2a/images/Fall2021/diff_2pk-flash_650_fa2_hm_to_4.jpg?yocs=s_",
    "https://cdn-fsly.yottaa.net/5d669b394f1bbf7cb77826ae/www.bathandbodyworks.com/v~4b.160/on/demandware.static/-/Sites-BathAndBodyWorks-Library/default/dw516381b1/images/Fall2021/diff_2pk-flash_650_fa2_hm_to_5.jpg?yocs=s_",
  ];

  function volgendefoto() {
    if (++currentPos >= img.length) currentPos = 0;
    image.src = img[currentPos];
  }

  var timeImage = setInterval(volgendefoto, 2000);

  document.getElementById("pBtn").addEventListener("click", stopTimmer);

  var Btncount = 0;

  function stopTimmer() {
    let html = "";
    Btncount++;
    console.log(Btncount);
    if (Btncount > 1) {
      Btncount = 0;
    }
    if (Btncount == 0) {
      console.log("Play");
      timeImage = setInterval(volgendefoto, 2000);
    }
    if (Btncount == 1) {
      console.log("Pause");
      clearInterval(timeImage);
      html += `
                <i id="pBtn" class="far fa-play-circle" onclick="setImageTime()"></i>
            `;
      document.getElementById("buttonCtrl").innerHTML = html;
    }
  }
}
window.addEventListener("load", getNewProducts);

function getNewProducts() {
  let pageCount = 1;

  if (pageCount == 1) {
    document.getElementById("pNavBtn1").style.display = "none";
    document.getElementById("pNavBtn2").style.display = "block";
  }

  document.getElementById("pNavBtn2").addEventListener("click", function () {
    pageCount++;
    if (pageCount > 2) {
      pageCount = 3;
      fetch(
        `https://bath-and-body-mock-server.herokuapp.com/Fresh?_page=${pageCount}&_limit=3`
      )
        .then((response) => response.json())
        .then((data) => displayNewItem(data))
        .catch((error) => error);
      document.getElementById("pNavBtn1").style.display = "block";
      document.getElementById("pNavBtn2").style.display = "none";
    } else {
      fetch(
        `https://bath-and-body-mock-server.herokuapp.com/Fresh?_page=${pageCount}&_limit=3`
      )
        .then((response) => response.json())
        .then((data) => displayNewItem(data))
        .catch((error) => error);
      document.getElementById("pNavBtn1").style.display = "block";
      document.getElementById("pNavBtn2").style.display = "block";
    }
  });

  document.getElementById("pNavBtn1").addEventListener("click", function () {
    pageCount--;
    console.log(pageCount);
    if (pageCount == 1 || pageCount < 1) {
      pageCount = 1;
      fetch(
        `https://bath-and-body-mock-server.herokuapp.com/Fresh?_page=${pageCount}&_limit=3`
      )
        .then((response) => response.json())
        .then((data) => displayNewItem(data))
        .catch((error) => error);
      document.getElementById("pNavBtn1").style.display = "none";
      document.getElementById("pNavBtn2").style.display = "block";
    } else {
      fetch(
        `https://bath-and-body-mock-server.herokuapp.com/Fresh?_page=${pageCount}&_limit=3`
      )
        .then((response) => response.json())
        .then((data) => displayNewItem(data))
        .catch((error) => error);
      document.getElementById("pNavBtn1").style.display = "block";
      document.getElementById("pNavBtn2").style.display = "block";
    }
  });
  fetch(
    `https://bath-and-body-mock-server.herokuapp.com/Fresh?_page=1&_limit=3`
  )
    .then((response) => response.json())
    .then((data) => displayNewItem(data))
    .catch((error) => console.log(error));

  function displayNewItem(data) {
    let html = "";

    for (i in data) {
      let id = data[i].id;
      let img = data[i].img;
      let name = data[i].name;
      let shr_Desc = data[i].Short_Description;
      let price = data[i].price;
      let desc = data[i].Description;

      html += `
            <div id="displayProduct_Card">
                <div id="card_image" onmouseover="quickViewIn(${id})" onmouseout="quickViewOut(${id})">
                    <img src="${img}" class="img" alt="">
                </div>
                <div class="card_info">
                    <p class="card_info_para">${name}</p>
                    <p class="card_info_para_desc">${shr_Desc}</p>
                </div>
                <button onclick="addToCart(${id})" class="card_AddCartBtn">ADD TO BAG</button>
                <div class="flat" id="quickViewDiv" onclick="getProductDetails(${id})" onmouseover="quickViewIn(${id})" onmouseout="quickViewOut(${id})">
                    <i class="fas fa-eye">
                        <p>Quicklook</p>
                    </i>
                </div>
            </div>
            `;
    }
    document.getElementById("displayProduct").innerHTML = html;
  }
}
//===============================================Adding Data to LocalStorage======================================================
let arr = [];
function addToCart(val) {
  console.log("val");
  let id = val;
  fetch(`https://bath-and-body-mock-server.herokuapp.com/Fresh?id=${id}`)
    .then((response) => response.json())
    .then((data) => getProductDetailsCart(data))
    .catch((error) => console.log(error));

  function getProductDetailsCart(data) {
    let html = "";
    let id = data[0].id;
    let name = data[0].name;
    let img = data[0].img;
    let price = data[0].Price;
    let shr_Desc = data[0].Short_Description;
    let count = data[0].count;
    let total = data[0].totalP;
    console.log(total);
    let temp = {};
    temp.id = id;
    temp.name = name;
    temp.img = img;
    temp.price = price;
    temp.desc = shr_Desc;
    temp.count = count;
    temp.total = total;

    console.log(temp);
    arr = [...arr, temp];
    localStorage.setItem("cart", JSON.stringify(arr));
    let modal1 = document.getElementById("myModal1");
    let span1 = document.getElementsByClassName("close1")[0];
    modal1.style.display = "block";
    span1.onclick = function () {
      modal1.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == modal1) {
        modal1.style.display = "none";
      }
    };

    html += `
        <div class="cartAdd">
            <h3>Item Added to Cart</h3>
            <div class="imageBox">
                <img src="https://media.tenor.com/images/b95474b4e57295c82fb7ffc3b882e683/tenor.gif" class="img" alt="">
            </div>
        </div>
        `;
    document.getElementById("cartAddModal").innerHTML = html;
  }
}
