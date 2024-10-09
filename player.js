
function runplayer(song){
    console.log('chhanged')
   contenedor.innerHtml = `
   <div class="box2">
    <img src="${(imagenes_url + song.image.filename)}" class="pu">
                   ${song.title}
                   <span class="sp">Autor:</span>${song.author} 
                   <span class="sp">Album:</span> ${song.album}
                     audio label:
                   <audio id="${song.audio.id}" src="${song_url + song.audio.filename}" autoplay="true">
                   </audio> 

    </div>
   `
}
if(x){
    runplayer(l)
}