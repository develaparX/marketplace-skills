# TikTok Shop API: Get Shipping Providers

# Guide: Get Shipping Providers

## 1. Purpose
Fetch active shipping carriers. Use during checkout setup or shipping cost calculation.

## 2. Endpoint
*   **Method:** `GET`
*   **Path:** `/`

## 3. Headers & Auth
*   `Authorization: Bearer <token>` (Required)
*   `Accept: application/json` (Required)

## 4. Parameters
None.

## 5. Response
Returns JSON array of providers.

Example:
```json
[
  {
    "id": "ship_dhl_01",
    "name": "DHL Express",
    "enabled": true
  }
]
```

## 6. Errors
*   `401 Unauthorized`: Token missing or invalid.
*   `500 Internal Error`: Server issue. Retry with backoff.

## 7. Pitfalls & Best Practices
*   **Cache data:** Provider list changes rarely. Cache 24 hours to save API calls.
*   **Handle empty list:** Code must handle empty array `[]` safely.

## 8. Code Example
```bash
curl -X GET "https://api.example.com/" \
  -H "Authorization: Bearer API_KEY" \
  -H "Accept: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /`*
