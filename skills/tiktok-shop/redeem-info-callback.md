# TikTok Shop API: Redeem Info Callback

# Redeem Info Callback API Implementation Guide

## 1. Purpose & Usage
API sends redeem info to TikTok Shop (TTS). Completes order fulfillment. Use when order requires digital code or instruction delivery.

## 2. Endpoint & Method
* **Method**: `POST`
* **Path**: `/fulfillment/202601/redeem_info/callback`
* **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, user_type = 0).

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. |

### Request Body
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `order_id` | string | Yes | TikTok Shop order ID. |
| `order_info_list` | array | Yes | List of order lines for fulfillment. |

#### `order_info_list` Object Structure
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `order_line_id` | string | Yes | TikTok Shop order line ID. |
| `redeem_info` | object | Yes | Redeem details. |
| `source_unique_id` | string | Yes | External system identifier. |

#### `redeem_info` Object Structure
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `redeem_type` | string | Yes | Type of redeem (e.g., `CODE`). |
| `redeem_data` | string | Yes | Actual code or data. |
| `redeem_instruction_info` | string | Yes | Stringified JSON with instruction URL. |

## 5. Response Structure
* `code` (number): Status code (0 = success).
* `message` (string): Status message.
* `request_id` (string): Log identifier.
* `data` (object): Contains fulfillment results.
  * `order_statuses` (array): List of processed lines.
    * `order_line_id` (string): TikTok Shop order line ID.
    * `status_code` (number): Line-specific status code.

## 6. Error Handling
Handle these API error codes:

| Code | Description | Action |
| :--- | :--- | :--- |
| `10006402` | Internal error. | Retry request. Contact support if fails. |
| `164004001` | Permission denied. | Check order permissions. |
| `164004006` | Invalid request params. | Verify request body. |
| `36009003` | Internal error. | Retry request. |
| `164004008` | No orders available for fulfillment. | Verify order status. |
| `185001003` | No orders need callback. | Skip callback. |
| `185002001` | Invalid request params. | Verify request body. |
| `185005001` | Permission denied. | Check order permissions. |
| `185005002` | Current order status not support callback. | Check order status before call. |

## 7. Pitfalls & Best Practices
* **Stringified JSON**: `redeem_instruction_info` must be JSON string inside JSON body. Escape quotes properly.
* **Status Check**: Check both outer `code` and inner `order_statuses[].status_code`. Outer success does not mean all lines succeeded.
* **Signature**: Generate signature using exact query parameters. Incorrect order causes auth failure.

## 8. Code Example

```bash
curl -X POST \
  'https://open-api.tiktokglobalshop.com/fulfillment/202601/redeem_info/callback?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json' \
  -d '{
    "order_id": "576461413038785752",
    "order_info_list": [
      {
        "order_line_id": "577086512123755123",
        "redeem_info": {
          "redeem_type": "CODE",
          "redeem_data": "abc12344",
          "redeem_instruction_info": "{\"instruction_url\": \"{your_instruction_website}\"}"
        },
        "source_unique_id": "134448484339393"
      }
    ]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fulfillment/202601/redeem_info/callback`*
