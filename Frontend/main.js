
document.addEventListener('DOMContentLoaded', () => {

    // Input File
    const inputImage = document.querySelector('#image');
    // Nodo donde estará el editor
    const editor = document.querySelector('#editor');
    // El canvas donde se mostrará la previa
    const miCanvas = document.querySelector('#preview');
    // Contexto del canvas
    const contexto = miCanvas.getContext('2d');
    // Ruta de la imagen seleccionada
    let urlImage = undefined;
    // Evento disparado cuando se adjunte una imagen
    inputImage.addEventListener('change', abrirEditor, false);

    /**
     * Método que abre el editor con la imagen seleccionada
     */
    function abrirEditor(e) {
        // Obtiene la imagen
        urlImage = URL.createObjectURL(e.target.files[0]);

        // Borra editor en caso que existiera una imagen previa
        editor.innerHTML = '';
        let cropprImg = document.createElement('img');
        cropprImg.setAttribute('id', 'croppr');
        editor.appendChild(cropprImg);

        // Limpia la previa en caso que existiera algún elemento previo
        contexto.clearRect(0, 0, miCanvas.width, miCanvas.height);

        // Envia la imagen al editor para su recorte
        document.querySelector('#croppr').setAttribute('src', urlImage);

        // Crea el editor
        new Croppr('#croppr', {
            aspectRatio: 1,
            startSize: [70, 70],
            onCropEnd: recortarImagen
        })
    }

    /**
     * Método que recorta la imagen con las coordenadas proporcionadas con croppr.js
     */
    function recortarImagen(data) {
        // Variables
        const inicioX = data.x;
        const inicioY = data.y;
        const nuevoAncho = data.width;
        const nuevaAltura = data.height;
        const zoom = 1;
        // La imprimo
        miCanvas.width = nuevoAncho;
        miCanvas.height = nuevaAltura;
        // La declaro
        let miNuevaImagenTemp = new Image();
        // Cuando la imagen se carge se procederá al recorte
        miNuevaImagenTemp.onload = function () {
            // Se recorta
            contexto.drawImage(miNuevaImagenTemp, inicioX, inicioY, nuevoAncho * zoom, nuevaAltura * zoom, 0, 0, nuevoAncho, nuevaAltura);
        }
        // Proporciona la imagen cruda, sin editarla por ahora
        miNuevaImagenTemp.src = urlImage;
    }
    
});

function downloadimage() {
    var container = document.getElementById("image-wrap"); /*specific element on page*/
    // let container = document.getElementById("image-wrap").cloneNode(true); /* full page */
    // container.setAttribute("id", "descargable")
    // document.body.appendChild(container);
    // container.setAttribute("style", "width: 500px; height:500px;")
    // console.log(container);
    // console.log(container.childNodes);
    // console.log(container.childNodes.item(3));
    // let marco = container.childNodes.item(1)
    // let canvas2 = container.childNodes.item(3)
    // marco.setAttribute("style", "width: 500px; height:500px;")
    // marco.setAttribute("crossorigin","anonymous")
    // canvas2.setAttribute("style", "width: 500px; height:500px;")
    html2canvas(container, { allowTaint: true, scale: 4/3, }).then(function (canvas) {

        let link = document.createElement("a");
        document.body.appendChild(link);
        // document.body.append(canvas)
        link.download = "Imagen_ugc.jpg";
        console.log(canvas.childNodes)
        link.href = canvas.toDataURL();
        // link.href = canvas.toDataURL('image/jpeg', 1.0);
        link.target = '_blank';
        link.click();
        // document.body.removeChild(container)
    });
}

jQuery.ajax({

    url: 'http://localhost:8080/yourwebsite/servlet?img=' + document.getElementById(id).alt,
    //data: myData,
    type: 'GET',
    crossDomain: true,
    dataType: 'jsonp',
   // success: function() { alert("Success"); },
   // error: function() { alert('Failed!'); },
   // beforeSend: setHeader
});
