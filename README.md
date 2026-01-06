# Database
MongoDB was used, to run database in docker container run following command:
```
docker run -d \
  --name some-mongo \
  --network=host \
  mongo:latest \
  mongod --replSet rs0 --bind_ip_all

#To support transactions run:
mongosh localhost:27017 --eval "rs.initiate()"
```

# Endpoints

## Get list of all products
GET /products: Retrieve a list of all products.

## Create a new product
POST /products: Create a new product (fields: name, description, price,
stock; all required, max length 50).

e.g.
```
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{
    "name": "Mechanical Keyboard",
    "description": "RGB mechanical keyboard",
    "price": -129.99,
    "stock": 25
}'
```

## Restock product
POST /products/:id/restock: to increase the stock level of a product.

```
curl -X POST http://localhost:3000/products/695d692792d05574ecc9aadc/restock \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 10
  }'
```

## Sell products
POST /products/:id/sell: to decrease the stock level of a product. Ensure
the stock cannot go below zero.

```
curl -X POST http://localhost:3000/products/695d692792d05574ecc9aadc/sell \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 5
  }'
```

## Create new order
POST /orders: Create a new order (fields: customerId, products).
```
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customerId": "cust-123",
    "products": [
      { "productId": "695d82bd56984cd5237b2be8", "quantity": 2 },
      { "productId": "695d82bd56984cd5237b2be8", "quantity": 1 }
    ]
  }'
```