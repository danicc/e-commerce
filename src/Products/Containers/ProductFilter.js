import React from "react";
import styled, { css } from "react-emotion";
import { Button, Row, Col } from "react-bootstrap";

const rowContainer = css`
  margin: 0 0 10px 0;
`;

const ButtonContainer = styled("div")`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 90px;
`;

class ProductFilter extends React.Component {
  state = {
    availability: "both",
    priceFrom: "",
    priceTo: "",
    stock: ""
  };

  handleAvailabilityChange = e => {
    this.setState({
      availability: e.target.value
    });
  };

  handlePriceFromChange = e => {
    const priceFrom = e.target.value ? parseFloat(e.target.value) : "";
    this.setState({
      priceFrom
    });
  };

  handlePriceToChange = e => {
    const priceTo = e.target.value ? parseFloat(e.target.value) : "";
    this.setState({
      priceTo
    });
  };

  handleStockChange = e => {
    const stock = e.target.value ? parseFloat(e.target.value) : "";
    this.setState({
      stock
    });
  };

  handleOnSubmit = e => {
    e.preventDefault();
    const { handleFilter } = this.props;
    const { availability, priceFrom, priceTo, stock } = this.state;
    handleFilter(availability, priceFrom, priceTo, stock);
  };

  render() {
    const { isShoppingCartVisible } = this.props;
    return (
      <div className={rowContainer}>
        <p>Filtrar por </p>
        <form onSubmit={this.handleOnSubmit}>
          <Row>
            <Col xs={12} sm={4} lg={isShoppingCartVisible ? 3 : 2}>
              <label htmlFor="availability">
                Disponibilidad <br />
                <select
                  id="availability"
                  value={this.state.availability}
                  onChange={this.handleAvailabilityChange}
                  onBlur={this.handleAvailabilityChange}
                >
                  <option value="both">Ambos</option>
                  <option value="available">Disponible</option>
                  <option value="notAvailable">No Disponibles</option>
                </select>
              </label>
              <br />
              <label htmlFor="stockQuantity">
                Stock:
                <br />
                <input
                  type="number"
                  min="0"
                  onChange={this.handleStockChange}
                  value={this.state.stock}
                  placeholder="Cantidad"
                />
              </label>
            </Col>
            <Col xs={12} sm={4} lg={isShoppingCartVisible ? 4 : 2}>
              <label htmlFor="priceRangeFrom">
                Precios Desde: <br />
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={this.state.priceFrom}
                  onChange={this.handlePriceFromChange}
                  placeholder="Monto en pesos"
                />
              </label>
              <label htmlFor="priceRangeTo">
                Hasta: <br />
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={this.state.priceTo}
                  onChange={this.handlePriceToChange}
                  placeholder="Monto en pesos"
                />
              </label>
            </Col>
            <Col xs={12} sm={4} lg={isShoppingCartVisible ? 4 : 2}>
              <ButtonContainer>
                <Button bsStyle="primary" type="submit">
                  Filtrar
                </Button>
              </ButtonContainer>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default ProductFilter;
