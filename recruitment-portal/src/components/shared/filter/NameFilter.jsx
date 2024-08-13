import { useState } from "react";
import { Row, Col, Form, Container } from "react-bootstrap";

export function NameFilter({ setNameUsedForFilter }) {
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setNameUsedForFilter(name);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <Row>
          <Col>
            <input
              className="form form-control"
              type="text"
              value={name}
              onChange={handleChange}
              placeholder="search name"
            />
          </Col>
          <Col>
            <input className="btn btn-primary" type="submit" value="search" />
          </Col>
        </Row>
      </Container>
    </Form>
  );
}
