//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var currentProductsArray = [];
var comentariosArray = [];
var autosArray =[];


function ShowAuto(array, arrayComments){
    

        console.log(currentProductsArray);
        let auto = currentProductsArray;
        let info = "";
        let imgs = "";
        let comments = "<hr>";

      
            contenido = `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + auto["images"][0] + `" alt=" <br> <hr>` + auto.description + `" class="img-thumbnail">
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
            for(let comment in arrayComments){
                console.log(comment);

                    comments += arrayComments[comment].dateTime + ` `;
                    comments += '<strong>' +  arrayComments[comment].user + '</strong> dice:<br>';
                    comments += '<p>' + arrayComments[comment].description + '</p><br>';
                    for (let i = 1; i <= arrayComments[comment].score ;i++){
                        comments += '<span class="fa fa-star checked"></span>';
                    };
            
                    for (let i = arrayComments[comment].score + 1; i <= 5 ;i++){
                        comments += '<span class="fa fa-star unchecked"></span>';
                    }
                    
                    comments += '<br><hr>'
                    
            }
        

            document.getElementById("contenido").innerHTML = contenido;
            document.getElementById("imagenes").innerHTML = imgs;
            document.getElementById("comentarios").innerHTML = comments;

        

}

function mostrarProdRel(arrayListado, arrayRelacionados){
    let contenido = '<br>';
    arrayRelacionados.forEach(function(i){
        contenido += `
        <a href="product-info.html" class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + arrayListado[i].imgSrc  + `" alt=" <br> <hr>` + arrayListado[i].description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ arrayListado[i].name +`</h4>
                        <small class="text-muted">` + arrayListado[i].soldCount + ` artículos</small>
                    </div>
                    <p class="mb-1">` + arrayListado[i].description + `</p>
                    <br>
                    <p class="mb-1">` + 'Precio: ' + arrayListado[i].cost + ' ' + arrayListado[i].currency + `</p>
                </div>
            </div>
        </a>`
    });

    document.getElementById("autosRelacionados").innerHTML += contenido;

}
/*

contenido = `
<a href="product-info.html" class="list-group-item list-group-item-action">
    <div class="row">
        <div class="col-3">
            <img src="` + arrayListado[i].imgSrc  + `" alt="` + arrayListado[i].description + `" class="img-thumbnail">
        </div>
        <div class="col">
            <div class="d-flex w-100 justify-content-between">
                <h4 class="mb-1">`+ arrayListado[i].name +`</h4>
                <small class="text-muted">` + arrayListado[i].soldCount + ` artículos</small>
            </div>
            <p class="mb-1">` + arrayListado[i].description + `</p>
            <br>
            <p class="mb-1">` + 'Precio: ' + arrayListado[i].cost + ' ' + arrayListado[i].currency + `</p>
        </div>
    </div>
</a>`

*/



document.addEventListener("DOMContentLoaded" , function (e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj){
        if (resultObj.status === "ok"){
            comentariosArray = resultObj.data;
        }
    });

    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            autosArray = resultObj.data;

        }
    });

    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            currentProductsArray = resultObj.data;

            ShowAuto(currentProductsArray, comentariosArray);
            mostrarProdRel(autosArray, currentProductsArray.relatedProducts);
        }
    });

    
});
