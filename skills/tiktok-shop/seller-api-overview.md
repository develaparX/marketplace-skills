# TikTok Shop API: Seller API overview

# Seller API Overview Implementation Guide

## 1. Purpose
Get active shops. Check global product permissions. Use at login or dashboard load.

## 2. Endpoint
* **Method:** `GET`
* **Path:** `/api/v1/seller/overview`

## 3. Headers & Auth
* `Authorization: Bearer <token>` (Required. JWT token.)
* `Accept: application/json`

## 4. Parameters
Query parameters:
* `include_inactive` (boolean, optional): Default `false`. Set `true` to get inactive shops.

## 5. Response Structure
Returns JSON.

```json
{
  "shops": [
    {
      "id": "string",
      "name": "string",
      "status": "active|inactive"
    }
  ],
  "can_manage_global_products": true
}
```

## 6. Error Handling
* `401 Unauthorized`: Token missing or expired.
* `403 Forbidden`: User lacks seller role.
* `429 Too Many Requests`: Rate limit hit.

## 7. Pitfalls & Best Practices
* Cache shop list. Avoid database load on every page refresh.
* Handle empty `shops` array. New sellers have no shops.

## 8. Code Example
```bash
curl -X GET "https://api.example.com/api/v1/seller/overview?include_inactive=false" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Accept: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `null null`*
