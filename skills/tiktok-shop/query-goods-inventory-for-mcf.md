# TikTok Shop API: Query Goods Inventory For MCF

# Query Goods Inventory For MCF Implementation Guide

## 1. Overview
Check stock levels for Multi-Channel Fulfillment (MCF). Use before submitting MCF orders. Prevent out-of-stock errors.

## 2. Endpoint
*   **Method:** `POST`
*   **URL:** `https://open-api.tiktokglobalshop.com/fbt/202601/mcf/goods/inventory/search`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token.

## 4. Parameters

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp UTC.
*   `shop_cipher` (string, required): Shop identifier cipher.

### Body Parameters (JSON)
*   `goods` (array, required): FBT goods identifiers. Max length 50.
    *   `goods_id` (string, required): ID of goods.

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object): Inventory data.
    *   `goods_inventory_list` (array): List of inventory items.
        *   `goods_id` (string): Goods identifier.
        *   `available_qty` (number): Available stock quantity.

## 6. Error Handling
Check `code` field. Non-zero code means failure. Log `request_id` for troubleshooting.

## 7. Pitfalls & Best Practices
*   **Batch limit:** Max 50 goods IDs per request. Split larger lists into multiple requests.
*   **Caching:** Store inventory locally. Do not poll API too fast.
*   **Signature:** Generate `sign` correctly. Incorrect signature causes authentication failure.

## 8. Code Example

### Request
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fbt/202601/mcf/goods/inventory/search?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'content-type: application/json' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-d '{"goods": [{"goods_id": "69167899745030"}]}'
```

### Response
```json
{
  "code": 0,
  "data": {
    "goods_inventory_list": [
      {
        "goods_id": "69167899745030",
        "available_qty": 10
      }
    ]
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fbt/202601/mcf/goods/inventory/search`*
