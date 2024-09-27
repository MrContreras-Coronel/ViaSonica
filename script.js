let contenedor = document.getElementById('owl')

axios.get('https://api.institutoalfa.org/api/songs').then(
    (res) => {
          res.data.songs.map((song) => {

               let songdiv = document.createElement('div')
               songdiv.setAttribute('class','box')
               songdiv.innerHTML = `
                    <h3>${song.title} - ${song.author}</h3>
               `

               contenedor.appendChild(songdiv)
          })
    })

