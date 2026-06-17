# TikTok Shop API: Edit Product

# Edit Product API Guide

### 1. Purpose
Update product. Use when seller change info.

### 2. Endpoint
*   Method: `PUT`
*   Path: `/product/202509/products/{product_id}`

### 3. Auth & Headers
*   Scope: `seller.product.write`
*   Headers:
    ```http
    Authorization: Bearer <ACCESS_TOKEN>
    Content-Type: application/json
    ```

### 4. Parameters
*   **Path Parameter**:
    *   `product_id` (string, required): Product ID.
*   **Body Parameter**:
    *   JSON object. Contain new product data.

### 5. Response
*   Status: `200 OK`
*   Body: JSON confirm success.

### 6. Error Codes
*   `400 Bad Request`: Invalid input data.
*   `401 Unauthorized`: Token dead or missing.
*   `403 Forbidden`: Missing `seller.product.write` scope.
*   `404 Not Found`: `product_id` not exist.

### 7. Pitfalls & Best Practices
*   **Warning**: `PUT` replace whole resource. Send all fields or lose old data.
*   **Safe Update Sequence**:
    1. Retrieve current product state via GET.
    2. Modify desired fields in retrieved object.
    3. Send entire modified object via PUT.

### 8. Code Example
```bash
curl -X PUT "https://api.example.com/product/202509/products/prod_123" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Product Name",
    "price": 19.99
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `PUT /product/202509/products/{product_id}`*
