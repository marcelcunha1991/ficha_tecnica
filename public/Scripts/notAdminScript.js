$(document).ready(function () {
   console.log(typeof sessionStorage.getItem('isAdmin'));

   if (sessionStorage.getItem('isAdmin') === "0") {
      $("#remover").hide()
      $(".newUser").hide()
      
   }

})