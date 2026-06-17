# TikTok Shop API: Search Manufacturers

# Search Manufacturers API Implementation Guide

### 1. Purpose
Search manufacturer data. Use to find manufacturer details, regional contact info, trade names.

### 2. Endpoint
*   **Method**: `POST` (Recommended for search query body) or `GET`
*   **Path**: `/`

### 3. Headers & Auth
*   `Authorization`: `Bearer <token>`
*   `Content-Type`: `application/json`

### 4. Parameters
Spec lacks parameters. Use standard search parameters:
*   `q` (string): Search query.
*   `limit` (integer): Max results.
*   `offset` (integer): Pagination offset.

### 5. Response Structure
Success response:
```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "manufacturers": [
      {
        "id": "string",
        "regional_profiles": [
          {
            "locale": "string",
            "name": "string",
            "registered_trade_name": "string",
            "email": "string",
            "phone_number": {
              "availability": "string",
              "country_code": "string",
              "local_number": "string"
            },
            "address": "string"
          }
        ]
      }
    ]
  }
}
```

### 6. Error Handling
*   `code` non-zero: Request failed.
*   `message`: Contains error details.
*   `request_id`: Log this ID for debugging.

### 7. Pitfalls & Best Practices
*   **Multiple Locales**: `regional_profiles` is array. Filter by user locale.
*   **Phone Availability**: Check `phone_number.availability` status before showing number to user.
*   **Caching**: Cache manufacturer details. Data changes rarely.

### 8. Code Example
```bash
curl -X POST https://api.example.com/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"q": "electronics", "limit": 10}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
