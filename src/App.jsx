import { useEffect, useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";

import { Header, Chart } from "./components";
import { getContainers, getDataById } from "./services/containers";

const App = () => {
  const [initDate, setInitDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [containers, setContainers] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getContainers();
      setContainers(data);
    })();
  }, []);

  const handleChangeContainer = async (event) => {
    const id = event.target.value;
    const data = await getDataById(id);
    setInitDate("");
    setEndDate("");
    setData(data);
  };

  const handleChange = async (event) => {
    const value = event.target.value;
    const name = event.target.name;

    if (name === "init_date") {
      setInitDate(value);
    } else {
      setEndDate(value);
    }
  };

  const filterDataByDate = () => {
    if (initDate === "" || endDate === "") {
      return;
    }
    let dataByDate = data.filter(
      (register) =>
        new Date(initDate).getTime() <= new Date(register.date).getTime() &&
        new Date(register.date).getTime() <= new Date(endDate).getTime()
    );
    setData(dataByDate);
  };

  if (containers.length === 0) return <h1>Cargando...</h1>;

  return (
    <>
      <Header />
      <Container>
        <Row md={12} className="mt-4">
          <Form.Group as={Col}>
            <Form.Label>Seleccione Container</Form.Label>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => handleChangeContainer(e)}
            >
              <option value="0">Seleccione una opción</option>
              {containers.map((container, index) => (
                <option key={index} value={container.id}>
                  {container.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Fecha inicio</Form.Label>
            <Form.Control
              type="date"
              name="init_date"
              value={initDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label>Fecha Fin</Form.Label>
            <Form.Control
              type="date"
              name="end_date"
              value={endDate}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} className="mt-4">
            <Button onClick={filterDataByDate}>Aplicar filtros</Button>
          </Form.Group>
        </Row>
      </Container>
      <Container className="d-flex justify-content-center mt-5">
        <Chart data={data} />
      </Container>
    </>
  );
};

export default App;
