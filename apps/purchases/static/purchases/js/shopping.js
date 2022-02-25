const validateQuantity = (input) => {
    const max = input.max;
    const value = parseInt(input.value) || "";
    if(value > max){
        addNotiBox("El valor máximo de ladrillos que puedes comprar es de: " + max);
        input.value = max;
    }
    else if(value < 0 || value == ""){
        input.value = 0;
    }
}

const decrementQuantity = (button) => {
    const input = button.nextElementSibling;
    if(parseInt(input.value) > 0){
        input.value--;
    }
}

const incrementQuantity = (button) => {
    const input = button.previousElementSibling;
    const max = input.max;
    if(parseInt(input.value) < max){
        input.value++;
    }
}