# tasks

### Create a product called Special Item

will be assigned to a new category called Special Items
add at least 2 images during the product creation

- Should be the only item which shows in this category
- create a feature that will show the product's second image when it is hovered on.

### Storefront API buttons

- One at the top of the category page labeled Add All To Cart
- When clicked, the product will be added to the cart
- Notify the user that the product has been added
- One next to the Add All To Cart button which says Remove All Items - shows up only If the cart has an item in it
- When clicked it should clear the cart and notify the user

### Bonus

- If a customer is logged in - at the top of the category page show a banner that shows some customer details (i.e. name, email, phone, etc). This should utilize the data that is rendered via Handlebars on the Customer Object

## My code

The code attempts to change the image of a product card on a website when the user hovers over it. It does this by calling two functions from the `card.html` file; getProductData and `changeProductImageOnHover`.

`getProductData` is an asynchronous function that takes a productId as an argument. It constructs an API endpoint URL using the productId and sets some headers to be used in the request. It then sends a fetch request to the endpoint with the headers and mode: 'no-cors' options. However, this request will fail due to the mode: 'no-cors' option. This option is used to make a request to a different domain, but the server must provide the appropriate CORS headers for the request to succeed. Since the server does not provide these headers, the browser returns an opaque response with a status of 0. As a result, response.json() returns null, and productData.data will be undefined.

`changeProductImageOnHover` is another asynchronous function that takes a card and productId as arguments. It calls getProductData to retrieve product data based on the productId. If the getProductData function works, it uses the data to update the image displayed on the card when the user hovers over it. However, since getProductData fails to retrieve the necessary data, `changeProductImageOnHover` will not work as intended.

Finally, the code selects a product card and extracts its productId. However, since `changeProductImageOnHover` cannot retrieve the necessary data, it will not change the image of the product card when the user hovers over it.

In summary, the code attempts to change the image of a product card on a website when the user hovers over it, but it fails to do so due to a fetch request that does not work as intended.

### preview

https://special-store.mybigcommerce.com/?ctk=dc2d9a5d-c2ac-4125-bafc-09cafbb660a4
code: lvahe2amdd
