//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("crear-perfil").addEventListener("click", function(e) {
        let perfil = {};

        perfil.nombre = document.getElementById("nombre").value;
        perfil.apellido = document.getElementById("apellido").value; 
        perfil.edad = document.getElementById("edad").value; 
        perfil.email = document.getElementById("email").value; 
        perfil.telefono = document.getElementById("telefono").value; 

        
        localStorage.setItem("datos-guardados", JSON.stringify(perfil));
    });

    if (localStorage.getItem("datos-guardados")){
        let perfil = JSON.parse(localStorage.getItem("datos-guardados"));
        
        document.getElementById("nombre").value  =perfil.nombre;
        document.getElementById("apellido").value=perfil.apellido;
        document.getElementById("edad").value=perfil.edad;
        document.getElementById("email").value=perfil.email;
        document.getElementById("telefono").value=perfil.telefono;
    };

});

