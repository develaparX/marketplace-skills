# TikTok Shop API: Products API overview

Data converted. Document ready.

# Products API Implementation Guide

## 1. Purpose
Manage product catalog at scale. Use to:
* Sync inventory from ERP.
* Create, edit, delete, retrieve products.

## 2. Endpoints
Base URL: `https://api.example.com/v1`

| Method | Path | Action |
| :--- | :--- | :--- |
| `GET` | `/products` | List products |
| `POST` | `/products` | Create product |
| `GET` | `/products/{id}` | Get single product |
| `PUT` | `/products/{id}` | Update product |
| `DELETE` | `/products/{id}` | Delete product |

## 3. Headers & Auth
All requests require:
* `Authorization: Bearer <API_TOKEN>`
* `Content-Type: application/json`

## 4. Parameters (POST /products)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `sku` | String | Yes | Unique stock keeping unit. |
| `name` | String | Yes | Product title. |
| `price` | Decimal | Yes | Unit price. Must be > 0. |
| `description` | String | No | Product details. |
| `stock` | Integer | No | Initial inventory count. Default 0. |

## 5. Response Structure (POST /products - 201 Created)
```json
{
  "id": "prod_98765",
  "sku": "SKU-123-ABC",
  "name": "Widget A",
  "price": 19.99,
  "description": "High quality widget",
  "stock": 100,
  "created_at": "2023-10-27T10:00:00Z"
}
```

## 6. Error Handling
* `400 Bad Request`: Missing required fields or invalid types.
* `401 Unauthorized`: Missing or invalid token.
* `404 Not Found`: Product ID does not exist.
* `409 Conflict`: SKU already exists.
* `429 Too Many Requests`: Rate limit exceeded.

## 7. Pitfalls & Best Practices
* **SKU Collisions**: Ensure SKU unique before POST.
* **Rate Limits**: Limit 100 requests per minute. Use batch endpoints if available.
* **Caching**: Cache GET responses to reduce load.

## 8. Code Example (cURL)
```bash
curl -X POST https://api.example.com/v1/products \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sku": "SKU-123-ABC",
    "name": "Widget A",
    "price": 19.99,
    "description": "High quality widget",
    "stock": 100
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `null null`*
