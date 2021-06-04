$(document).ready(function () {
   $.ajax({
      url: '/get/editHaitianPerifericosRevisao/' + $("#id").val(),
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
   
         //refrigeracao vapor fixo
         if (response.fixoSteam === "AguaF1") {
            document.getElementById("fixoAguaF1Edit").checked = true;
   
         } else if (response.fixoSteam === "AguaF2") {
            document.getElementById("fixoAguaF2Edit").checked = true;
   
         } else if (response.fixoSteam === "Gelada") {
            document.getElementById("fixoVaporAguaEdit").checked = true;
   
         } else if (response.fixoSteam === "Vapor") {
            document.getElementById("fixoVaporEdit").checked = true;
            
         } else if (response.fixoSteam === "Ar") {
            document.getElementById("fixoArEdit").checked = true;
         }
   
         //refrigeracao vapor fixo
         if (response.movelSteam === "AguaF1") {
            document.getElementById("movelAguaF1Edit").checked = true;
   
         } else if (response.movelSteam === "AguaF2") {
            document.getElementById("movelAguaF2Edit").checked = true;
   
         } else if (response.movelSteam === "Gelada") {
            document.getElementById("movelVaporAguaEdit").checked = true;
   
         } else if (response.movelSteam === "Vapor") {
            document.getElementById("movelVaporEdit").checked = true;
            
         } else if (response.movelSteam === "Ar") {
            document.getElementById("movelArEdit").checked = true;
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
      url: '/get/editHaitianInjetoresRevisao/' + $("#id").val(),
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
         if (response.radialTypeEntrada1 === "0") {
            $("#typeEntrada1").val("0")

         } else if (response.radialTypeEntrada1 === "Limite") {
            $("#typeEntrada1").val("Limite")
         } else  {
            $("#typeEntrada1").val("Tempo")
         }

         if (response.radialTypeSaida1 === "0") {
            $("#typeSaida1").val("0")

         } else if (response.radialTypeSaida1 === "Limite") {
            $("#typeSaida1").val("Limite")
         } else  {
            $("#typeSaida1").val("Tempo")
         }

         if (response.radialTypeEntrada2 === "0") {
            $("#typeEntrada2").val("0")

         } else if (response.radialTypeEntrada2 === "Limite") {
            $("#typeEntrada2").val("Limite")
         } else  {
            $("#typeEntrada2").val("Tempo")
         }

         if (response.radialTypeSaida2 === "0") {
            $("#typeSaida2").val("0")

         } else if (response.radialTypeSaida2 === "Limite") {
            $("#typeSaida2").val("Limite")
         } else  {
            $("#typeSaida2").val("Tempo")
         }

         if (response.radialTypeEntrada3 === "0") {
            $("#typeEntrada3").val("0")

         } else if (response.radialTypeEntrada3 === "Limite") {
            $("#typeEntrada3").val("Limite")
         } else  {
            $("#typeEntrada3").val("Tempo")
         }

         if (response.radialTypeSaida3 === "0") {
            $("#typeSaida3").val("0")

         } else if (response.radialTypeSaida3 === "Limite") {
            $("#typeSaida3").val("Limite")
         } else  {
            $("#typeSaida3").val("Tempo")
         }

   
         $("#userLogado").val(sessionStorage.getItem('userLogado'));
      }
   })

})