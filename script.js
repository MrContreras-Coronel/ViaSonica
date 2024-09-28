let contenedor = document.getElementById('owl')
const imagenes_url = "https://api.institutoalfa.org/api/songs/image/"
const alphabetic = (a,b) => {return a.title > b.title};


axios.get('https://api.institutoalfa.org/api/songs').then(
    (res) => {
          res.data.songs.sort(alphabetic)
          .map((song) => {

               let songdiv = document.createElement('div')
               songdiv.setAttribute('class','box')
               songdiv.innerHTML = `

     <img src="${(imagenes_url + song.image.filename)}" class="pu">
                    ${song.title} <br> <br>
                    <span class="sp">Autor:</span>${song.author} <br>
                    <span class="sp">Album:</span> ${song.album}
                    
               `

               contenedor.appendChild(songdiv)
          })
    })

