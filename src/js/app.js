let clotherJson = [
  {id:1, name:'Roupa 1', img:'../public/img/roupa-1.png', price:20.19, sizes:['P', 'M', 'G'], description:'LOREM'},
  {id:2, name:'Roupa 2', img:'../public/img/roupa-2.png', price:18.00, sizes:['P', 'M', 'G'], description:'LOREM'},
  {id:3, name:'Roupa 3', img:'../public/img/roupa-3.png', price:17.45, sizes:['P', 'M', 'G'], description:'LOREM'},
  {id:4, name:'Roupa 4', img:'../public/img/roupa-4.png', price:19.77, sizes:['P', 'M', 'G'], description:'LOREM'},
  {id:5, name:'Roupa 5', img:'../public/img/roupa-5.png', price:21.43, sizes:['P', 'M', 'G'], description:'LOREM'},
  {id:6, name:'Roupa 6', img:'../public/img/roupa-6.png', price:18.55, sizes:['P', 'M', 'G'], description:'LOREM'},
  {id:7, name:'Roupa 7', img:'../public/img/roupa-7.png', price:22.36, sizes:['P', 'M', 'G'], description:'LOREM'},
  {id:8, name:'Roupa 8', img:'../public/img/roupa-8.png', price:22.36, sizes:['P', 'M', 'G'], description:'LOREM'},

];
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
let textArea = document.querySelector('.text__area')


let Validator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');

        Validator.clearErrors();

        for (let i = 0; i < inputs.length; i++) {
            let input = inputs[i];
            let check = Validator.checkInput(input);
            if (check !== true) {
                send = false;
                Validator.showError(input, check);
            } else {

            }
        }

        if (send) {
            alert('cadastro realizado')
            form.reset();
        }
    },

    
    showError: (input, error) => {
        input.style.borderColor = '#FF0000';
       

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
       

        
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input');
   

        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }


        let errorElements = document.querySelectorAll('.error');
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    },





    checkInput: (input) => {
        let rules = input.getAttribute('data-rules');

        if (rules !== null) {
            rules = rules.split('|');
            for (let k in rules) {
                let rDetails = rules[k].split('=');
                switch (rDetails[0]) {
                    case 'required':
                        if (input.value == '') {
                            return 'Campo não pode ser vazio.';
                        }
                        break;
                    case 'min':
                        if (input.value.length < rDetails[1]) {
                            return 'Campo tem que ter pelo menos ' + rDetails[1] + ' caractes';
                        }
                        break;
                    case 'mintel':
                        if (input.value.length < rDetails[1]) {
                            return 'Telefone Incompleto '  ;
                        }
                        break;
                    case 'email':
                        if (input.value != '') {
                            let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'E-mail digitado não é válido!';
                            }
                        }
                        break;
                    case 'uf':
                        if (input.value != '') {
                            let regex = /^[a-zA-Z]+$/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'uf invalido';
                            }
                        }
                        break;
/*                     case 'tel':
                        if ($('.phone_with_ddd').mask('(00) 0000-0000');) {
                            let regex = /^(?:\+)[0-9]{2}\s?(?:\()[0-9]{2}(?:\))\s?[0-9]{4,5}(?:-)[0-9]{4}$/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'Numero de telefone não é valido';
                            }
                        }
                        break; */
/*                     case 'cep':
                        if (input.value === '') {
                            let regex = /^([\d]{2})\.*([\d]{3})-*([\d]{3})/;
                            if (!regex.test(input.value.toLowerCase())) {
                                return 'Campo tem que ter pelo menos ' + rDetails[1] + ' caractes com o "-"';
                            }
                        }
                        break; */
                }
            }
        }

        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = '#FF0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for (let i = 0; i < errorElements.length; i++) {
            errorElements[i].remove();
        }
    }
};
/* Jquery mask */

$('.cep').mask('00000-000');
$('.phone_with_ddd').mask('(00) 0000-00000');
$('.alpha-no-spaces').mask("A", {
	translation: {
		"A": { pattern: /[\w@\-.+]/, recursive: true }
	}
});
let form = document.querySelector('.Validator');
form.addEventListener('submit', Validator.handleSubmit);


















