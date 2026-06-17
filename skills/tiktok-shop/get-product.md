# TikTok Shop API: Get Product

# Get Product API Implementation Guide

### 1. Overview
Retrieve product properties. Use to sync inventory or show product details. Do not use for frozen or deleted products.

### 2. Endpoint
*   **Method:** `GET`
*   **Path:** `/product/202309/products/{product_id}`

### 3. Authentication & Headers
*   **Scope:** `seller.product.basic`
*   **Headers:**
    *   `Authorization: Bearer <ACCESS_TOKEN>`
    *   `Content-Type: application/json`

### 4. Parameters
*   **Path Parameter:**
    *   `product_id` (string, required): Unique product identifier.

### 5. Response Structure
Returns JSON object:
*   `code` (int): Success/failure code.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier.
*   `data` (object): Product details.

### 6. Error Handling
Handle these specific error codes:
*   `12019150`: Product ID does not exist.
*   `12052032`: Product does not exist.

### 7. Pitfalls & Best Practices
*   **Frozen/Deleted Products:** API fails if product status is FREEZE or DELETED.
*   **Logging:** Save `request_id` to debug API issues with support.

### 8. Code Example
```bash
curl -X GET "https://api.example.com/product/202309/products/12345" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202309/products/{product_id}`*
