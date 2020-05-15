window.addEventListener("load", function() {
    let contribute = document.querySelector(".contribute");
    let donacion = document.querySelector(".donacion");

    contribute.addEventListener("click", function() {
        donacion.innerHTML = '<u">¿Cuanto dinero deseas aportar?</u><input style="margin:0px 20px" name="donacion" placeholder="Ej:100000"></input><button type="submit" class"aportar">Aportar</button>'
    })
})