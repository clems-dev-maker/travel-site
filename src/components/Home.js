import React from 'react';
import { Container, Button } from 'react-bootstrap';

function Home() {
  return (
    <Container className="p-5 mb-4 bg-light rounded-3">
      <h1>Welcome to Our Travel Site</h1>
      <p>
        Discover beautiful destinations around the world.
      </p>
      <p>
        <Button variant="primary">Learn more</Button>
      </p>
    </Container>
  );
}

export default Home;
