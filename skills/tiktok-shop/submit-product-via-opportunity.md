# TikTok Shop API: Submit Product via Opportunity

# Submit Product via Opportunity API Implementation Guide

## 1. Overview
Submit product to opportunity lead. Use when seller match product to lead. Product status must be ACTIVATE.

## 2. Endpoint
*   **Method**: `POST`
*   **Path**: `/product/202604/opportunities/{opportunity_id}/submit`

## 3. Headers
*   `Content-Type`: `application/json`
*   `x-tts-access-token`: Seller access token.

## 4. Parameters

### Path Parameters
*   `opportunity_id` (string, required): Target opportunity lead ID.

### Query Parameters
*   `app_key` (string, required): App key.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp GMT.
*   `shop_cipher` (string, required): Shop cipher.

### Body Parameters (JSON)
*   `product_id` (string, required): TikTok Shop product ID. Must be ACTIVATE status.

## 5. Response Structure
```json
{
  "code": 0,
  "message": "success",
  "request_id": "202604...",
  "data": {}
}
```
*   `code` (number): Status code. Zero is success.
*   `message` (string): Status message.
*   `request_id` (string): Log ID for debug.
*   `data` (object): Return details.

## 6. Error Handling
Check `code` field. Non-zero code mean error. Log `request_id` for support. 

## 7. Pitfalls & Best Practices
*   **Product Status**: Check product status before call. Inactive product cause failure.
*   **Signature**: Calculate signature after build query string. Wrong signature block request.
*   **Timestamp**: Use GMT Unix timestamp. Out of sync timestamp reject.

## 8. Code Example
```bash
curl -X POST "https://api.tiktokshop.com/product/202604/opportunities/OPP12345/submit?app_key=your_app_key&sign=calculated_signature&timestamp=1711843200&shop_cipher=your_shop_cipher" \
  -H "Content-Type: application/json" \
  -H "x-tts-access-token: your_access_token" \
  -d '{
    "product_id": "prod_99999"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202604/opportunities/{opportunity_id}/submit`*
