let contenedor = document.getElementById('owl')
const imagenes_url = "https://api.institutoalfa.org/api/songs/image/"
const song_url = "https://api.institutoalfa.org/api/songs/audio/"
const alphabetic = (a, b) => { return a.title > b.title };

axios.get('https://api.institutoalfa.org/api/songs').then(
     (res) => {
          res.data.songs.sort(alphabetic)
               .map((song) => {

                    let songdiv = document.createElement('div')
                    songdiv.setAttribute('class', 'box')
                    songdiv.innerHTML = `

     <img src="${(imagenes_url + song.image.filename)}" class="pu">
                    ${song.title} <br> <br>
                    <span class="sp">Autor:</span>${song.author} <br>
                    <span class="sp">Album:</span> ${song.album}
                    <audio id=${song.audio.id} src ="${song_url + song.audio.filename}">
                    </audio> `
                    songdiv.addEventListener("click",() => {
                         let can = document.getElementById(song.audio.id)
                         can.play()
                    })

                    contenedor.appendChild(songdiv)


                    
               })    
     })

let busq = document.getElementById("search-song")

busq.addEventListener("click",() => {
     let fufa = document.getElementById("main-nav")

     fufa.innerHTML+=`
     <form><input type="text" id="buscador" /></form>
     
     `


})
