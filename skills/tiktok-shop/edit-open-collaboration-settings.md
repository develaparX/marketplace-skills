# TikTok Shop API: Edit Open Collaboration Settings

# Edit Open Collaboration Settings API Guide

## 1. Purpose
API enrolls seller products into open collaboration plan. Use to automate affiliate program signups for current and future products.

## 2. Endpoint
*   **Method:** `POST`
*   **URL:** `https://open-api.tiktokglobalshop.com/affiliate_seller/202405/open_collaboration_settings`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from Get Access Token, user_type = 0)

## 4. Parameters

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier.

### Body Parameters
*   `auto_add_product` (object, optional): Settings for auto-adding products.
    *   `enable` (boolean): Turn on/off auto-add.
    *   `commission_rate` (number): Commission rate (e.g., 1000 = 10.00%).

## 5. Response Structure
*   `code` (number): Status code (0 = success).
*   `message` (string): Status message.
*   `request_id` (string): Log identifier.
*   `data` (object): Return data.

## 6. Error Handling
*   Check `code` field. If non-zero, request failed.
*   Save `request_id` to debug failed calls.

## 7. Pitfalls & Best Practices
*   **Commission Rate:** Value 1000 equals 10%. Verify rate scaling before sending.
*   **Signature:** Generate `sign` using correct timestamp. Outdated timestamp causes auth failure.
*   **Token:** Use seller token. Developer token fails.

## 8. Code Example
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_seller/202405/open_collaboration_settings?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json' \
  -d '{
    "auto_add_product": {
      "enable": true,
      "commission_rate": 1000
    }
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202405/open_collaboration_settings`*
