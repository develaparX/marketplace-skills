# TikTok Shop API: Shipping discount supported areas

# Shipping Discount Supported Areas API

### 1. Overview
API lists regions supporting shipping discounts. Use before create or update promotion. Validate target areas.

### 2. Endpoint
*   **Method:** `GET`
*   **Path:** `/`

### 3. Headers & Auth
*   `Authorization: Bearer <TOKEN>`
*   `Content-Type: application/json`

### 4. Parameters
*   `discount.shipping_discount.area_scope.specific_areas` (Array of Strings, Optional): Filter list by specific regions.
    *   *Supported values:* Indonesia, Ireland, Malaysia, Mexico, Philippines, Saudi Arabia, Singapore, Spain, Thailand, United Kingdom, United States, Vietnam, Japan.

### 5. Response
Returns JSON array of supported areas.
```json
{
  "supported_areas": [
    "US",
    "GB",
    "JP"
  ]
}
```

### 6. Error Handling
*   `400 Bad Request`: Invalid parameter format.
*   `401 Unauthorized`: Missing or expired token.
*   `500 Internal Error`: Server issue.

### 7. Pitfalls & Best Practices
*   **Pitfall:** Hardcoding region list. Regions change.
*   **Best Practice:** Cache response. Data changes rarely. Avoid API rate limits.

### 8. Code Example
```bash
curl -X GET "https://api.example.com/" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
