# TikTok Shop API: Logistic API overview

# Logistic API Overview Integration Guide

## 1. Purpose
API give overview of logistic resources. Use to discover warehouses, delivery options, shipping providers. Run at integration start.

## 2. Endpoint
* **Method:** `GET`
* **Path:** `/`

## 3. Headers & Auth
* `Authorization: Bearer <token>` (Required)
* `Accept: application/json` (Required)

## 4. Parameters
None.

## 5. Response Structure
Return JSON map of available resource endpoints.

### Example Response
```json
{
  "resources": {
    "warehouses": "/warehouses",
    "delivery_options": "/delivery-options",
    "shipping_providers": "/shipping-providers"
  }
}
```

## 6. Error Handling
* `401 Unauthorized`: Token missing or invalid.
* `429 Too Many Requests`: Rate limit hit.
* `500 Internal Server Error`: Server failure.

## 7. Pitfalls & Best Practices
* **Do not hardcode paths:** Use URLs returned in response. Paths can change.
* **Cache response:** Resource locations change rarely. Cache to prevent rate limits.

## 8. Code Example
```bash
curl -X GET "https://api.example.com/" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
