//Type writer effect
document.addEventListener('DOMContentLoaded',function(event){
  var text = [ "David Gallardo."];

  function typeWriter(text, i, fnCallback) {
    if (i < (text.length)) {
     document.querySelector("h1").innerHTML = text.substring(0, i+1);
      setTimeout(function() {
        typeWriter(text, i + 1, fnCallback)
      }, 100);
    }
  }

  function typeLetter(i) {
    if (i < text[i].length) {
      typeWriter(text[i], 0, function(){
      typeLetter(i + 1);
     });
    }
  }
  typeLetter(0);
});

function openResume() {
  window.open('files/Resume.pdf');
}
