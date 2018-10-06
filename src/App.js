import React from "react";
import { Grid, Row, Col } from "react-bootstrap";

import { getProductsBySublevel, getProductsByFilter } from "./api";
import { dynamicSort, storageAvailable } from "./utils";
import { AppNav } from "./AppNav";
import { Products, ProductFilter, ProductTable } from "./Products";
import { SearchBox } from "./widgets";
import { ShoppingCart } from "./ShoppingCart";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.SHOPING_CART_PRODUCTS = "shoppingCartProducts";
    this.defaultOrderBy = "quantity";
    const products = getProductsBySublevel(1);
    const currentProducts = products.sort(dynamicSort(this.defaultOrderBy));

    this.state = {
      selectedLevelName: "Gaseosas",
      isFinalSublevel: false,
      orderBy: this.defaultOrderBy,
      products,
      currentProducts: currentProducts,
      shoppingCartProducts: [],
      showBuyAlert: false
    };
  }

  componentDidMount() {
    if (
      storageAvailable("localStorage") &&
      localStorage.hasOwnProperty(this.SHOPING_CART_PRODUCTS)
    ) {
      let value = localStorage.getItem(this.SHOPING_CART_PRODUCTS);
      let localShoppingCartProducts = JSON.parse(value);

      this.setState({
        shoppingCartProducts: localShoppingCartProducts
      });
    }
  }

  saveLocalStorage = newShoppingCartProducts => {
    const shoppingJson = JSON.stringify(newShoppingCartProducts);

    if (storageAvailable("localStorage")) {
      localStorage.setItem(this.SHOPING_CART_PRODUCTS, shoppingJson);
    }
  };

  handleMenuClick = (levelId, levelName, isFinalSublevel) => {
    const products = getProductsBySublevel(levelId);
    this.setState({
      selectedLevelName: levelName,
      products,
      isFinalSublevel
    });

    this.orderProducts(this.defaultOrderBy, products);
  };

  handleFilter = (availability, priceFrom, priceTo, stock) => {
    const priceFilter =
      priceFrom >= 0 && priceTo
        ? {
            from: priceFrom,
            to: priceTo
          }
        : {};

    const currentProducts = getProductsByFilter(
      this.state.products,
      availability,
      priceFilter,
      stock
    );

    this.orderProducts(this.state.orderBy, currentProducts);
  };

  handleOrderBy = event => {
    let orderBy = event.target.dataset.index;
    let currentOrderBy = this.state.orderBy;
    orderBy =
      currentOrderBy.charAt(0) !== "-" && currentOrderBy === orderBy
        ? `-${orderBy}`
        : orderBy;

    this.orderProducts(orderBy, this.state.currentProducts);
  };

  orderProducts(orderBy, products) {
    const currentProducts = [...products].sort(dynamicSort(orderBy));

    this.setState({
      currentProducts,
      orderBy
    });
  }

  handleShoppingCartClick = product => {
    const { shoppingCartProducts } = this.state;
    let alreadyExist = false;

    let newShoppingCartProducts = shoppingCartProducts.map(
      shoppingCartProduct => {
        if (shoppingCartProduct.id === product.id) {
          alreadyExist = true;
          return {
            id: shoppingCartProduct.id,
            name: shoppingCartProduct.name,
            price: shoppingCartProduct.price,
            quantity: shoppingCartProduct.quantity + 1
          };
        }
        return shoppingCartProduct;
      }
    );

    if (!alreadyExist) {
      newShoppingCartProducts.push({
        id: product.id,
        name: product.name,
        quantity: 1,
        price: parseFloat(product.price.substring(1).replace(",", "."))
      });
    }

    this.setState({
      shoppingCartProducts: newShoppingCartProducts
    });

    this.saveLocalStorage(newShoppingCartProducts);
  };

  updateShoppingCartProduct(value, product) {
    let newShoppingCartProducts = this.state.shoppingCartProducts.reduce(
      (shoppingCartProductsAcum, shoppingCartProduct) => {
        if (shoppingCartProduct.id === product.id) {
          let quantity = shoppingCartProduct.quantity + value;
          if (quantity > 0) {
            shoppingCartProductsAcum.push({
              id: shoppingCartProduct.id,
              name: shoppingCartProduct.name,
              price: shoppingCartProduct.price,
              quantity
            });
          }
          return shoppingCartProductsAcum;
        }
        shoppingCartProductsAcum.push(shoppingCartProduct);
        return shoppingCartProductsAcum;
      },
      []
    );
    return newShoppingCartProducts;
  }

  handleEditShoppingCartProductQuantity = (value, product) => {
    const newShoppingCartProducts = this.updateShoppingCartProduct(
      value,
      product
    );
    this.setState({
      shoppingCartProducts: newShoppingCartProducts
    });
    this.saveLocalStorage(newShoppingCartProducts);
  };

  handleBuyClick = () => {
    localStorage.removeItem(this.SHOPING_CART_PRODUCTS);
    this.setState({
      shoppingCartProducts: [],
      showBuyAlert: true
    });

    setTimeout(() => {
      this.setState({
        showBuyAlert: false
      });
    }, 2000);
  };

  handleSearchProduct = searchText => {
    const searchResult = this.state.products.filter(
      product => product.name.startsWith(searchText) || !searchText
    );
    this.orderProducts(this.state.orderBy, searchResult);
  };

  render() {
    return (
      <React.Fragment>
        <AppNav handleMenuClick={this.handleMenuClick} />
        <Grid fluid>
          <Row>
            <Col>
              <h1>{this.state.selectedLevelName}</h1>
            </Col>
          </Row>
          <Row>
            <Col
              xs={12}
              md={this.state.shoppingCartProducts.length > 0 ? 7 : 12}
            >
              <Products
                showBuyAlert={this.state.showBuyAlert}
                selectedLevelName={this.state.selectedLevelName}
              >
                <ProductFilter
                  handleFilter={this.handleFilter}
                  isShoppingCartVisible={
                    this.state.shoppingCartProducts.length > 0
                  }
                />
                {this.state.isFinalSublevel && (
                  <SearchBox
                    handleSearch={this.handleSearchProduct}
                    placeholder="nombre del producto"
                  />
                )}
                <ProductTable
                  products={this.state.currentProducts}
                  orderBy={this.state.orderBy}
                  handleOrderBy={this.handleOrderBy}
                  hanldShoppingCartClick={this.handleShoppingCartClick}
                />
              </Products>
            </Col>
            {this.state.shoppingCartProducts.length > 0 && (
              <Col xs={12} md={5}>
                <ShoppingCart
                  shoppingCartProducts={this.state.shoppingCartProducts}
                  handleEditShoppingCartProductQuantity={
                    this.handleEditShoppingCartProductQuantity
                  }
                  handleBuyClick={this.handleBuyClick}
                />
              </Col>
            )}
          </Row>
        </Grid>
      </React.Fragment>
    );
  }
}

export default App;
