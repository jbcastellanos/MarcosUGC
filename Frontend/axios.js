
const button = document.getElementById('boton')

button.addEventListener('click', () => {
    axios({
        method: 'GET',
        url: 'http://127.0.0.1:8000/marcos'
    }).then(res => {
        console.log(res.data)
    })
}
)

function obtenerMarcos() {

    axios.get('http://127.0.0.1:8000/users').then(resp => {

        console.log(resp.data);
    });

}
