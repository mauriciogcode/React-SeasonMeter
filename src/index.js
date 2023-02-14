/*
* Steps 
Empece haciendo la carpeta con reactapp / Borre archivos, cargue cdns de semantic
cree index.js (con import, app, render) / cree el componente season display (con import, app, export)
windows.navigator.geolocation.getCurrentPosition()
sirve para realizar la geolocalizacion tiene dos callbacks (info y error)
 
el usuario debe aceptar la solicitud

como hay demora en la carga de la localizacion
usaremos 'class base component' por lo que tenemos que refactorizar la funcion
en clase. 

Se debe usar extender el componente React.Component
Y luego se debe redefinir el metodo de renderizado

* React state system - Rules of state
- Solo usable con clases (o hooks con funciones)
- Se confunden states con props
- STATE ES UN OBJETO JS QUE CONTIENE DATA REELEVANTE DEL COMPONENTE
- Actualizar el 'state' del COMPONENTE causa que se renderize
- El state debe ser inizializado cuando un COMPONENTE es creado.
- SOLO se lo puede actualizar usando la funcion 'setState'

*/

// * Antes de refactorizar a clase

// import React from 'react'
// import ReactDOM from 'react-dom'

// const App = () => {
//   window.navigator.geolocation.getCurrentPosition(
//     (position) => console.log(position),
//     (err) => console.log(err)
//   )

//   return <div>{}</div>
// }

// ReactDOM.render(<App />, document.querySelector('#root'))

// * Refactorizado sin estado

// import React from 'react'
// import ReactDOM from 'react-dom'

// class App extends React.Component {
//   render() {
//     window.navigator.geolocation.getCurrentPosition(
//       (position) => console.log(position),
//       (err) => console.log(err)
//     )

//     return <div>Latitude: </div>
//   }
// }
// ReactDOM.render(<App />, document.querySelector('#root'))

// * Refactorizado y con estados

/* import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
  // Sea agrega el constructor
  constructor(props) {
    // Se usa el metodo super por que se extendio
    //La palabra super se usa para llamar al constructor de su clase principal
    //para acceder a las propiedades y métodos de los padres.
    super(props)

    // @ author:  ESTA ES LA UNICA VEZ que hacemos una asignacion al this.state
    //mau: This se usa para acceder a la funciones y atributos del padre
    //1ero se agrego el lat null y luego el error message que sirve para manejar el error
    this.state = { lat: null, errorMessage: '' }

    // Esta funcion tiene callback
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        //se llama a setstates, que se carga en el event loop
        this.setState({ lat: position.coords.latitude })
      },
      // manejamos el error, redenderizado y actualizando el state
      (err) => {
        this.setState({ errorMessage: err.message })
      }
    )
    // Haber... Extendimos el obejto padre, le agregamos lat,
    // y le pusimos un callback para que cuando llegue se actualize
  }
  //@author: React says we have to define render!!
  //se renderiza lo que hay en this.
  // es decir al objeto app
  render() {
    // renderizado condicional
    if (this.state.errorMessage && !this.state.lat) {
      return <civ>Error: {this.state.errorMessage}</civ>
    } else if (!this.state.errorMessage && this.state.lat) {
      return <div>Latitude: {this.state.lat}</div>
    }
    return <div>Loading!</div>
  }
}
ReactDOM.render(<App />, document.querySelector('#root'))
 */


// // * Component li
// import React from 'react'
// import ReactDOM from 'react-dom'

// class App extends React.Component {
//     // hay dos maneras de inicializar estado
//     // refactoracion se elimina el metodo constructor
//     state = { lat: null, errorMessage: '' }
//     // en vez de  this.state = { lat: null, errorMessage: '' }
//     // por que babel implementa el constructor y el super por nosotros
//     // y lo transpila como si estuviera escrito asi.

//     // ! se fue a didmount
//  /*    window.navigator.geolocation.getCurrentPosition(
//       (position) => {
//         this.setState({ lat: position.coords.latitude })
//       },
//       (err) => {
//         this.setState({ errorMessage: err.message })
//       }
//     ) */

// /*  El componente LIFECYCLE es una funcion que podemos
//     definir adentro de nuestros componentes del tipo clase
//     si decidimos implementarlos seran llamados por react en 
//     algun momento. Tiene varias partes:

//     Constructor: 
//     - Aqui se hace un setup de unica vez pero no se recomienda usarlo.
//     Render: 
//     - Solo retorna jsx, evitar hacer algo mas aqui.
//     DidMount: 
//     - Se usa cuando se muestra el componente inmediatamente se llama a DidMount una vez.
//     - Se usa para data que quiero presentar como datos de login
//     - Para la carga inicial de datos y por unica vez: en esta caso solo queremos saber la latitud una vez
//     DidUpdate:
//     - Se actualiza con cuando el componente cambia su estado con  Set state o props de un componente padre
//     - Es ideal para las solicitudes de datos en un boton
//     WillUmount: 
//     - Si no queremos mostrar mas este metodo y necesitamos limpiar


//     Hay otros metodos pero poco usados.
// */

//   componentDidMount(){
//     window.navigator.geolocation.getCurrentPosition(
//       (position) => this.setState({ lat: position.coords.latitude }),
//       (err) => this.setState({ errorMessage: err.message }));
//     }

//   componentDidUpdate(){
//     console.log('My comp. was just updated - it rerenderd')
//   }
// // solo es para enviar jsx y para nada mas
//   render() {
//     if (this.state.errorMessage && !this.state.lat) {
//       return <civ>Error: {this.state.errorMessage}</civ>
//     } else if (!this.state.errorMessage && this.state.lat) {
//       return <div>Latitude: {this.state.lat}</div>
//     }
//     return <div>Loading!</div>
//   }
// }
// ReactDOM.render(<App />, document.querySelector('#root'))


// * Passing State
import React from 'react'
import ReactDOM from 'react-dom'
import SeasonDisplay from './SeasonDisplay'

class App extends React.Component {
    
    state = { lat: null, errorMessage: '' }
  

  componentDidMount(){
    window.navigator.geolocation.getCurrentPosition(
      (position) => this.setState({ lat: position.coords.latitude }),
      (err) => this.setState({ errorMessage: err.message }));
    }

  componentDidUpdate(){
    console.log('My comp. was just updated - it rerenderd')
  }
  render() {
    if (this.state.errorMessage && !this.state.lat) {
      return <civ>Error: {this.state.errorMessage}</civ>
    } else if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat}/>
    }
    return <div>Loading!</div>
  }
}
ReactDOM.render(<App />, document.querySelector('#root'))

//nextlecture react  063 Passing State as Props