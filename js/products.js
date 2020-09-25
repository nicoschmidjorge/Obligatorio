//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function sortCategories(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_NAME)
    {
        result = array.sort(function(a, b) {
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_NAME){
        result = array.sort(function(a, b) {
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}




//------------------------------ENTREGA 2------------------------------------


var autosArray = [];

var minPrecio = undefined;
var maxPrecio = undefined;

function verAuto(id){
    localStorage.setItem('libro', JSON.stringify({ libroId: id}));
    window.location = 'product-info.html';
}


function showAutos (){
    let contenido = "";
    for (let i = 0; i < autosArray.length; i++){
        let auto = autosArray[i];

        if (((minPrecio == undefined) || (minPrecio != undefined && parseInt(auto.cost) >= minPrecio)) &&
        ((maxPrecio == undefined) || (maxPrecio != undefined && parseInt (auto.cost) <= maxPrecio))) {
            contenido += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + auto.imgSrc + `" alt="` + auto.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ auto.name +`</h4>
                            <small class="text-muted">` + auto.soldCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + auto.description + `</p>
                        <br>
                        <p class="mb-1">` + 'Precio: ' + auto.cost + ' ' + auto.currency + `</p>
                    </div>
                </div>
            </a>`
           
            

        }
       document.getElementById("listado").innerHTML = contenido;
    }
}

function sortAndShowAutos(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortCategories(currentSortCriteria, currentProductsArray);

    
    showAutos();
}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            autosArray = resultObj.data;
            sortAndShowAutos(ORDER_ASC_BY_NAME,autosArray);
        }
    });

    document.getElementById("mayor-precio").addEventListener("click", function(){
        sortAndShowAutos(ORDER_ASC_BY_NAME);
    });

    document.getElementById("menor-precio").addEventListener("click", function(){
        sortAndShowAutos(ORDER_DESC_BY_NAME);
    });

    document.getElementById("mayor-importancia").addEventListener("click", function(){
        sortAndShowAutos(ORDER_BY_PROD_COUNT);
    });


    minPrecio = undefined;
    maxPrecio = undefined;

    showAutos();

});

document.getElementById("boton-filtrar").addEventListener("click", function() {
    
    minPrecio = document.getElementById("Caja-min").value;
    maxPrecio = document.getElementById("Caja-max").value;

    if ((minPrecio != undefined) &&(minPrecio != "") && (parseInt(minPrecio)) >= 0){
        minPrecio = parseInt(minPrecio);
    }    
    else{
        minPrecio = undefined;
    }

    if ((maxPrecio != undefined) &&(maxPrecio != "") && (parseInt(maxPrecio)) >= 0){
        maxPrecio = parseInt(maxPrecio);
    }    
    else{
        maxPrecio = undefined;
    }

    showAutos(autosArray);

});

document.getElementById("boton-limpiar").addEventListener("click", function() {
    
    document.getElementById("Caja-min").value = "";
    document.getElementById("Caja-max").value = "";

    minPrecio = undefined;
    maxPrecio = undefined;

    showAutos(autosArray);

});



