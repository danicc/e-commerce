import React from "react";
import { Table, Glyphicon, Button } from "react-bootstrap";

const ShoppingCartTable = props => {
  const { shoppingCartProducts, handleEditShoppingCartProductQuantity } = props;

  if (shoppingCartProducts) {
    return (
      <Table responsive bordered striped condensed hover>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio</th>
            <th>SubTotal</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {shoppingCartProducts.map(product => {
            return (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>${(product.price * product.quantity).toFixed(2)}</td>
                <td>
                  <Button
                    onClick={() =>
                      handleEditShoppingCartProductQuantity(1, product)
                    }
                  >
                    <Glyphicon glyph="glyphicon glyphicon-plus" />
                  </Button>
                  <Button
                    onClick={() =>
                      handleEditShoppingCartProductQuantity(-1, product)
                    }
                  >
                    <Glyphicon glyph="glyphicon glyphicon-minus" />
                  </Button>
                  <Button
                    onClick={() =>
                      handleEditShoppingCartProductQuantity(-Infinity, product)
                    }
                  >
                    <Glyphicon glyph="glyphicon glyphicon glyphicon-trash" />
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
};

export default ShoppingCartTable;
