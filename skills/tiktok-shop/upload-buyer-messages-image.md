# TikTok Shop API: Upload Buyer Messages Image

# Upload Buyer Messages Image API

## 1. Purpose
Upload image file. Use before Send Message API.

## 2. Endpoint
*   **Method**: `POST`
*   **URL**: `https://open-api.tiktokglobalshop.com/customer_service/202309/images/upload`

## 3. Headers & Auth
*   `content-type`: `multipart/form-data`
*   `x-tts-access-token`: Seller access token. Get from Get Access Token API. Must use `user_type = 0`.

## 4. Parameters

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier.

### Body Parameters
*   `data` (binary, required): Image file. Format: jpg, gif, webp, png. Max size: 10MB.

## 5. Response Structure
JSON response:
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object):
    *   `url` (string): Uploaded image URL.
    *   `width` (number): Image width.
    *   `height` (number): Image height.

## 6. Error Handling
Check `code` field.
*   `45101001` / `45101008`: Internal error. Retry later. Contact support if fail.
*   `36009003`: Internal error. Retry. Contact support if fail.

## 7. Pitfalls & Best Practices
*   **Image size**: Keep under 10MB. Large files fail.
*   **Format restriction**: Use jpg, gif, webp, png. Other formats fail.
*   **Token type**: Use seller token (`user_type = 0`). Buyer token fails.
*   **Sequence**: Upload image first. Use returned `url` in Send Message API.

## 8. Code Example
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/customer_service/202309/images/upload?app_key=YOUR_APP_KEY&sign=YOUR_SIGN&timestamp=YOUR_TIMESTAMP&shop_cipher=YOUR_SHOP_CIPHER' \
  -H 'x-tts-access-token: YOUR_ACCESS_TOKEN' \
  -H 'content-type: multipart/form-data' \
  -F 'data=@"/path/to/image.png"'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /customer_service/202309/images/upload`*
