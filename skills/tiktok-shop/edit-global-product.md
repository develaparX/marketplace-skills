# TikTok Shop API: Edit Global Product

# Edit Global Product API Guide

## 1. Purpose
Update existing global product details. Use when product info changes.

## 2. Endpoint
*   **Method:** `PUT`
*   **Path:** `/product/202309/global_products/{global_product_id}`

## 3. Auth & Headers
*   **Scope:** `seller.global_product.write`
*   **Headers:**
    ```http
    Authorization: Bearer <ACCESS_TOKEN>
    Content-Type: application/json
    ```

## 4. Parameters
*   **Path Parameter:**
    *   `global_product_id` (string, required): Unique ID of global product.
*   **Request Body:**
    *   JSON object containing updated product fields.

## 5. Response
*   **Success:** `200 OK`
*   **Body:** JSON object confirming update status.

## 6. Error Handling
*   `400 Bad Request`: Invalid JSON payload.
*   `401 Unauthorized`: Missing or invalid token.
*   `403 Forbidden`: Missing `seller.global_product.write` scope.
*   `404 Not Found`: `global_product_id` does not exist.

## 7. Pitfalls & Best Practices
*   **Warning: PUT replaces the entire resource. Follow these steps to prevent data loss:**
    1. Retrieve the current product data using GET first.
    2. Modify the necessary fields in the retrieved payload.
    3. Send the complete payload back via the PUT request. Missing fields may be deleted or reset to defaults.
*   **Rate Limits:** Avoid rapid sequential updates. Group changes.

## 8. Code Example
```bash
curl -X PUT "https://api.example.com/product/202309/global_products/GP12345" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Product Name",
    "price": 99.99
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `PUT /product/202309/global_products/{global_product_id}`*
