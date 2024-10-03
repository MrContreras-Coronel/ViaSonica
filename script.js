let contenedor = document.getElementById('owl')
const imagenes_url = "https://api.institutoalfa.org/api/songs/image/"
const song_url = "https://api.institutoalfa.org/api/songs/audio/"
const alphabetic = (a, b) => { return a.title > b.title };
const url_insti = 'https://api.institutoalfa.org/api/songs/'
var l = {}
let el = []
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



let menu = `
<div class="ctrl">
<div class="round"><img src="/assets/${isPlaying(f)}" onclick="f = pausePlay(f)"></div>
</div>
`

function play_Music(g){
     
   
     contenedor.innerHTML= `<div class="box2">  
      <img src="${g.img}" class="pu">
                    ${g.titulo}
                    <span class="sp">Autor:</span>${g.autor}
                    <span class="sp">Album:</span> ${g.album}   
     <audio id="curr" src="${g.audio}" autoplay></audio>
     ${menu}
     </div>`
     


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
              l[song.audio.filename] = {img: imagenes_url+song.image.filename, audio: song_url + song.audio.filename,
                    autor: song.author, titulo: song.title, album: song.album
              }

              el.push(song.audio.filename)
              
     // l.push({audio:song_url+song.audio.filename, img: imagenes_url+song.img.filename})
        //   l.push({audio: song_url+soung.audio.filename, img: imagenes_url+song.audio.filename})
                  
                    contenedor.appendChild(songdiv)
                    songdiv.addEventListener("click",() => {
                         let idx = song.audio.filename;
                         // Parametros : aud,img,titulo,autor,album,indx    

                         play_Music(l[idx])
                    })   
                    
                       
               })    
     })


 