# TikTok Shop API: Partial Edit Product

# Implementation Guide: Partial Edit Product

## 1. Purpose
Update specific product fields. Avoid full product overwrite. Use for quick updates like price, stock, or title changes.

## 2. Endpoint
*   **Method:** `POST`
*   **Path:** `/product/202509/products/{product_id}/partial_edit`

## 3. Headers & Authentication
*   `Authorization`: Bearer token
*   `Content-Type`: `application/json`
*   **Required Scope:** `seller.product.write`

## 4. Parameters

### Path Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `product_id` | String | Yes | Unique identifier of product |

### Request Body
Pass only fields needing update.
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | String | No | New product title |
| `price` | Number | No | New product price |
| `stock` | Integer | No | New stock quantity |

## 5. Response Structure
Returns status of update.

```json
{
  "status": "success",
  "product_id": "string",
  "updated_fields": []
}
```

## 6. Error Handling
*   `400 Bad Request`: Invalid field type or value.
*   `401 Unauthorized`: Missing or expired token.
*   `403 Forbidden`: Missing `seller.product.write` scope.
*   `404 Not Found`: `product_id` does not exist.

## 7. Pitfalls & Best Practices
*   **No Nulls:** Do not send null values unless clearing field content.
*   **Rate Limits:** Batch updates if API limits call frequency.
*   **Validation:** Check input formats before sending request.

## 8. Code Example

```bash
curl -X POST "https://api.example.com/product/202509/products/12345/partial_edit" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "price": 19.99,
    "stock": 150
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202509/products/{product_id}/partial_edit`*
