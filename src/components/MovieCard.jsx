// questo componente mostrerà una Card di bootstrap con all'interno la locandina
// e un po' di informazioni relative al film selezionato
// queste info verranno prelevate da una chiamata alle API di OMDb

import { Component } from 'react'
import { Card } from 'react-bootstrap'

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
  }

  // tra poco riempiremo questo stato alla fine della fase di montaggio con componentDidMount

  render() {
    return (
      <Card>
        <Card.Img variant="top" src="https://placebear.com/500/500" />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default MovieCard
