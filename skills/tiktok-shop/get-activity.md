# TikTok Shop API: Get Activity

# Get Activity API Guide

## 1. Purpose
API get promotion details. Use when need check product discount or flash deal status.

## 2. Endpoint
*   **Method**: `GET`
*   **Path**: `/promotion/202309/activities/{activity_id}`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from Get Access Token API (`user_type = 0`).

## 4. Parameters

### Path Parameter
*   `activity_id` (string, required): Target promotion ID.

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier.

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object): Activity details.
    *   `activity_id` (string): Promotion ID.
    *   `title` (string): Promotion name.
    *   `activity_type` (string): Promotion type (e.g., `FIXED_PRICE`).
    *   `duration_type` (string): Duration type (e.g., `INDEFINITE`).
    *   `begin_time` (number): Start time (Unix timestamp).
    *   `end_time` (number): End time (Unix timestamp).
    *   `participation_limit` (array): Limit rules.
    *   `products` (array): Included products.
        *   `id` (string): Product ID.
        *   `activity_price` (object): Promo price.
            *   `amount` (string): Price value.
            *   `currency` (string): Currency code.
        *   `quantity_limit` (number): Limit per buyer. `-1` means no limit.

## 6. Error Codes
*   `17029001`: Invalid parameters. Check inputs.
*   `17029009`: Activity not exist. Check ID.
*   `17029028`: Activity not in shop. Check shop cipher.
*   `17029036`: ActivityType not supported.
*   `17029052`: ProductType not supported.
*   `17029055`: Request Timeout. Retry request.
*   `36009003`: Internal error. Retry request. Contact support if fail.

## 7. Pitfalls & Best Practices
*   **Timestamp expiry**: Request fail if timestamp drift. Sync system clock with NTP.
*   **Signature generation**: Sign calculation must include path and query params. Sort query params alphabetically before sign.
*   **Shop cipher**: Must match shop owning the activity. Wrong cipher cause error `17029028`.

## 8. Code Example

### Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/promotion/202309/activities/7402881377634567979?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Response
```json
{
  "code": 0,
  "data": {
    "activity_id": "7136104329798256386",
    "title": "FlashSale 20230707",
    "activity_type": "FIXED_PRICE",
    "duration_type": "INDEFINITE",
    "begin_time": 1661756811,
    "end_time": 1661856811,
    "participation_limit": [
      {
        "type": "NO_LIMIT"
      }
    ],
    "products": [
      {
        "id": "7136011254174631686",
        "activity_price": {
          "amount": "70500",
          "currency": "IDR"
        },
        "quantity_limit": -1
      }
    ]
  }
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /promotion/202309/activities/{activity_id}`*
