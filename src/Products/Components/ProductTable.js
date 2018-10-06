import React from "react";
import { Table, Glyphicon } from "react-bootstrap";
import styled, { css } from "react-emotion";

import ProductTableHeader from "./ProductTableHeader";

const ShoppingCart = styled("td")`
  text-align: center;
  color: peru;

  &:hover {
    background-color: skyblue;
    color: white;
  }
`;

const centerText = css`
  text-align: center;
`;

const ProductTable = props => {
  const { products, handleOrderBy, orderBy, hanldShoppingCartClick } = props;
  const productsAvailables = products && products.length > 0;

  let tableHeaders = [];
  if (productsAvailables) {
    for (const prop in products[0]) {
      if (prop !== "id" && prop !== "sublevel_id") tableHeaders.push(prop);
    }
  }

  return (
    <div>
      {productsAvailables && (
        <Table responsive bordered striped condensed hover>
          <ProductTableHeader
            tableHeaders={tableHeaders}
            orderBy={orderBy}
            handleOrderBy={handleOrderBy}
          />
          <tbody className={centerText}>
            {products.map(product => {
              return (
                <tr key={product.id}>
                  {tableHeaders.map(productProp => (
                    <td key={product.id + productProp}>
                      {product[productProp].toString()}
                    </td>
                  ))}
                  <ShoppingCart onClick={() => hanldShoppingCartClick(product)}>
                    <Glyphicon glyph="glyphicon glyphicon-shopping-cart" />
                  </ShoppingCart>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default ProductTable;
