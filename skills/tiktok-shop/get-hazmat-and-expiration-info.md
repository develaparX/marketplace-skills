# TikTok Shop API: Get Hazmat And Expiration Info

# Get Hazmat and Expiration Info API

## 1. Purpose
API gets hazmat and expiration rules for TikTok Shop SKU IDs. Use before inbound shipping. Check if SKU need special handling or expiration tracking.

## 2. Endpoint
*   **Method**: `POST`
*   **URL**: `https://open-api.tiktokglobalshop.com/fbt/202603/goods/hazmat_and_expiration_info/search`

## 3. Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (use token where `user_type` = 0)

## 4. Parameters

### Query Parameters
*   `app_key` (string, required): Unique app identifier.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp UTC.
*   `shop_cipher` (string, required): Shop identifier.

### Body Parameters (JSON)
*   `tts_sku_ids` (array of strings, required): TikTok Shop SKU IDs.

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier.
*   `data` (object): Payload container.
    *   `hazmat_and_expiration_info` (object):
        *   `hazmat_and_expiration_dto_list` (array):
            *   `tts_sku_id` (string): SKU ID.
            *   `is_hazmat` (boolean): True if item is hazardous.
            *   `is_lot_code` (boolean): True if item uses lot code.
            *   `is_expiration_management` (boolean): True if item expires.
            *   `exp_base_info` (object): Expiration details.
                *   `inbound_cutoff_days` (number): Minimum days left for inbound.
                *   `expiration_alert_days` (number): Days before alert trigger.
                *   `sales_cutoff_days` (number): Minimum days left for sale.

## 6. Error Handling
Check `code` field. If `code` not `0`, action failed. Save `request_id` to debug.

## 7. Pitfalls & Best Practices
*   Signature expire quick. Generate `sign` and `timestamp` right before call.
*   Batch SKU IDs. Do not call API for every single SKU.
*   Verify `shop_cipher` match seller token. Wrong cipher cause auth failure.

## 8. Code Example

```bash
curl -X POST \
 'https://open-api.tiktokglobalshop.com/fbt/202603/goods/hazmat_and_expiration_info/search?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "tts_sku_ids": [
    "723456789012345678"
  ]
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fbt/202603/goods/hazmat_and_expiration_info/search`*
