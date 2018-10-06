import React from "react";
import { Glyphicon } from "react-bootstrap";
import { css } from "react-emotion";

function isThisHeaderOrdering(currentOrder, header) {
  if (currentOrder.charAt(0) === "-" && currentOrder.substring(1) === header) {
    return "bottom";
  } else if (currentOrder.charAt(0) !== "-" && currentOrder === header) {
    return "top";
  }
  return "";
}

const centerText = css`
  text-align: center;
`;

const ProductTableHeader = props => {
  const { tableHeaders, handleOrderBy, orderBy } = props;

  return (
    <thead>
      <tr>
        {tableHeaders.map(headerTitle => {
          const isSelected = isThisHeaderOrdering(orderBy, headerTitle);
          let SortIcon = <span />;
          if (isSelected) {
            SortIcon = (
              <Glyphicon
                data-index={headerTitle}
                onClick={handleOrderBy}
                glyph={
                  isSelected === "top"
                    ? "glyphicon glyphicon-arrow-up"
                    : "glyphicon glyphicon-arrow-down"
                }
              />
            );
          }
          return (
            <th
              className={centerText}
              key={headerTitle}
              data-index={headerTitle}
              onClick={handleOrderBy}
            >
              {isSelected && SortIcon}
              {headerTitle}
            </th>
          );
        })}
        <th />
      </tr>
    </thead>
  );
};

export default ProductTableHeader;
