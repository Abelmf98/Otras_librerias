/**
* @file script.js
* @author Abel Mansilla Felipe <amansillafelipe.guadalupe@alumnado.fundacionloyola.net>
* @license GPLV3
*/

'use strict'

window.onload = iniciar()

function iniciar(){
  fetch('histograma.json') //llamamos al archivo json
    .then(respuesta => respuesta.json())
    .then(objeto => {
      let datos = parsear (objeto)
      grafico(datos)
    })

    iniciar2() //funcion para mostrar la segunda gráfica
}


function parsear(objeto){
  let datos = []
  for(let i = 0; i < objeto.length; i++){
    let dato = {}
    dato.corx = objeto[i].MetaData[2].Nombre //pasamos los valores a las coordenadas correspondientes
    dato.valor = objeto[i].Data[0].Valor //pasamos los valores a las coordenadas correspondientes
    datos.push(dato)

  }
  return datos
}

function grafico(datos){
  new Morris.Bar({
    //hacemos mención al ID que nos mostrará el gráfico
    element: 'myfirstchart',
    //llamamos a los datos que leemos del archivo json
    data: datos,
    //   { year: '2008', value: 20 },
    //   { year: '2009', value: 10 },
    //   { year: '2010', value: 5 },
    //   { year: '2011', value: 5 },
    //   { year: '2012', value: 20 }
    // ],
    // guardamos la variable de x en el array
    xkey: 'corx',
    // guardamos la variable de y en el array
    ykeys: ['valor'],
    // guardamos el nombre
    labels: ['valor']
  });
}

function iniciar2(){
  fetch('tarta.json') //llamamos al archivo json
    .then(respuesta1 => respuesta1.json())
    .then(objeto1 => {
      let datos1 = parsear2(objeto1)
      console.log(datos1)
      grafico2(datos1)

    })
}


function parsear2(objeto1){
  let datos1 = []
  for(let i = 0; i < objeto1.length; i++){
    let dato1 = {}
    dato1.label = objeto1[i].Resultados //pasamos los valores a las coordenadas correspondientes
    dato1.value = objeto1[i].field2 //pasamos los valores a las coordenadas correspondientes
    datos1.push(dato1)

  }
  return datos1
}

function grafico2(datos1){
    Morris.Donut({
    element: 'tarta', //hacemos mención al ID que nos mostrará el gráfico
    data: datos1, //llamamos a los datos que leemos del archivo json
    formatter: function (x) { return x + "%"}
  }).on('click', function(i, row){
  console.log(i, row);
  });
}
