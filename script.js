let contenedor = document.getElementById('owl')
const imagenes_url = "https://api.institutoalfa.org/api/songs/image/"
const song_url = "https://api.institutoalfa.org/api/songs/audio/"
const url_insti = 'https://api.institutoalfa.org/api/songs/'

const alphabetic = (a, b) => a.title.localeCompare(b.title);
const orden_autor = (a, b) => a.author.localeCompare(b.author);
const orden_album = (a, b) => a.album.localeCompare(b.album);

let check_titulo = document.getElementById('tit')
let check_author = document.getElementById('author')
let check_album = document.getElementById('album')
var l = {}
let el = []
var index = 0

let f = true
var x = 0;




function pausePlay(d) {

     let con = document.getElementById('curr');
     document.getElementById('btnPlay').innerHTML = `<img src="/assets/${isPlaying(!d)}">` //Cambia la variable
     d ? con.pause() : con.play()

     return !d
}

function isPlaying(d) {
     return d ? "pause.svg" : "play.svg"
}

function random_song() {
     play_Music(l[el[Math.floor(Math.random() * el.length)]])
}

let menu = `

<div class="ctrl">

<div class="round" onclick= "play_Music(l[el[playPrevious(index)]])"><img src="/assets/back.svg"></div>
<div class="round" id="btnPlay" onclick="f = pausePlay(f)"><img src="/assets/${isPlaying(f)}"></div>
<div class="round" onclick= "play_Music(l[el[playNext(index)]])"><img src="/assets/forward.svg"></div>
</div>
<h2> ${undefined}</h2>
<h2></h2>
`


function playPrevious(x) {
     x = x <= 0 ? el.length - 1 : x - 1
     index = x
     return x;
}
function playNext(x) {
     x = x >= el.length - 1 ? 0 : x + 1
     index = x;
     return x;
}



function play_Music(g) {


   
     contenedor.innerHTML = `<div class="box2" id="${g.id}">  
      <img src="${g.img}" class="pu">
                    ${g.titulo}
                    <span class="sp">Autor:</span>${g.autor}
                    <span class="sp">Album:</span> ${g.album}   
     <audio id="curr" src="${g.audio}" autoplay></audio>
     ${menu}
     </div>`

     return el.indexOf(g.id)

}


function consumeAPI(sort) {
     contenedor.innerHTML = ""
     el = []
     l = {}
     
     axios.get(url_insti).then(
          (res) => {
               console.log(res.data.songs.sort(sort))
               res.data.songs.sort(sort)
                    .map((song) => {

                         let songdiv = document.createElement('div')
                         songdiv.setAttribute('class', 'box')
                         songdiv.innerHTML = `

              <img src="${(imagenes_url + song.image.filename)}" class="pu">
                    ${song.title}
                    <span class="sp">Autor:</span>${song.author}
                    <span class="sp">Album:</span> ${song.album}
           `




                         l[song.audio.filename] = {
                              id: song.audio.filename, 
                              img: imagenes_url + song.image.filename, 
                              audio: song_url + song.audio.filename,
                              autor: song.author, 
                              titulo: song.title, 
                              album: song.album,
                         }
               
                         el.push(song.audio.filename)
                
         
                         contenedor.appendChild(songdiv)
                         songdiv.addEventListener("click", () => {
                              let idx = song.audio.filename;


                              index = play_Music(l[idx])
                         })
                  


                    })
          })
}

checking()


function checking() {    
     if (check_titulo.checked) {
          consumeAPI(alphabetic)
     } else if (check_author.checked) {
          consumeAPI(orden_autor)
     } else if (check_album.checked) {
          consumeAPI(orden_album)
     }
    
}

