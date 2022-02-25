$(document).ready(function(e){
    hideLoader();
});

window.addEventListener("beforeunload", function(e){
    showLoader();
  });

const hideLoader = () => {
    $('.loader-panel').hide();
}

const showLoader = () => {
    $('.loader-panel').show();
}

const addNotiBox = (message) => {
    // Notibox es un pequeño cuadro de diálogo que muestra un mensaje en pantalla, dura 5 segundos o hasta que se le dé clic
  clearTimeout(time);
  var noti = '<div class="notibox" onclick="$(this).fadeOut(250);" title="Clic para cerrar"><p>'+message+'</p></div>';
  $('body').append(noti);
  $('.notibox').fadeIn(250);
  var time = setTimeout(
   function(){
     $('.notibox').fadeOut(250);
     $('.notibox').remove();
   }, 5000);
}