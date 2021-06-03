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
      url: '/get/editHaitianPerifericos/' + $("#id").val(),
      method: 'get',
      dataType: 'json',
      success: function (response) {
         //termopar e voltagem
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

         //refrigeracao fixo
         if (response.fixoRefrig1 === "Gelada") {
            document.getElementById("fixoGeladaEdit1").checked = true;
         } else {
            document.getElementById("fixoFriaEdit1").checked = true;
         }
         if (response.fixoRefrig2 === "Gelada") {
            document.getElementById("fixoGeladaEdit2").checked = true;
         } else {
            document.getElementById("fixoFriaEdit2").checked = true;
         }
         if (response.fixoRefrig3 === "Gelada") {
            document.getElementById("fixoGeladaEdit3").checked = true;
         } else {
            document.getElementById("fixoFriaEdit3").checked = true;
         }
         if (response.fixoRefrig4 === "Gelada") {
            document.getElementById("fixoGeladaEdit4").checked = true;
         } else {
            document.getElementById("fixoFriaEdit4").checked = true;
         }
         // refrigeracao movel
         if (response.movelRefrig1 === "Gelada") {
            document.getElementById("movelGeladaEdit1").checked = true;
         } else {
            document.getElementById("movelFriaEdit1").checked = true;
         }
         if (response.movelRefrig2 === "Gelada") {
            document.getElementById("movelGeladaEdit2").checked = true;
         } else {
            document.getElementById("movelFriaEdit2").checked = true;
         }
         if (response.movelRefrig3 === "Gelada") {
            document.getElementById("movelGeladaEdit3").checked = true;
         } else {
            document.getElementById("movelFriaEdit3").checked = true;
         }
         if (response.movelRefrig4 === "Gelada") {
            document.getElementById("movelGeladaEdit4").checked = true;
         } else {
            document.getElementById("movelFriaEdit4").checked = true;
         }

         //TOLERANCIA
         if (response.tolCamara === 0.1) {
            $("#tolCamara").val("0.1")
         } else {
            $("#tolCamara").val("5")
         }

         if (response.tolValve === 0.1) {
            $("#tolValve").val("0.1")
         } else {
            $("#tolValve").val("0.05")
         }
         
         if (response.tolRefrigeracao === 0.1) {
            $("#tolRefrigeracao").val("0.1")
         } else {
            $("#tolRefrigeracao").val("0.05")
         }
         
         if (response.tolVapor === 0.1) {
            $("#tolVapor").val("0.1")
         } else {
            $("#tolVapor").val("0.05")
         }
      }
   })

   $.ajax({
      url: '/get/editHaitianInjetores/' + $("#id").val(),
      method: 'get',
      dataType: 'json',
      success: function (response) {
         //TOLERANCIA
         if (response.tolCilindro === 0.1) {
            $("#tolCilindro").val("0.1")
         } else {
            $("#tolCilindro").val("0.05")
         }
         
         if (response.tolInjecao === 0.1) {
            $("#tolInjecao").val("0.1")
         } else {
            $("#tolInjecao").val("0.05")
         }
         
         if (response.tolRecalque === 0.1) {
            $("#tolRecalque").val("0.1")
         } else {
            $("#tolRecalque").val("0.05")
         }
         
         if (response.tolDosagem === 0.1) {
            $("#tolDosagem").val("0.1")
         } else {
            $("#tolDosagem").val("0.05")
         }
         
         if (response.tolDescompressao === 0.1) {
            $("#tolDescompressao").val("0.1")
         } else {
            $("#tolDescompressao").val("0.05")
         }
         
         if (response.tolFechamento === 0.1) {
            $("#tolFechamento").val("0.1")
         } else {
            $("#tolFechamento").val("0.05")
         }
         
         if (response.tolAbertura === 0.1) {
            $("#tolAbertura").val("0.1")
         } else {
            $("#tolAbertura").val("0.05")
         }
         
         if (response.tolExtracao === 0.1) {
            $("#tolExtracao").val("0.1")
         } else {
            $("#tolExtracao").val("0.05")
         }
         
         if (response.tolRadial === 0.1) {
            $("#tolRadial").val("0.1")
         } else {
            $("#tolRadial").val("0.05")
         }

         //RADIAL TYPE
         if (response.radialTypeEntrada1 === "Limite") {
            $("#typeEntrada1").val("Limite")
         } else {
            $("#typeEntrada1").val("Tempo")
         }

         if (response.radialTypeSaida1 === "Limite") {
            $("#typeSaida1").val("Limite")
         } else {
            $("#typeSaida1").val("Tempo")
         }

         $("#userLogado").val(sessionStorage.getItem('userLogado'));
      }
   })

   $.ajax({
      url: '/get/revisaoPerifericos/' + $("#revisao").val(),
      method: 'get',
      dataType: 'json',
      success: function (response) {   
         //termopar e voltagem
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

         //refrigeracao fixo
         if (response.fixoRefrig1 === "Gelada") {
            document.getElementById("GeladaFixo1").style.fontWeight = "bold";
            document.getElementById("GeladaFixo1").style.fontStyle = "italic";
            document.getElementById("GeladaFixo1").style.textDecoration = "underline";
         } else {
            document.getElementById("FriaFixo1").style.fontWeight = "bold";
            document.getElementById("FriaFixo1").style.fontStyle = "italic";
            document.getElementById("FriaFixo1").style.textDecoration = "underline";
         }

         if (response.fixoRefrig2 === "Gelada") {
            document.getElementById("GeladaFixo2").style.fontWeight = "bold";
            document.getElementById("GeladaFixo2").style.fontStyle = "italic";
            document.getElementById("GeladaFixo2").style.textDecoration = "underline";
         } else {
            document.getElementById("FriaFixo2").style.fontWeight = "bold";
            document.getElementById("FriaFixo2").style.fontStyle = "italic";
            document.getElementById("FriaFixo2").style.textDecoration = "underline";
         }

         if (response.fixoRefrig3 === "Gelada") {
            document.getElementById("GeladaFixo3").style.fontWeight = "bold";
            document.getElementById("GeladaFixo3").style.fontStyle = "italic";
            document.getElementById("GeladaFixo3").style.textDecoration = "underline";
         } else {
            document.getElementById("FriaFixo3").style.fontWeight = "bold";
            document.getElementById("FriaFixo3").style.fontStyle = "italic";
            document.getElementById("FriaFixo3").style.textDecoration = "underline";
         }

         if (response.fixoRefrig4 === "Gelada") {
            document.getElementById("GeladaFixo4").style.fontWeight = "bold";
            document.getElementById("GeladaFixo4").style.fontStyle = "italic";
            document.getElementById("GeladaFixo4").style.textDecoration = "underline";
         } else {
            document.getElementById("FriaFixo4").style.fontWeight = "bold";
            document.getElementById("FriaFixo4").style.fontStyle = "italic";
            document.getElementById("FriaFixo4").style.textDecoration = "underline";
         }

         // refrigeracao movel
         if (response.movelRefrig1 === "Gelada") {
            document.getElementById("GeladaMovel1").style.fontWeight = "bold";
            document.getElementById("GeladaMovel1").style.fontStyle = "italic";
            document.getElementById("GeladaMovel1").style.textDecoration = "underline";
         } else {
            document.getElementById("FriaMovel1").style.fontWeight = "bold";
            document.getElementById("FriaMovel1").style.fontStyle = "italic";
            document.getElementById("FriaMovel1").style.textDecoration = "underline";
         }

         if (response.movelRefrig2 === "Gelada") {
            document.getElementById("GeladaMovel2").style.fontWeight = "bold";
            document.getElementById("GeladaMovel2").style.fontStyle = "italic";
            document.getElementById("GeladaMovel2").style.textDecoration = "underline";
         } else {
            document.getElementById("FriaMovel2").style.fontWeight = "bold";
            document.getElementById("FriaMovel2").style.fontStyle = "italic";
            document.getElementById("FriaMovel2").style.textDecoration = "underline";
         }

         if (response.movelRefrig3 === "Gelada") {
            document.getElementById("GeladaMovel3").style.fontWeight = "bold";
            document.getElementById("GeladaMovel3").style.fontStyle = "italic";
            document.getElementById("GeladaMovel3").style.textDecoration = "underline";
         } else {
            document.getElementById("FriaMovel3").style.fontWeight = "bold";
            document.getElementById("FriaMovel3").style.fontStyle = "italic";
            document.getElementById("FriaMovel3").style.textDecoration = "underline";
         }

         if (response.movelRefrig4 === "Gelada") {
            document.getElementById("GeladaMovel4").style.fontWeight = "bold";
            document.getElementById("GeladaMovel4").style.fontStyle = "italic";
            document.getElementById("GeladaMovel4").style.textDecoration = "underline";
         } else {
            document.getElementById("FriaMovel4").style.fontWeight = "bold";
            document.getElementById("FriaMovel4").style.fontStyle = "italic";
            document.getElementById("FriaMovel4").style.textDecoration = "underline";
         }
      }
   })

   $.ajax({
      url: '/get/revisaoInjetores/' + $("#revisao").val(),
      method: 'get',
      dataType: 'json',
      success: function (response) {
         $("#justificativa").val(response.Justificativa);
      }
   })

   $.ajax({
      url: '/storeUser',
      method: 'get',
      dataType: 'json',
      success: function (response) {

         sessionStorage.setItem('userLogado', response.email);

         $.ajax({
            url: '/isUserAdmin/' + sessionStorage.getItem('userLogado'),
            method: 'get',
            dataType: 'json',
            success: function (admin) {

               sessionStorage.setItem('isAdmin', admin.isAdmin);
  
            }
         })
      }
   })
});