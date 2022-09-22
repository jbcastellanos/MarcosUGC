// import APIPREFIX from axios


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

function downloadimagesmall(event) {
    event.preventDefault()

    var container = document.getElementById("image-wrap"); /*specific element on page*/
   
    html2canvas(container, { allowTaint: true, scale: 4/5, }).then(function (canvas) {
        let link = document.createElement("a");
        document.body.appendChild(link);
        // document.body.append(canvas)
        link.download = "Imagen_ugc.jpg";
        console.log(canvas.childNodes)
        link.href = canvas.toDataURL();
        // link.href = canvas.toDataURL('image/jpeg', 1.0);
        link.target = '_blank';
        link.click();
        createRegistro(marcoSeleccionado)
    });
}




function downloadimagemedium(event) {
    event.preventDefault()

    var container = document.getElementById("image-wrap"); /*specific element on page*/
   
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
        createRegistro(marcoSeleccionado)
    });
}

function downloadimagelarge(event) {
    event.preventDefault()

    var container = document.getElementById("image-wrap"); /*specific element on page*/
   
    html2canvas(container, { allowTaint: true, scale: 1, }).then(function (canvas) {
        let link = document.createElement("a");
        document.body.appendChild(link);
        // document.body.append(canvas)
        link.download = "Imagen_ugc.jpg";
        console.log(canvas.childNodes)
        link.href = canvas.toDataURL();
        // link.href = canvas.toDataURL('image/jpeg', 1.0);
        link.target = '_blank';
        link.click();
        createRegistro(marcoSeleccionado)
    });
}

const createRegistro = (marcoId) => {
    // axios.post('')
    console.log(APIPREFIX);
    console.log(marcoId);
    const formData = new FormData();
    formData.append('marco', marcoId);
    axios.post(APIPREFIX + '/registros/',formData, {
        responseType: 'json'
    })
    .then(response => {
        console.log(response.data);
        return null
    })
    .catch(error => {

    })
    // axios({
    //     method: 'post',
    //     url: APIPREFIX + '/registros/',
    //     data: {
    //         marco: marcoId
    //     }
    // })

}


