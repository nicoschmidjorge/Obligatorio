//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var usersArray = [];

function validateUser(array, userIn, passwordIn) { 
    for (let i = 0; i < array.length; i++) {
        let usuario = array[i];
        if (usuario.email == userIn && usuario.password == passwordIn){
            return true;
        }
    }

    return false;
} 


document.addEventListener("DOMContentLoaded", function(e){

    document.getElementById("boton-ingresar").addEventListener("click", function(e) {

        
        let entradaPassword = document.getElementById("entradaPassword");


        let entradaEmail = document.getElementById("entradaEmail").value;
        localStorage.setItem('Usuario',entradaEmail);


        
        let camposCompletos = true;
        
        if (entradaEmail.value === '') {
            entradaEmail.classList.add("invalid");
            camposCompletos = false;
        }

        if (entradaPassword.value === ''){
            entradaPassword.classList.add("invalid");
            camposCompletos = false;
        }

        if (camposCompletos) {

            window.location.href = "nuevoindex.html";



            
            getJSONData(USUARIOS_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    usersArray = resultObj.data;
        
                    if ( validateUser(usersArray, entradaEmail.value, entradaPassword.value) ){

                        localStorage.setItem('usuario-logeado', JSON.stringify({ email: entradaEmail.value}));

                        window.location = 'nuevoindex.html';
                    }
                    
                    else{
                        alert("Usuario o contraseña incorrectas!");
                    
                    }
                }
            });

        }else{
            alert("Debes ingresar los datos!")
            
        }
        
        
    });
});