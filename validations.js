document.addEventListener('DOMContentLoaded', ()=> {

    // Global variables
    const form = document.querySelector('form');
    // const elements = form.elements;
    // const button = document.getElementById('submitButton');

    // Validation functions

    const nameValidate = (e)=> {
        if (form.name.value == 0) {
            alert('Completa el campo nombre')
            e.preventDefault();
        } else {
            if (typeof form.name.value == "string") {
                alert('Has ingresado texto')
            } else {
                alert('Por favor ingresa solo letras sin caracteres especiales o números')
            }
        }
    }

    const phoneValidate = (e)=> {
        if (form.phoneNumber.value == 0) {
            alert('Completa el campo teléfono')
            e.preventDefault();
        }
    }

    const emailValidate = (e)=> {
        if (form.email.value == 0) {
            alert('Completa el campo email')
            e.preventDefault();
        } else {
            if (typeof form.email.value == "email") {
                alert('Has ingresado correo')
            } else {
                alert('Por favor ingresa un correo electrónico válido')
            }
        }
    }

    const validate = (e)=> {
        nameValidate(e);
        phoneValidate(e);
        emailValidate(e);
    }


    form.addEventListener('submit', validate);

})