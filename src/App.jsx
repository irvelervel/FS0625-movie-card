import { Col, Container, Row, Form } from 'react-bootstrap'
import './App.css'
import { Component } from 'react'
import MovieCard from './components/MovieCard'

class App extends Component {
  state = {
    movieTitle: 'Iron Man',
  }

  render() {
    return (
      <Container fluid className="min-vh-100 bg-body-secondary">
        <Row className="justify-content-center pt-3">
          <Col xs={12} md={4} className="text-center">
            <h1>Scegli il tuo film</h1>
            <Form.Select
              className="mt-3"
              // INPUT CONTROLLATO -> collego allo state "value" e "onChange"
              value={this.state.movieTitle}
              onChange={(e) => {
                this.setState({
                  movieTitle: e.target.value,
                })
              }}
            >
              <option>Iron Man</option>
              <option>The Avengers</option>
              <option>Thor</option>
              <option>Black Widow</option>
              <option>Ant-Man</option>
            </Form.Select>
          </Col>
        </Row>
        <Row className="justify-content-center mt-5">
          <Col xs={12} md={6}>
            {/* qui monto il componente MovieCard */}
            <MovieCard movieTitle={this.state.movieTitle} />
            {/* fornisco a MovieCard il valore selezionato dalla tendina, che salvo nello stato */}
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App
