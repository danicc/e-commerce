import React from "react";
import { Panel, Alert } from "react-bootstrap";

const Products = props => {
  const { selectedLevelName, showBuyAlert } = props;
  return (
    <Panel>
      <Panel.Heading>{selectedLevelName} </Panel.Heading>
      <Panel.Body>
        {showBuyAlert && (
          <Alert bsStyle="success">
            <h4>Compra exitosa</h4>
            <p>Gracias por su compra</p>
          </Alert>
        )}
        {props.children}
      </Panel.Body>
    </Panel>
  );
};

export default Products;
