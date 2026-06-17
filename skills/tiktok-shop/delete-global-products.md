# TikTok Shop API: Delete Global Products

# Implement: Delete Global Products API

## Purpose
Delete global products. Use to clean catalog.

## Endpoint
*   **Method**: `DELETE`
*   **Path**: `/product/202309/global_products`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (user_type = 0).
*   `app_key` (Query): App key.
*   `sign` (Query): Signature from gen algorithm.
*   `timestamp` (Query): Unix timestamp GMT (UTC+00:00).

## Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |

### Body Parameters (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `global_product_ids` | array[string] | Yes | IDs to delete. Max 20. |

## Response Structure
*   `code` (number): Status code. `0` is success.
*   `message` (string): Status message.
*   `request_id` (string): Log ID.
*   `data` (object): Return data. Contains `errors` array if partial failure.

## Error Codes
*   `12019008`: Product ID invalid.
*   `12019114`: Seller no permission.
*   `12019120`: ID count exceeds limit (max 20).
*   `12019150`: Product ID not exist.
*   `12052700`: Seller inactive.
*   `36009003`: Internal error. Retry.

## Pitfalls & Best Practices
*   **Batch limit**: Send max 20 IDs. Large batches fail.
*   **Partial success**: Response code `0` can still have errors in `data.errors` for specific IDs. Check `data.errors` array.
*   **Time sync**: Keep server clock synced. Bad timestamp rejects request.

## Code Example

```bash
curl -X DELETE 'https://open-api.tiktokglobalshop.com/product/202309/global_products?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
-H 'content-type: application/json' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-d '{
  "global_product_ids": [
    "1729715829872102020",
    "1729715829872036484"
  ]
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `DELETE /product/202309/global_products`*
