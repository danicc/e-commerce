# E-commerce - challenge

This is an e-commerce SPA made with `React` as the main technology.

## Running Locally

1. git clone this repo and go the the cloned repo
2. `npm install`
3. `npm run dev`

## Some libraries and techs used

1. parcel - used to bundle the project, easy to set up.
2. react-bootstrap - This helps me with the responsive design and other styles.
3. react-emotion - Used to do css in js and minor styles inside components.

## UX

It's done with the intention to make the user experience very dynamic.

### Product Table

1. Headers are clickable and this event fire an `ASC` or `DESC` sort on the column.
2. Carts on the right add a new product to the shopping cart.
3. Is related to the filter form above. This allow the user get products filtering by any of those values.
4. Search widget will be hidden until the user navigate to a final sublevel. A final sublevel is a menu option that doesn't have any sublevels

<img src="./.static-files/product-table.png" width="300">

<img src="./.static-files/filter-search.png" width="300">

### Shopping cart

1. Is hidden until the user adds a new product from `Products Table`
2. Remove product if it's quantity is equal to 0.
3. After click on `Comprar` it's going to be hidden again.

 <img src="./.static-files/shopping-cart.png" width="300">
