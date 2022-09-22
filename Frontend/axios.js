
var pag = 1
let marcos = [];
var url_marcos = 'http://127.0.0.1:8000/api/marcos/v1/marcos/?ordering=-id&page=' + pag + '&page_size=3';
const APIPREFIX = 'http://127.0.0.1:8000/api/marcos/v1'
let marcoSeleccionado = 0;


document.addEventListener('DOMContentLoaded', () => {
    const imagesMosaic = document.getElementById('imagesMosaic')

    axios.get(url_marcos, {
        crossDomain: true
    }).then(res => {
        // console.log(res.data)
        marcos = res.data.results;
        console.log(marcos);
        numMarcos = res.data.count;
        pages = numMarcos / 3;
        pages = Math.ceil(pages)
        console.log("paginas:" + pages);
        imagesMosaic.innerHTML = '';

        if (pages == 1) {
            btnRight.style.visibility = "hidden";
            btnLeft.style.visibility = "hidden";
        }

        if (pag <= 1) {
            btnLeft.style.visibility = "hidden";
            console.log("pag:" + pag);
        }


        marcos.map(marco => {

            let marcoIMG = document.createElement('img')
            let btn = document.createElement('button')
            marcoIMG.setAttribute("class", "img_get_marco")
            marcoIMG.setAttribute("src", "data:image/png;base64," + marco.imagen)
            btn.setAttribute("class", "btn_get_marco")
            // btn.setAttribute('onclick', "document.getElementById('myImage').src='" + marco.imagen + "'");
            btn.onclick = () => {
                // document.getElementById('myImage').src = "marco.imagen";
                // console.log("data:image/png;base64," + marco.imagen);
                marcoSeleccionado = marco.id;
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

            btn.appendChild(marcoIMG);
            imagesMosaic.appendChild(btn);

        })

        return pages, url_marcos;

    }).catch(err => console.log(err))

})

function Next_page() {
    // var start = Date.now();
    pag += 1;
    const btnRight = document.getElementById("btnRight")
    const btnLeft = document.getElementById("btnLeft")
    var url_marcos = APIPREFIX + '/marcos/?ordering=-id&page=' + pag + '&page_size=3';

    if (pag >= pages) {
        btnRight.style.visibility = "hidden";
        btnLeft.style.visibility = "visible";
        pag = pages
    } else {
        btnLeft.style.visibility = "visible";
    }

    axios.get(url_marcos, {
        crossDomain: true
    }).then(res => 
        {
        console.log("ya reesolvi la query")
        // console.log(res.data)
        marcos = res.data.results;
        
        imagesMosaic.innerHTML = '';

        marcos.map(marco => {

            let marcoIMG = document.createElement('img')
            let btn = document.createElement('button')
            marcoIMG.setAttribute("class", "img_get_marco")
            marcoIMG.setAttribute("src", "data:image/png;base64," + marco.imagen)
            btn.setAttribute("class", "btn_get_marco")
            // btn.setAttribute('onclick', "document.getElementById('myImage').src='" + marco.imagen + "'");
            btn.onclick = () => {
                // document.getElementById('myImage').src = "marco.imagen";
                // console.log("data:image/png;base64," + marco.imagen);
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

            btn.appendChild(marcoIMG);
            imagesMosaic.appendChild(btn);

        })



        return pages, url_marcos;

    }).catch(err => console.log(err))


    console.log("pag:" + pag)
    console.log("tiempo total: " + (Date.now() - start));
}

function Preview_page() {
    pag -= 1;
    const btnRight = document.getElementById("btnRight")
    const btnLeft = document.getElementById("btnLeft")
    var url_marcos = APIPREFIX + '/marcos/?ordering=-id&page=' + pag + '&page_size=3';

    if (pag <= 1) {
        btnLeft.style.visibility = "hidden";
        btnRight.style.visibility = "visible";
        pag = 1
    } else {

        btnRight.style.visibility = "visible";
    }

    axios.get(url_marcos, {
        crossDomain: true
    }).then(res => {
        console.log("ya reesolvi la query")
        // console.log(res.data)
        marcos = res.data.results;

        imagesMosaic.innerHTML = '';

        marcos.map(marco => {

            let marcoIMG = document.createElement('img')
            let btn = document.createElement('button')
            marcoIMG.setAttribute("class", "img_get_marco")
            marcoIMG.setAttribute("src", "data:image/png;base64," + marco.imagen)
            btn.setAttribute("class", "btn_get_marco")
            // btn.setAttribute('onclick', "document.getElementById('myImage').src='" + marco.imagen + "'");
            btn.onclick = () => {
                // document.getElementById('myImage').src = "marco.imagen";
                // console.log("data:image/png;base64," + marco.imagen);
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

            btn.appendChild(marcoIMG);
            imagesMosaic.appendChild(btn);

        })

        return pages, url_marcos;

    }).catch(err => console.log(err))

    console.log("pag:" + pag + url_marcos)

    return pag, pages, url_marcos;
}



