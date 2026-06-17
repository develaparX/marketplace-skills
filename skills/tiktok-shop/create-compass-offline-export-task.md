# TikTok Shop API: Create Compass Offline Export Task

# API Guide: Create Compass Offline Export Task

## 1. Overview
API start async export task. Use when need large data export. Return `task_id`. Use `task_id` later check status, download file.

## 2. Endpoint
* **Method:** `POST`
* **URL:** `https://open-api.tiktokglobalshop.com/affiliate_seller/202603/compass/offline_task`

## 3. Headers & Auth
### Headers
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, where `user_type` is `0`)

### Query Parameters (Auth)
* `app_key`: Unique app key.
* `sign`: Request signature.
* `timestamp`: Unix timestamp GMT (UTC+00:00).
* `shop_cipher`: Shop identifier.

## 4. Parameters

### Body Parameters (JSON)
| Name | Type | Required | Description | Allowed Values |
| :--- | :--- | :--- | :--- | :--- |
| `module_type` | string | No | Export module type. | `CREATOR`, `BASE` |
| `window_type` | string | No | Time window size. | `PAST_24H`, `PAST_7_DAYS`, `PAST_30_DAYS` |
| `end_day` | number | No | End date (local timezone, format `YYYYMMDD`). | Example: `20260301` |
| `plan_type` | string | No | Target plan type. | `ALL`, `TARGET`, `OPEN`, `PARTNER` |

## 5. Response Structure
JSON response contains:
* `code` (number): Status code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Log ID for debug.
* `data` (object): Task details.
  * `task` (object):
    * `id` (string): Task identifier.

## 6. Error Handling
Check `code` in response. If `code` not `0`, task creation fail. Use `request_id` in support ticket if error persist.

## 7. Pitfalls & Best Practices

### Multi-Step Export Sequence
1. Call this API to create export task and get `task_id`.
2. Poll task status API using `task_id` until status is complete.
3. Download file from URL provided in status response.

### Pitfalls
* **Timezone mismatch:** `end_day` must use local timezone of shop region. Wrong timezone cause data mismatch.
* **Token mismatch:** `x-tts-access-token` must belong to seller account (`user_type = 0`).

## 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_seller/202603/compass/offline_task?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "module_type": "BASE",
  "window_type": "PAST_24H",
  "end_day": 20260301,
  "plan_type": "ALL"
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202603/compass/offline_task`*
