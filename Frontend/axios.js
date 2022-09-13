

let marcos = [];

document.addEventListener('DOMContentLoaded', () => {
    const imagesMosaic = document.getElementById('imagesMosaic')
    const boton = document.getElementById("but")
    const url_marcos = 'http://127.0.0.1:8000/marcos/'




    axios.get(url_marcos, {
        crossDomain: true
    }).then(res => {
        // console.log(res.data)
        marcos = res.data.results;
        console.log(marcos);
        imagesMosaic.innerHTML = '';
        marcos.map(marco => {
            let marcoIMG = document.createElement('img')
            let btn = document.createElement('button')
            marcoIMG.setAttribute("class", "img_get_marco")
            marcoIMG.setAttribute("src", "data:image/png;base64," + marco.imagen)
            btn.setAttribute("class", "btn_get_marco")
            // btn.setAttribute('onclick', "document.getElementById('myImage').src='" + marco.imagen + "'");
            btn.onclick = () => {
                document.getElementById('myImage').src = "marco.imagen";
                console.log("data:image/png;base64," + marco.imagen);
                let img = new Image,
                    src = "data:image/png;base64," + marco.imagen; // insert image url here

                img.crossOrigin = "anonymous";
                img.onload = function () {
                    let container = document.getElementById("image-wrap");
                    let oldImage = document.getElementById("myImage");
                    oldImage.parentNode.removeChild(oldImage);
                    container.appendChild(img)
                }
                img.src = src;
                img.setAttribute("id", "myImage")
                img.setAttribute("class", "img-marco")

            }
            // btn.setAttribute('onclick', "document.getElementById('myImage').crossorigin='anonymous'");
            btn.appendChild(marcoIMG);
            imagesMosaic.appendChild(btn);
        })

    }).catch(err => console.log(err))

})


// const crearNueva = (marco) => {
//     marco =
//     document.getElementById('myImage').src='" + marco.imagen + "'
// }


