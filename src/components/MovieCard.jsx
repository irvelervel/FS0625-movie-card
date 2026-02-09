// questo componente mostrerà una Card di bootstrap con all'interno la locandina
// e un po' di informazioni relative al film selezionato
// queste info verranno prelevate da una chiamata alle API di OMDb

import { Component } from 'react'
import { Alert, Card, Spinner } from 'react-bootstrap'

const omdbURL = 'http://www.omdbapi.com/?apikey=24ad60e9&s='

class MovieCard extends Component {
  // MovieCard sta ricevendo una prop da App: "this.props.movieTitle", ovvero il valore
  // corrente selezionato nella tendina dei film. Inizialmente, questo valore è "Iron Man".

  // MovieCard intende nella sua fase di montaggio di fare una fetch a OMDb con il valore
  // della tendina in modo da recuperare le info per la sua Card; come settimana scorsa
  // una volta recuperati i dati nella fetch li salveremo nello state del componente.

  state = {
    // movieObject voglio sia un oggetto con dentro Poster, Title, Year etc. etc.
    movieObject: null, // potete anche dare un valore iniziale di { }, occhio che oggetto vuoto
    // è un valore TRUTHY!
    loading: true,
    error: false,
  }

  getMovieData = () => {
    fetch(omdbURL + this.props.movieTitle) // es. http://www.omdbapi.com/?apikey=24ad60e9&s=Thor
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Errore nel recupero dati film')
        }
      })
      .then((movieData) => {
        console.log('movieData', movieData.Search[0])
        this.setState({
          movieObject: movieData.Search[0], // metto nello state il primo risultato di ricerca
          loading: false,
        })
      })
      .catch((err) => {
        console.log('ERRORE', err)
        this.setState({
          loading: false,
          error: true,
        })
      })
  }

  // tra poco riempiremo questo stato alla fine della fase di montaggio con componentDidMount

  componentDidMount() {
    // montaggio e fetch iniziale
    this.getMovieData()
  }

  // per fare in modo che il componente ri-lanci la funzione getMovieData ogni volta che cambia il film,
  // avremmo bisogno di intervenire sulla sua fase di UPDATE (aggiornamento)
  componentDidUpdate(prevProps, prevState) {
    // componentDidUpdate è un metodo di React (dei componenti a classe) che viene automaticamente
    // re-invocato OGNI VOLTA che cambia lo stato o che cambiano le props
    console.log('COMPONENTDIDUPDATE')
    // this.getMovieData()
    // invocare this.getMovieData all'interno di componentDidUpdate provoca lo stesso loop infinito
    // che avevamo quando lo mettevamo in render() (si svegliano sempre in coppia)

    // la vera differenza tra componentDidUpdate e render è che il primo riceve 2 parametri:
    // - prevProps è l'oggetto delle props PRIMA dell'aggiornamento appena avvenuto
    // - prevState è l'oggetto dello state PRIMA dell'aggiornamento appena avvenuto
    // prevProps sono le props precedenti (in contrapposizione con this.props che sono le props attuali)
    // prevState è lo stato precedente (in contrapposizione con this.state che è lo stato attuale)

    // se utilizzate un componentDidUpdate, DOVETE METTERCI DENTRO UN IF()

    // a) cambio film nella tendina
    // b) questo componente riceve una nuova prop -> movieTitle
    // c) movieCard entra in una fase di update: si svegliano render e componentDidUpdate
    // d) cosa vogliamo fare in componentDidUpdate? vorremmo ASCOLTARE questo cambio di prop e
    // vorremmo ri-eseguire getMovieData()
    // this.getMovieData() <-- perchè loop infinito? perchè componentDidUpdate si sveglia quando
    // cambia la prop movieTitle, fa la fetch e poi fa un setState <- PROBLEMA
    // con componentDidUpdate riusciremo a distinguere tra le due cause dell'aggiornamento: quando
    // è avvenuto per un cambio di prop e quando invece è avvenuto per un cambio di state
    // quindi utilizziamo prevProps e prevState per eseguire la fetch solo quando è cambiata props.movieTitle
    if (prevProps.movieTitle !== this.props.movieTitle) {
      this.getMovieData()
      // fai di nuovo la fetch SOLO quando questo aggiornamento è stato causato da un cambio della prop movieTitle
      // il mio IF torna FALSE quando l'update viene azionato dal setState dentro la fetch
    }
  }

  // CATENA DEGLI EVENTI
  // 1) PRIMO RENDER -> si monta lo spinner (perchè this.state.loading è true), l'errore non si vede
  // (perchè this.state.error è false), la Card non si monta (perchè this.state.movieObject è null)
  // 2) COMPONENTDIDMOUNT -> fetch -> se tutto va bene loading diventa false, movieObject si riempie
  // e non è più null -> a causa del setState abbiamo un nuovo render
  // 3) SECONDO RENDER -> React ridisegna l'interfaccia e monta i pezzi mancanti -> ora loading è false,
  // quindi lo spinner se ne va e this.state.movieObject NON È PIÙ NULL -> si monta la Card

  render() {
    console.log('RENDER') // quante volte vedrò il console.log nel browser?
    // un componente lancia nuovamente render() ogni volta che cambia il suo stato o che gli
    // cambiano le props

    return (
      // loading ed error rispecchiano lo stato della Promise: finchè loading è true
      // la Promise è "pending", e non ho ancora i dati per la Card -> Spinner
      <>
        {this.state.loading && (
          <div className="text-center">
            <Spinner animation="border" variant="success" />
          </div>
        )}
        {this.state.error && (
          <div className="text-center">
            <Alert variant="danger">Errore nel caricamento</Alert>
          </div>
        )}
        {this.state.movieObject && (
          <Card>
            <Card.Img variant="top" src={this.state.movieObject.Poster} />
            <Card.Body className="text-center">
              <Card.Title>{this.state.movieObject.Title}</Card.Title>
              <Card.Text>
                {this.state.movieObject.Year} - {this.state.movieObject.imdbID}
              </Card.Text>
            </Card.Body>
          </Card>
        )}
      </>
    )
  }
}

export default MovieCard

// ---------------
// TRUTHY/FALSY
// const x = null

// if (500) {
//   console.log('CIAO')
// }

// i valori FALSY sono:
// null
// undefined
// false
// 0
// -0
// ''
// TUTTI GLI ALTRI SONO TRUTHY
// ---------------

// COMPONENT LIFECYCLE
// 1) render
// 2) componentDidMount
// 3) render + componentDidUpdate ad ogni update (cambio di state o di props)
