# TikTok Shop API: Create Custom Engagement Task

# Create Custom Engagement Task Implementation Guide

## 1. Overview
API create engagement task. Use custom message, not template. Group messages with same rules. Use when send custom text to customers.

## 2. Endpoint
*   **Method:** `POST`
*   **Path:** `/customer_engagement/202502/engagement_tasks/custom`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
### Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Required.

### Query Parameters (Auth & Routing)
*   `app_key` (string): Unique app key. Required.
*   `sign` (string): Request signature. Required.
*   `timestamp` (number): Unix timestamp GMT (UTC+00:00). Required.
*   `idempotency_key` (string): Unique request UUID. Prevent duplicate tasks. Required.
*   `shop_cipher` (string): Shop identifier. Required.

## 4. Request Body Parameters
*   `task_name` (string, required): Name of task.
*   `end_time` (number, required): Task end time. Unix timestamp in seconds.
*   `channel` (string, required): Target channel. Value must be `TIKTOK_IM`.
*   `product_ids` (array, optional): Product IDs for interactive cards. Max count: 4.
*   `coupon_ids` (array, optional): Coupon IDs for interactive cards. Max count: 1.
*   `custom_message` (object, optional): Message content.
    *   `title` (string): Message title.
    *   `body` (string): Message body text.

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status description.
*   `request_id` (string): Log identifier.
*   `data` (object): Payload.
    *   `task_id` (string): Created task identifier.

## 6. Error Codes
*   `68008004`: Policy violation. Message content violates rules. Fix text.
*   `68008016`: Ineligible for custom messages. Use template instead.
*   `68009001`: Access denied. Shop lacks CRM access criteria.
*   `68009005`: Task creation failed. Check error details.

## 7. Pitfalls & Best Practices
*   **Idempotency:** Generate new `idempotency_key` for new tasks. Reuse same key for retries.
*   **Limits:** Do not exceed 4 products or 1 coupon. API rejects request.
*   **Time format:** Use seconds for `end_time`. Do not use milliseconds.
*   **Policy check:** Test message text. Avoid spam words to prevent code `68008004`.

## 8. Code Example

```bash
curl -X POST \
  'https://open-api.tiktokglobalshop.com/customer_engagement/202502/engagement_tasks/custom?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&app_key=38abcd&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&idempotency_key=372dd4e7-9c02-ddb0-d14b-0b23ce54e142' \
  -H 'content-type: application/json' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -d '{
    "task_name": "Task1 for mega sale",
    "end_time": 1744344885,
    "channel": "TIKTOK_IM",
    "product_ids": [
      8646958016719848000
    ],
    "coupon_ids": [
      8646958016219849000
    ],
    "custom_message": {
      "title": "Message title",
      "body": "Message body"
    }
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /customer_engagement/202502/engagement_tasks/custom`*
