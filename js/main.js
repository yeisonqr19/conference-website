(function () {
    'use-strict';

    var regalo = document.getElementById('regalo');
    document.addEventListener('DOMContentLoaded', function () {

        //para agregar el mapa a la pagina principal
        if (document.getElementById('mapa')) {
            var map = L.map('mapa').setView([10.430564, -75.535759], 17);

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.marker([10.430564, -75.535759]).addTo(map)
                .bindPopup('Direccion de la Empresa')
                .openPopup();

        }
        //campos datos de usuario
        let nombre = document.getElementById('nombre');
        let apellido = document.getElementById('apellido');
        let correo = document.getElementById('correo');

        //campo de los pases
        let pase_dia = document.getElementById('pase_dia');
        let pase_2dias = document.getElementById('pase_2dias');
        let pase_completo = document.getElementById('pase_completo');

        //Botones y Divs
        let Calcular = document.getElementById('Calcular');
        let errorDiv = document.getElementById('error');
        let botonRegistro = document.getElementById('btnRegistro');
        let listaProductos = document.getElementById('lista_productos');
        let total = document.getElementById('suma_total');

        //Extras
        let etiquetas = document.getElementById('etiquetas');
        let camisas = document.getElementById('camisa_evento');


        //para mostrar los cursos dependiendo del dia que se escoja hago:
        pase_dia.addEventListener('blur', mostrarDias);
        pase_2dias.addEventListener('blur', mostrarDias);
        pase_completo.addEventListener('blur', mostrarDias);

        //validar el formulario de contacto
        nombre.addEventListener('blur', validacion);
        apellido.addEventListener('blur', validacion);
        correo.addEventListener('blur', validacion);
        correo.addEventListener('blur', validarEmail);

        function validacion() {
            if (this.value === '') {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = 'Todos los campos son obligatorios';
                this.focus;
                this.style.border = '0.1rem solid red';
            } else {
                errorDiv.style.display = 'none';
                this.style.border = '0.1rem solid #cccccc';
            }
        }

        function validarEmail() {
            if (this.value.indexOf('@') != -1) {
                errorDiv.style.display = 'none';
                this.style.border = '0.1rem solid #cccccc';
            } else {
                errorDiv.style.display = 'block';
                errorDiv.innerHTML = 'Ingrese un email valido';
                this.focus;
                this.style.border = '0.1rem solid red';
            }
        }

        //boton calcular:
        Calcular.addEventListener('click', calcularMonto);

        function calcularMonto(event) {
            event.preventDefault();

            if (regalo.value === '') {
                alert('Debe Escoger Un Regalo!');
                regalo.focus;
            } else {
                let boletoDia = parseInt(pase_dia.value, 10) || 0;
                let boleto2Dias = parseInt(pase_2dias.value, 10) || 0;
                let boletoCompleto = parseInt(pase_completo.value, 10) || 0;
                let cantCamisas = parseInt(camisas.value, 10) || 0;
                let cantEtiquetas = parseInt(etiquetas.value) || 0;

                let totalPagar = (boletoDia * 30) + (boleto2Dias * 45) + (boletoCompleto * 50) + ((cantCamisas * 10) * 0.93) + (cantEtiquetas * 2);

                let listadoProductos = [];

                //listado de boletos para el resumen.

                if (boletoDia != 0) {
                    listadoProductos.push(`numero de boletos de un dia: ${boletoDia}`);
                }
                if (boleto2Dias != 0) {
                    listadoProductos.push(`Numero de boletos de dos dias: ${boleto2Dias}`);
                }
                if (boletoCompleto != 0) {
                    listadoProductos.push(`numero de boletos de todos los dias: ${boletoCompleto}`);
                }

                if (cantCamisas != 0) {
                    listadoProductos.push(`Numero de camisetas: ${cantCamisas}`);
                }

                if (cantEtiquetas != 0) {
                    listadoProductos.push(`numero de etiquetas: ${cantEtiquetas}`);
                }

                listaProductos.style.display = "block";
                listaProductos.innerHTML = '';
                for (var i = 0; i < listadoProductos.length; i++) {

                    listaProductos.innerHTML += listadoProductos[i] + '<br/>';
                }
                total.innerHTML = `$ ${totalPagar.toFixed(2)} usd`;
            }
        }

        function mostrarDias() {
            let boletoDia = parseInt(pase_dia.value, 10) || 0;
            let boleto2Dias = parseInt(pase_2dias.value, 10) || 0;
            let boletoCompleto = parseInt(pase_completo.value, 10) || 0;

            let diasElegido = [];

            if (boletoDia != 0) {
                diasElegido.push('viernes');
            }

            if (boleto2Dias != 0) {
                diasElegido.push('viernes', 'sabado');
            }

            if (boletoCompleto != 0) {
                diasElegido.push('viernes', 'sabado', 'domingo');
            }

            for (var i = 0; i < diasElegido.length; i++) {
                document.getElementById(diasElegido[i]).style.display = 'block';
            }

        }
    }); //CIERRE DOM CONTENT LOADED
})();

//jQuery:

$(document).ready(function () {
    'use-strict';

    //Programa de conferencias:
    //esto es para hacer el efecto de ir cambiando los menus en (conferencias, talleres y eventos).
    $('.programa-evento .info-curso:first').show();
    $('nav.menu-programa a:first').addClass('activo');
    $('nav.menu-programa a:first').addClass('chulo-seleccion');

    $('.menu-programa a').on('click', function () {
        //esto es para saber que enlace del menu esta activo:
        $('.menu-programa a').removeClass('activo');
        $('.menu-programa a').removeClass('chulo-seleccion');
        $(this).addClass('activo');
        $(this).addClass('chulo-seleccion');

        $('.ocultar').hide();
        let enlace = $(this).attr('href');
        $(enlace).fadeIn(1000);

        return false;
    })

})