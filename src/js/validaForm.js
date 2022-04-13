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


















