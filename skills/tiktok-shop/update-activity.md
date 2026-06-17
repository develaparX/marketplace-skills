# TikTok Shop API: Update Activity

# Guide: Update Activity API

## 1. Purpose
Modify active discount or flash sale. Use when title, start, or end time change.

## 2. Endpoint
*   **Method**: `PUT`
*   **Path**: `/promotion/202309/activities/{activity_id}`

## 3. Headers & Auth
*   `Content-Type`: `application/json`
*   `x-tts-access-token`: Seller access token (user_type = 0).
*   `app_key`: Unique app key.
*   `sign`: Request signature.
*   `timestamp`: Unix timestamp GMT (UTC+00:00).
*   `shop_cipher`: Shop identifier.

## 4. Parameters

### Path Parameter
*   `activity_id` (string, required): Target activity ID.

### Body Parameters (JSON)
*   `title` (string, required): Activity name. Max 50 characters. Must be unique.
*   `begin_time` (number, required): Start time. Unix timestamp. Must be greater than current time.
*   `end_time` (number, required): End time. Unix timestamp.
*   `duration_type` (string, optional): Time type. Values: `NORMAL`, `INDEFINITE`.
*   `product_level` (string, optional): Product dimension. Values: `PRODUCT`, `VARIATION`, `SHOP`.
*   `participation_limit` (array, optional): Buyer purchase limit.
*   `discount` (object, optional): Discount details.
*   `target_user_info` (object, optional): Target user segment.

## 5. Response Structure
```json
{
  "code": 0,
  "message": "success",
  "request_id": "20230907...",
  "data": {}
}
```
*   `code` (number): Status code. Zero means success.
*   `message` (string): Status message.
*   `request_id` (string): Request log identifier.
*   `data` (object): Return payload.

## 6. Error Handling
Check response `code`. Non-zero means fail. Save `request_id` for debug. 

## 7. Pitfalls & Best Practices
*   `begin_time` must be future timestamp. Past timestamp causes error.
*   `title` must be unique. Duplicate title causes error.
*   `title` limit 50 characters. Excess characters cause validation failure.

## 8. Code Example (cURL)
```bash
curl -X PUT "https://api.example.com/promotion/202309/activities/ACT12345" \
  -H "Content-Type: application/json" \
  -H "x-tts-access-token: token_val" \
  -H "app_key: key_val" \
  -H "sign: sign_val" \
  -H "timestamp: 1700000000" \
  -H "shop_cipher: cipher_val" \
  -d '{
    "title": "New Flash Sale Title",
    "begin_time": 1700006400,
    "end_time": 1700092800,
    "duration_type": "NORMAL",
    "product_level": "PRODUCT"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `PUT /promotion/202309/activities/{activity_id}`*
