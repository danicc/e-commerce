import React from "react";
import { Panel, Button } from "react-bootstrap";

import ShoppingCartTable from "./ShoppingCartTable";
import { getTotalOfProducts } from "../../utils";

const ShoppingCart = props => {
  const {
    shoppingCartProducts,
    handleEditShoppingCartProductQuantity,
    handleBuyClick
  } = props;
  return (
    <Panel>
      <Panel.Heading>Carrito de compras</Panel.Heading>
      <Panel.Body>
        <ShoppingCartTable
          shoppingCartProducts={shoppingCartProducts}
          handleEditShoppingCartProductQuantity={
            handleEditShoppingCartProductQuantity
          }
        />
        <p>
          {`Total de la compra: $${getTotalOfProducts(shoppingCartProducts)}`}
        </p>
        <Button bsStyle="success" onClick={handleBuyClick}>
          Comprar
        </Button>
      </Panel.Body>
    </Panel>
  );
};

export default ShoppingCart;
