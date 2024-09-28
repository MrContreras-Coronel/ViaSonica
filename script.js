let contenedor = document.getElementById('owl')

const alphabetic = (a,b) => {return a.title > b.title};


axios.get('https://api.institutoalfa.org/api/songs').then(
    (res) => {
          res.data.songs.sort(alphabetic)
          .map((song) => {

               let songdiv = document.createElement('div')
               songdiv.setAttribute('class','box')
               songdiv.innerHTML = `

                    <img src="${song.image.filename}">
                    <h3>${song.title} - ${song.author}</h3>
               `

               contenedor.appendChild(songdiv)
          })
    })

