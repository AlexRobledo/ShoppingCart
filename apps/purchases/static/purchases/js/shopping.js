class Property {
    // La clase Property indica una propiedead en venta. Contiene identificador, nombre, cantidad de ladrillos a comprar por el usuario y el precio
    constructor(id, name, quantity, price){
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.price = price;
    }
}

// Lista de objetos Property que simboliza el carrito de compras
let propertiesList = [];

const validateQuantity = (input) => {
    // Valida la cantidad ingresada 
    const max = input.max;
    const value = parseInt(input.value) || "";  // Si viene undefinded, asigna un vacío
    const propertyId = parseInt(input.parentNode.parentNode.parentNode.id);
    if(value > max){    // Si se excede el monto ingresado al máximo que se puede comprar
        addNotiBox("El máximo de ladrillos que puedes comprar es de: " + max);
        input.value = max;
    }
    else if(value < 0 || value == ""){  // Si se usa un número negativo o un valor vacío
        input.value = 0;
    }
    updatePropertiesList(propertyId, parseInt(input.value));   // Actualiza la lista de propiedades
}

const decrementQuantity = (button) => { // Decrementa en 1 la cantidad ingresada en valor para esa propiedad
    const input = button.nextElementSibling;    // Obtiene el siguiente elemento en el DOM
    if(parseInt(input.value) > 0){
        input.value--;
        validateQuantity(input);    // Valida la nueva cantidad
    }
}

const incrementQuantity = (button) => { // Incrementa en 1 la cantidad ingresada en valor para esa propiedad
    const input = button.previousElementSibling;    // Obtiene el elemento anterior en el DOM
    const max = input.max;
    if(parseInt(input.value) < max){
        input.value++;
        validateQuantity(input);    // Valida la nueva cantidad
    }
}

const updatePropertiesList = (propertyid, quantity) => {  // Actualiza la lista de propiedades a adquirir
    let id = parseInt(propertyid);
    let index = searchInPropertiesList(id);
    if(index === -1){   // Si no estaba esa propiedad en la lista
        let property = new Property(id, getPropertyNameInDOM(id), quantity, getPropertyPriceInDOM(id)); // Crea un objeto de tipo propiedad
        propertiesList.push(property);  // Lo añade a la lista de compras
    }
    else {  // Si ese objeto ya existía
        if(quantity > 0){   // Si la cantidad a adquirir es mayor a 0
            propertiesList[index].quantity = quantity;
        }
        else {  // Si es 0 o un número no válido
            propertiesList.splice(index, 1);    // Borra de la lista de compras
        }
    }
}

const searchInPropertiesList = (id) => {    // Busca una propiedad por ID en la lista de compras y devuelve su índice
    for(let i = 0; i < propertiesList.length; i++){
        if(propertiesList[i].id == id.toString())
            return i;
    }
    return -1;  // Si no encuentra la propiedad, devuelve -1
}

const getPropertyNameInDOM = (id) => {  // Obtiene el nombre de la propiedad de acuerdo al DOM
    let article = document.getElementById(id.toString());
    let name = article.getElementsByTagName('h2')[0].innerText;
    return name;
}

const getPropertyQuantityInDOM = (id) => {  // Obtiene la cantidad de ladrillos a adquirir de una propiedad de acuerdo al DOM
    let article = document.getElementById(id.toString());
    let quantity = parseInt(article.getElementsByTagName('input')[0].value);
    return quantity;
}

const getPropertyPriceInDOM = (id) => { // Obtiene el precio por ladrillo de una propiedad de acuerdo al DOM
    let article = document.getElementById(id.toString());
    let price = parseFloat(article.getElementsByTagName('b')[0].innerText);
    return price;
}

const displayPurchaseSummary = () => {  // Añade el carrito de compras a la vista de resumen y lo despliega en la tabla
    $('#mainTbody tr').remove();    // Remueve todas las filas del cuerpo de la tabla
    let tbody = document.getElementById('mainTbody');
    let totalCost = 0;  // Costo total a invertir
    for(let i = 0; i < propertiesList.length; i++){ // Para cada objeto en el carrito de compras
        let row = document.createElement('tr'); // Crea una fila para la table
        row.id = "row_" + propertiesList[i].id.toString();  
        let nameCell = document.createElement('td');    // Celda del nombre de la propiedad
        nameCell.innerText = propertiesList[i].name;
        let priceCell = document.createElement('td');   // Celda del costo por ladrillo
        priceCell.innerText = '$' + propertiesList[i].price.toString();
        let quantityCell = document.createElement('td');    // Celda de la cantidad de ladrillos a adquirir
        quantityCell.innerText = propertiesList[i].quantity.toString();
        let subtotalCell = document.createElement('td');    // Subtotal de cantidad a invertir por propiedad
        let subtotal = propertiesList[i].quantity * propertiesList[i].price;    
        subtotalCell.innerText = '$' + subtotal.toString();
        totalCost += subtotal; 
        row.append(nameCell, priceCell, quantityCell, subtotalCell);
        tbody.append(row);
    }
    let totalCostCell = document.getElementById('total_cost');
    totalCostCell.innerText = '$' + totalCost.toString();
}

const hitCheckout = () => { // Abrir checkout de compras
    if(propertiesList.length < 1){  // Si no se ha agregado nada al carrito
        addNotiBox("Se debe agregar al menos 1 ladrillo para continuar con la compra.");   
        return;
    }
    showTerms();    // Muestra los términos y condiciones
}

const checkout = () => {    // Función en ajax que consulta la API en el servidor para guardar la transacción
    let authToken = $('.dialog-options input[name=csrfmiddlewaretoken]').val(); // El usuario se autentica por token
    showLoader();
    $.ajax({
        data: {
            'csrfmiddlewaretoken': authToken,
            'propertiesList': JSON.stringify(propertiesList)    // Manda la lista de propiedades del carrito en formato JSON
        },
        type: "POST",   // Indica el método a seguir de la API. En este caso POST para un nuevo registro (transacción)
        url: "../Checkout/",    // URL de la API
        success: function(response){    // En caso de que el servidor responda exitosamente
            if(response.success){   // Si el proceso realizado en el servidor fue concluido con éxito
                showReload();   // Muestra pop up de recarga
                addNotiBox(response.success);
            }
            else if(response.error){    // Si el proceso realizado en el servidor tuvo algún error
                hideDialog();   // Oculta pop up
                addNotiBox(response.error);
            }
            hideLoader();
        },
        error: function(response){  // En caso de que el servidor arroje error
            addNotiBox("Algo ha salido mal. Recarga la página e inténtalo nuevamente.");
            hideLoader();
        }
    });
}