/* QUuantidade de itens no modal */
let cart = [];
let modalQt = 1;
let modalKey = 0;

/* Query Selector */
const c = (el) => document.querySelector(el);
/* Query selector All */
const cs = (el) => document.querySelectorAll(el);

/* Listagem das roupas */

clotherJson.map((item, index) => {
  let clotherItem = document
    .querySelector(".models .clother-item ")
    .cloneNode(true);
  /* Setando o key da lista de roupas roupas */
  clotherItem.setAttribute("data-key", index);

  clotherItem.querySelector(".clother-item--img img").src = item.img;
  clotherItem.querySelector(".clother-item--name").innerHTML = item.name;
  clotherItem.querySelector(".clother-item--desc").innerHTML = item.description;
  clotherItem.querySelector(
    ".clother-item--price"
  ).innerHTML = `R$ ${item.price.toFixed(2)}`;
  clotherItem.querySelector("a").addEventListener("click", (e) => {
    e.preventDefault();
    let key = e.target.closest(".clother-item").getAttribute("data-key");
    modalQt = 1;
    modalKey = key;

    /* Preenchendo as informações no modal */
    c(".clotherBig img").src = clotherJson[key].img;
    c(".clotherInfo h1").innerHTML = clotherJson[key].name;
    c(".clotherInfo--desc").innerHTML = clotherJson[key].description;
    c(".clotherInfo--actualPrice").innerHTML = `R$ ${clotherJson[
      key
    ].price.toFixed(2)}`;
    c(".clotherInfo--size.selected").classList.remove("selected");

    cs(".clotherInfo--size").forEach((size, sizeIndex) => {
      if (sizeIndex == 1) {
        size.classList.add("selected");
      }
      size.querySelector("span").innerHTML = clotherJson[key].sizes[sizeIndex];
    });

    c(".clotherInfo--qt").innerHTML = modalQt;

    c(".clotherWindowArea").style.opacity = 0.5;
    c(".clotherWindowArea").style.display = "flex";
    setTimeout(() => {
      c(".clotherWindowArea").style.opacity = 1;
    }, 200);
  });

  c(".clother-area").append(clotherItem);
});

/* Evento Modal */
/* Fechar Modal */
function closeModal() {
  c(".clotherWindowArea").style.opacity = 0;
  setTimeout(() => {
    c(".clotherWindowArea").style.display = "none";
  }, 500);
}
cs(".clotherInfo--cancelButton , clotherInfo--cancelMobileButton").forEach(
  (item) => {
    item.addEventListener("click", closeModal);
  }
);

/* Ajuste da quantidade */

c(".clotherInfo--qtmenos").addEventListener("click", () => {
  if (modalQt > 1) {
    modalQt--;
    c(".clotherInfo--qt").innerHTML = modalQt;
  }
});

c(".clotherInfo--qtmais").addEventListener("click", () => {
  modalQt++;
  c(".clotherInfo--qt").innerHTML = modalQt;
});

/* Ajuste no tamanho das roupas */

cs(".clotherInfo--size").forEach((size, sizeIndex) => {
  size.addEventListener("click", (e) => {
    c(".clotherInfo--size.selected").classList.remove("selected");
    size.classList.add("selected");
  });
});

c('.clotherInfo--addButton').addEventListener('click', ()=>{
    let size = parseInt(c('.clotherInfo--size.selected').getAttribute('data-key'));
    let identifier = clotherJson[modalKey].id+'@'+size;
    let key = cart.findIndex((item)=>item.identifier == identifier);
    if(key > -1) {
        cart[key].qt += modalQt;
    } else {
        cart.push({
            identifier,
            id:clotherJson[modalKey].id,
            size,
            qt:modalQt
        });
    }
    updateCart();
    closeModal();
});

function updateCart() {


  if(cart.length > 0) {
    let subtotal = 0;
    let desconto = 0;
    let total = 0;
    c('.cart').innerHTML=''

      for(let i in cart) {
          let clotherItem = clotherJson.find((item)=>item.id === cart[i].id);
          subtotal += clotherItem.price * cart[i].qt;

          let cartItem = c('.models .cart--item').cloneNode(true);

          let clotherSizeName;
          switch(cart[i].size) {
              case 0:
                  clotherSizeName = 'P';
                  break;
              case 1:
                  clotherSizeName = 'M';
                  break;
              case 2:
                  clotherSizeName = 'G';
                  break;
          }
          let clotherName = `${clotherItem.name} (${clotherSizeName})`;

          cartItem.querySelector('img').src = clotherItem.img;
          cartItem.querySelector('.cart--item-name').innerHTML = clotherName;
          cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
          cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', ()=>{
              if(cart[i].qt > 1) {
                  cart[i].qt--;
              } else {
                  cart.splice(i, 1);
              }
              updateCart();
          });
          cartItem.querySelector('.cart--item-qtmais').addEventListener('click', ()=>{
              cart[i].qt++;
              updateCart();
          });

          c('.cart').append(cartItem);
      }

      desconto = subtotal * 0.1;
      total = subtotal - desconto;

      c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
      c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
      c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

  } else{
    c('.offcanvas','.offcanvas-end ').classList.remove('show')
    c('.modal-backdrop' ,'fade').classList.remove('show')
  }


}
function finish() {
  return  c('.cart--finalizar').addEventListener(alert('Preencher os dados do formulario de contato'))
}
