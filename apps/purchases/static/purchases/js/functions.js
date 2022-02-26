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

const hideDialog = () => {
  $('.overlay').fadeOut(200);
  $('#overlaySummary').fadeOut(200);
  $('#overlayTerms').fadeOut(200);
  $('#overlayReload').fadeOut(200);
}

const showSummary = () => {
  $('#overlaySummary').css('display', 'block');
  $('#overlayTerms').css('display', 'none');
}

const showTerms = () => {
  $('.overlay').fadeIn(200);
  $('.overlay').css('display', 'flex');
  $('#overlayTerms').css('display', 'block');
}

const showReload = () => {
  $('#overlaySummary').css('display', 'none');
  $('#overlayReload').css('display', 'block');
}

const addNotiBox = (message) => {
    // Notibox es un pequeño cuadro de diálogo que muestra un mensaje en pantalla, dura 5 segundos o hasta que se le dé clic
  clearTimeout(time);
  var noti = '<div class="notibox" onclick="$(this).fadeOut(250);" title="Clic para cerrar"><p>' + message + '</p></div>';
  $('body').append(noti);
  $('.notibox').fadeIn(250);
  var time = setTimeout(
   function(){
     $('.notibox').fadeOut(250);
     $('.notibox').remove();
   }, 5000);
}