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
        url: '/get/user/' + $("#idUser").val(),
        method: 'get',
        dataType: 'json',
        success: function (response) {
            console.log('response');
            console.log(response.isAdmin);
            console.log(typeof response.isAdmin);
    
            if (response.isAdmin === "1") {
                document.getElementById("Sim").checked = true;
            } else {
                document.getElementById("Nao").checked = true;
            }
        }
    })
});

$("#editRevisaoFicha").hide();
var edit = false;

function editarRevisao() {
    edit = !edit;

    if (edit === false) {
        $("#editRevisaoFicha").hide();
        $("#visualizacaoFicha").show();
        $("#editButton").html("Editar");
        
    } else {

        $("#editRevisaoFicha").show();
        $("#visualizacaoFicha").hide();
        $("#editButton").html("Votar Revisão");

    }
}