$(document).ready(function () {

   if (sessionStorage.getItem('isAdmin') === "0") {
      $("#remover").hide()
      $(".newUser").hide()
      
   }

})