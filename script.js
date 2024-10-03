let contenedor = document.getElementById('owl')
const imagenes_url = "https://api.institutoalfa.org/api/songs/image/"
const song_url = "https://api.institutoalfa.org/api/songs/audio/"
const alphabetic = (a, b) => { return a.title > b.title };
const url_insti = 'https://api.institutoalfa.org/api/songs'

axios.get(url_insti).then(
     (res) => {
          res.data.songs.sort(alphabetic)
               .map((song) => {

                    let songdiv = document.createElement('div')
                    songdiv.setAttribute('class', 'box')
                    songdiv.innerHTML = `

              <img src="${(imagenes_url + song.image.filename)}" class="pu">
                    ${song.title}
                    <span class="sp">Autor:</span>${song.author}
                    <span class="sp">Album:</span> ${song.album}
                    <audio id=${song.audio.id} src ="${song_url + song.audio.filename}">
                    </audio> `
                  
                    contenedor.appendChild(songdiv)
                    songdiv.addEventListener("click",() => {
                         let can = document.getElementById(song.audio.id)
                         can.play()
                    })               
               })    
     })

