# TikTok Shop API: Update Goods Sku Relation

# Update Goods SKU Relation API Guide

## 1. Purpose
API bind/unbind goods and SKUs. Use for link management.

## 2. Endpoint
*   **Method**: `POST`
*   **URL**: `https://open-api.tiktokglobalshop.com/fbt/202603/goods/update_goods_sku_relation`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (user_type = 0).

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp (UTC).
*   `shop_cipher` (string, required): Shop identifier.

## 4. Request Body
Format: JSON.

*   `operation_type` (string, required): Action. Values: `BIND`, `UN_BIND`.
*   `operate_goods_sku_relation_list` (array, required): Target list.
    *   `tts_goods_id` (string, required): Goods ID.
    *   `tts_sku_ids` (array of strings, required): SKU IDs.

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log ID.
*   `data` (object): Result payload.
    *   `operate_goods_sku_relation_info` (object):
        *   `operate_result_list` (array):
            *   `tts_goods_id` (string): Goods ID.
            *   `tts_sku_id` (string): SKU ID.
            *   `is_success` (boolean): Success flag.
            *   `fail_reason` (string): Error message if failed.

## 6. Error Handling
*   Check global `code` first.
*   Check `is_success` for each item in `operate_result_list`.
*   Read `fail_reason` if `is_success` false.

## 7. Pitfalls & Best Practices
*   **Partial Success**: API processes items individually. One SKU fail not block others. Check every item status.
*   **Sign Check**: Generate `sign` parameter using correct secret key and sorting.
*   **Token Expiry**: Refresh `x-tts-access-token` before call.

## 8. Example Request
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fbt/202603/goods/update_goods_sku_relation?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'content-type: application/json' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-d '{
  "operate_goods_sku_relation_list": [
    {
      "tts_goods_id": "334556677",
      "tts_sku_ids": [
        "723456789012345678"
      ]
    }
  ],
  "operation_type": "BIND"
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fbt/202603/goods/update_goods_sku_relation`*
