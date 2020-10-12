var carritoArray = [];

function calcTotal() {
    let total = 0;
    let subs = document.getElementsByClassName("subtotal");
    for (let i = 0; i < subs.length; i++) {
        total += parseInt(subs[i].innerHTML);
    }
    document.getElementById("total").innerHTML = total;
    calcEnvio()
}


function calcSubtotal(unitCost, i) {

    let count = parseInt(document.getElementById(`count${i}`).value);
    subtotal = count * unitCost;
    document.getElementById(`articuloSubtotal${i}`).innerHTML = subtotal;
    calcTotal();
}



function showArticle(array) {
    let contenido = "";
    for (let i = 0; i < array.length; i++) {
        let articulo = array[i];
        let sub = articulo.unitCost * articulo.count;
        contenido += `
        <tr>
            <td><img src='${articulo.src}' width="50px"></td>
            <td>${articulo.name}</td>

            <td>${articulo.unitCost}</td>

            <td><input style="width:60px;" onchange="calcSubtotal(${articulo.unitCost}, ${i})" 
                type="number" id="count${i}" value="${articulo.count}" min="1"></td>

            <td><span class="subtotal" id="articuloSubtotal${i}" style="font-weight:bold;">${sub}</span></td>

            
        </tr>
        `
      

        document.getElementById("articulo").innerHTML = contenido;
    }
    calcTotal();
}

function calcEnvio() {
    let total = parseInt(document.getElementById("total").innerHTML);
    let envio;

    let elements = document.getElementsByName("envio");
    for (var i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            envio = parseInt(elements[i].value);
        }
    }

    let totalConEnvio = total + envio;

    let contenido = `
    <tr>
        <td>${total}</td>

        <td>${envio}</td>

        <td>${totalConEnvio}</td>

    </tr>
    `

    document.getElementById("totalEnvio").innerHTML = contenido;
}

document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(CART_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            carritoArray = resultObj.data.articles;
            showArticle(carritoArray);
            calcEnvio();
        }
    });
    let elements = document.getElementsByName("envio");
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener("change", function() {
             calcEnvio();
        });
    } 
});