# TikTok Shop API: Customer engagement API overview

# Customer Engagement API Integration Guide

## 1. Purpose
Connect CRM platform to TikTok Shop. Use to sync customer data and track engagement.

## 2. Endpoint
*   **Method:** GET
*   **Path:** `/`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Authentication
Need TikTok Shop developer account. Get access token.
Headers:
```http
Content-Type: application/json
x-tts-access-token: YOUR_ACCESS_TOKEN
```

## 4. Parameters
None.

## 5. Response Structure
Returns service status.
```json
{
  "code": 0,
  "message": "success",
  "data": {
    "status": "online"
  }
}
```

## 6. Error Handling
*   `401`: Token invalid. Refresh token.
*   `403`: No permission. Check app scopes.
*   `429`: Rate limit hit. Wait, retry.

## 7. Pitfalls & Best Practices
*   Token expire. Store refresh token.
*   Rate limit low. Use queue.

## 8. Code Example
```bash
curl -X GET "https://open-api.tiktokglobalshop.com/" \
  -H "Content-Type: application/json" \
  -H "x-tts-access-token: YOUR_ACCESS_TOKEN"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
