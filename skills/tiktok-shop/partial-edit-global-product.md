# TikTok Shop API: Partial Edit Global Product

# Guide: Partial Edit Global Product

## 1. Purpose
Update specific global product fields. Use to modify details (like price, status) without sending full product data. Prevents accidental overwrites.

## 2. Endpoint
*   **Method:** `PUT`
*   **Path:** `/product/202509/global_products/{global_product_id}/partial_edit`

## 3. Auth & Headers
*   **Scope:** `seller.product.basic`
*   **Headers:**
    *   `Authorization: Bearer <ACCESS_TOKEN>`
    *   `Content-Type: application/json`

## 4. Parameters
### Path Parameters
*   `global_product_id` (string, required): Target product identifier.

### Request Body
JSON object containing only fields to update. Example:
```json
{
  "price": 19.99,
  "status": "ACTIVE"
}
```

## 5. Response
### Success (200 OK)
```json
{
  "global_product_id": "PROD12345",
  "status": "success"
}
```

## 6. Error Codes
*   `400 Bad Request`: Invalid field format.
*   `401 Unauthorized`: Invalid token.
*   `403 Forbidden`: Missing scope `seller.product.basic`.
*   `404 Not Found`: Product ID does not exist.

## 7. Pitfalls & Best Practices
*   **Only send changes:** Omit unchanged fields. Sending null might clear data.
*   **Check scope:** Ensure token has `seller.product.basic` scope.

## 8. Code Example (cURL)
```bash
curl -X PUT "https://api.connector.com/product/202509/global_products/PROD12345/partial_edit" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 29.99
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
