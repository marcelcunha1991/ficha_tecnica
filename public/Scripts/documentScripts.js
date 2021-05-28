$(document).ready(function () {
   $('body').on('keydown', 'input, select', function(e) {
      if (e.which === 13) {
         var self = $(this), form = self.parents('form:eq(0)'), focusable, next;
         focusable = form.find('input,a,select,button,textarea').filter(':visible');
         next = focusable.eq(focusable.index(this)+1);
         if (next.length) {
            next.focus();
         } else {
            form.submit();
         }
         return false;
      }
   });


   $.ajax({
      url: '/get/editHaitian/' + $("#id").val(),
      method: 'get',
      dataType: 'json',
      success: function (response) {   

         if (response.termopar === "K") {
            document.getElementById("termoparEditK").checked = true;
         } else {
            document.getElementById("termoparEditJ").checked = true;
         }
         
         if (response.voltagem === "220") {
            document.getElementById("voltagemEdit220").checked = true;
         } else {
            document.getElementById("voltagemEdit24").checked = true;
         }
      }
   })

   console.log($("#revisao").val())

   $.ajax({
      url: '/get/revisao/' + $("#revisao").val(),
      method: 'get',
      dataType: 'json',
      success: function (response) {   

         if (response.termopar === "K") {
            document.getElementById("termoparK").style.fontWeight = "bold";
            document.getElementById("termoparK").style.fontStyle = "italic";
            document.getElementById("termoparK").style.textDecoration = "underline";
         } else {
            document.getElementById("termoparJ").style.fontWeight = "bold";
            document.getElementById("termoparJ").style.fontStyle = "italic";
            document.getElementById("termoparJ").style.textDecoration = "underline";
         }
         
         if (response.voltagem === "220") {
            document.getElementById("voltagem220").style.fontWeight = "bold";
            document.getElementById("voltagem220").style.fontStyle = "italic";
            document.getElementById("voltagem220").style.textDecoration = "underline";
         } else {
            document.getElementById("voltagem24").style.fontWeight = "bold";
            document.getElementById("voltagem24").style.fontStyle = "italic";
            document.getElementById("voltagem24").style.textDecoration = "underline";
         }
      }
   })

});