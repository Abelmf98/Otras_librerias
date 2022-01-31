/**
* @file mathjax.js
* @author Abel Mansilla Felipe <amansillafelipe.guadalupe@alumnado.fundacionloyola.net>
* @license GPLV3
*/

'use strict'

window.onload = iniciar()

function iniciar(){
  fetch('histograma.json')
    .then(respuesta => respuesta.json())
    .then(objeto => {
      console.log(objeto)
      let datos = parsear (objeto)
      grafico(datos)
    })
}


function parsear(objeto){
  let datos = []
  for(let i = 0; i < objeto.length; i++){
    let dato = {}
    dato.corx = objeto[i].MetaData[2].Nombre
    dato.valor = objeto[i].Data[0].Valor
    // datos.paro = ...
    datos.push(dato)

  }
  return datos
}

function grafico(datos){
  new Morris.Bar({
    // ID of the element in which to draw the chart.
    element: 'myfirstchart',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: datos,
    //   { year: '2008', value: 20 },
    //   { year: '2009', value: 10 },
    //   { year: '2010', value: 5 },
    //   { year: '2011', value: 5 },
    //   { year: '2012', value: 20 }
    // ],
    // The name of the data record attribute that contains x-values.
    xkey: 'corx',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['valor'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['valor']
  });
}
