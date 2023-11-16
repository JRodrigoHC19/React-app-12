import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

function CharacterLoader() {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState(''); // Nuevo estado para el texto de búsqueda
    const [filteredCharacters, setFilteredCharacters] = useState([]); // Estado para almacenar personajes filtrados

    const loadCharacters = () => {
        setLoading(true);
        axios.get('https://swapi.dev/api/people/')
        .then((response) => {
            setCharacters(response.data.results);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
            setLoading(false);
        });
    };

    useEffect(() => {
        setFilteredCharacters(
            characters.filter((character) =>
                character.name.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }, [searchText, characters]);

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <Container>
            <Row>
                <Col className='mb-4 mt-3'><h1>Personajes de Star Wars</h1></Col>
            </Row>
            <Row>
                <Col xs={9}>
                    <Form.Control
                        type="text"
                        placeholder="Busca tu personaje aquí..."
                        value={searchText} // Asigna el valor del estado al input
                        onChange={handleSearchChange} // Maneja los cambios en la búsqueda
                    />
                </Col>
                <Col xs={3}>
                    <Button
                        onClick={loadCharacters}
                        disabled={loading}
                        className="g-4"
                        variant="secondary"
                    >
                        {loading ? 'Cargando Personajes...' : 'Cargar Personajes'}
                    </Button>
                </Col>
            </Row>

            <Row xs={1} md={2} className="g-5 p-5">
                {filteredCharacters.map((character, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={4}>
                        <Card border="primary" style={{ width: '18rem' }}>
                            <Card.Header>{character.name}</Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <strong>BirthDay</strong> : {character.birth_year}<br/>
                                    <strong>Height</strong> : {character.height} cm<br/>
                                    <strong>Home World</strong> : {character.homeworld}
                                </Card.Text>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <strong>Género:</strong> {character.gender}<br/>
                            </Card.Footer>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default CharacterLoader;
