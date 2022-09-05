

let marcos = [];

document.addEventListener('DOMContentLoaded', () => {
    const imagesMosaic = document.getElementById('imagesMosaic')
    const boton = document.getElementById("but")
    const url_marcos = 'http://127.0.0.1:8000/marcos/'


    axios({
        method: 'GET',
        url: url_marcos
    }).then(res => {
        // console.log(res.data)
        marcos = res.data.results;
        console.log(marcos);
        imagesMosaic.innerHTML = '';
        marcos.map(marco => {
            let marcoIMG = document.createElement('img')
            let btn = document.createElement('button')
            marcoIMG.setAttribute("class", "img_get_marco")
            marcoIMG.setAttribute("src", marco.imagen)
            btn.setAttribute("class", "btn_get_marco")
            btn.setAttribute('onclick', "document.getElementById('myImage').src='" + marco.imagen + "'");
            btn.appendChild(marcoIMG);
            imagesMosaic.appendChild(btn);
        })
    }).catch(err => console.log(err))

})