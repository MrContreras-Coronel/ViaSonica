let contenedor = document.getElementById('owl')
const imagenes_url = "https://api.institutoalfa.org/api/songs/image/"
const song_url = "https://api.institutoalfa.org/api/songs/audio/"
const alphabetic = (a, b) => { return a.title > b.title };
const url_insti = 'https://api.institutoalfa.org/api/songs/'
var l = {}
let el = []
var index = 0

let f = true
var x = 0;
function pausePlay(d){
    
   let con = document.getElementById('curr');
   d? con.pause() : con.play()
   return !d
}

function isPlaying(d){
    return d? "pause.svg" : "play.svg"
}

function random_song(){
 play_Music(l[el[Math.floor(Math.random()*100) % el.length]])
}

let menu = `
<div class="ctrl">
<div class="round" onclick= "play_Music(l[el[playPrevious(index--)]])"><img src="/assets/back.svg"></div>
<div class="round" onclick="f = pausePlay(f)"><img src="/assets/${isPlaying(f)}"></div>
<div class="round" onclick= "play_Music(l[el[playNext(index++)]])"><img src="/assets/forward.svg"></div>
</div>
`


function playPrevious(x){
   return x < 0? el.length-1 : x - 1
}
function playNext(x){
   return x >= el.length ? 0 : x +1
}



function play_Music(g){
     
   
     contenedor.innerHTML= `<div class="box2" id="${g.id}">  
      <img src="${g.img}" class="pu">
                    ${g.titulo}
                    <span class="sp">Autor:</span>${g.autor}
                    <span class="sp">Album:</span> ${g.album}   
     <audio id="curr" src="${g.audio}" autoplay></audio>
     ${menu}
     </div>`
     
    return el.indexOf(g.id)

}

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
           `
              l[song.audio.filename] = {id: song.audio.filename, img: imagenes_url+song.image.filename, audio: song_url + song.audio.filename,
                    autor: song.author, titulo: song.title, album: song.album
              }

              el.push(song.audio.filename)
              
     
                    contenedor.appendChild(songdiv)
                    songdiv.addEventListener("click",() => {
                         let idx = song.audio.filename;
                        

                         index = play_Music(l[idx])
                    })   
                    
                       
               })    
     })


 