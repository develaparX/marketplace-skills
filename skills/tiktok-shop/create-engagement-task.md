# TikTok Shop API: Create Engagement Task

API data processed. Implementation document generated. See below:

# Implementation Guide: Create Engagement Task

## 1. Overview
Creates engagement task container. Groups messages with similar content and rules. Use to track and compare performance across content types.

## 2. Endpoint
*   **Method:** `POST`
*   **URL:** `https://open-api.tiktokglobalshop.com/customer_engagement/202412/engagement_tasks`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (where `user_type` = 0)

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique application key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `idempotency_key` | string | Yes | Unique request identifier. Use UUID v4. Prevents duplicate tasks. |
| `shop_cipher` | string | Yes | Shop identifier cipher. |

### Body Parameters (JSON)
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `template_id` | string | Yes | Predefined TikTok Shop template ID. |
| `task_name` | string | Yes | Name of task. |
| `end_time` | number | Yes | Task end time. Unix timestamp (seconds). |
| `channel` | string | Yes | Engagement channel. Value must be `TIKTOK_IM`. |
| `product_ids` | array | No | Product IDs from Search Products API. |
| `coupon_ids` | array | No | Coupon IDs from Search Coupons API. |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {
    "task_id": "475910475643"
  }
}
```
*   `code`: 0 indicates success. Non-zero indicates error.
*   `data.task_id`: ID of created task.

## 6. Error Codes
*   `68009001`: Access denied. Seller lacks CRM feature access.
*   `68009005`: Task creation failed.

## 7. Pitfalls & Best Practices
*   **Duplicate Prevention:** Always generate new UUID v4 for `idempotency_key` on new tasks. Reuse same key only when retrying failed requests.
*   **Channel Restriction:** Only `TIKTOK_IM` allowed. Other values cause validation failure.
*   **Time Format:** `end_time` requires seconds, not milliseconds.
*   **CRM Access:** Check seller eligibility before calling. Handle code `68009001` gracefully.

## 8. Code Example (cURL)
```bash
curl -X POST \
 'https://open-api.tiktokglobalshop.com/customer_engagement/202412/engagement_tasks?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&idempotency_key=372dd4e7-9c02-ddb0-d14b-0b23ce54e142' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "template_id": "50002_20011",
  "task_name": "Task1 for mega sale",
  "end_time": 1744344885,
  "channel": "TIKTOK_IM",
  "product_ids": [
    8646958016719848000
  ],
  "coupon_ids": [
    8646958016719848000
  ]
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /customer_engagement/202412/engagement_tasks`*
