const express = require('express');
const app = express();

app.get('/',(req,res)=>{
   res.send("Hola mundo!")
});
app.listen(3000,()=>{
   console.log("Servidor corriendo")
});

let autos = require('./Modulos/autos.js');

let persona = {
    nombre: "Juan",
    capacidadDePagoEnCuotas: 20000,
    capacidadDePagoTotal: 100000
 }

 let persona2 = {
   nombre: "Alberso",
   capacidadDePagoEnCuotas: 200000,
   capacidadDePagoTotal: 1000000
}

let concesionaria = {
   autos: autos,
   
   buscarAuto: function(patenteEntrada){
        for(let x of autos){
         if (x.patente == patenteEntrada){

            return x;
         }

      }
      return null;
   },

    venderAuto:function(patente){
       let autoSearch = this.buscarAuto(patente);
       if(autoSearch !== null){
            autoSearch.vendido = true;
       }
            return autoSearch;
    },
   
       autosParaLaVenta: function(){
         let autosParaLaVenta = this.autos.filter(function(e){
           return e.vendido !== true;
       })
       return autosParaLaVenta;
    }, 
         autosNuevos: function (){
            return this.autosParaLaVenta().filter(autos=> ((autos.km < 100)&&(autos.vendido == false)))
   },

         listaDeVentas: function(){
            let listaDeVentas = [ ];
            for(i=0;i<this.autos.length;i++){
               if(this.autos[i].vendido == true){
                  listaDeVentas.push(this.autos[i].precio)
                }
            }
               return listaDeVentas;
    },

         totalDeVentas:function(){ //Con el reduce, si el array esta vacio arroja error!! En ese caso, va esta sintaxis
         let valorInicial = 0;
         let totalDeVentas = this.listaDeVentas().reduce((total,valor)=>total +valor,valorInicial);
            return totalDeVentas;
    },

         puedeComprar:function(auto, persona){

             if (auto.precio > persona.capacidadDePagoTotal){
            return false;
         }
            let precioPorCuota = auto.precio / auto.cuotas;
            if (precioPorCuota > persona.capacidadDePagoEnCuotas) {
          return false;
      }
      return true;
    },

         autosQuePuedeComprar:function(persona){
           let autosDisponibles = this.autos.autosParaLaVenta();
           

    },

         autosQuePuedeComprar:function(persona) {
            let disponibles = this.autosParaLaVenta();
            let lista=[]
         disponibles.filter(autos=>{
         if (this.puedeComprar(autos,persona)) {
         lista.push(this.puedeComprar)
      }
      })
      return lista
   },
}

console.table(concesionaria.autosQuePuedeComprar(persona2))


   
