# TikTok Shop API: Precheck Video Content

# Video Precheck API Guide

## 1. Overview
API check video and product link for policy violation. Use before publish. Prevent ban.

## 2. Endpoint
*   **Method**: `POST`
*   **Path**: `/affiliate_creator/202511/videos/precheck_task`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
### Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Creator access token (`user_type = 1`).

### Query Parameters (Auth)
*   `app_key`: App unique key.
*   `sign`: Request signature.
*   `timestamp`: Unix timestamp (UTC+00:00).

## 4. Request Parameters

### Query
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | App identifier |
| `sign` | string | Yes | Signature from gen algorithm |
| `timestamp` | number | Yes | Unix timestamp |

### Body (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `video_info` | object | Yes | Video details |
| `video_info.file_id` | string | Yes | Video file ID |
| `product_link_info` | object | Yes | Product link details |
| `product_link_info.product_id` | string | Yes | Product ID |
| `product_link_info.title` | string | Yes | Anchor title |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {
    "precheck": {
      "task_id": "1123123123"
    }
  }
}
```
*   `code`: Status code. `0` mean success.
*   `message`: Error details.
*   `request_id`: Log ID. Use for support.
*   `data.precheck.task_id`: ID for precheck task.

## 6. Error Handling
Common error codes:

| Code | Description | Action |
| :--- | :--- | :--- |
| `16011007` | Title > 30 characters | Shorten title |
| `16011009` | Title offensive | Clean text |
| `16011069` | Title has punctuation/emoji | Remove symbols |
| `170001002` | Creator permission fail | Check token scope |
| `170001008` | Age verification fail | Verify age on TikTok |
| `170001012` | Product not available | Check product status |
| `170001019` | Daily quota limit hit | Wait for reset |

## 7. Pitfalls & Best Practices
*   **Title limit**: Keep title under 30 characters. No emojis. No punctuation.
*   **Token type**: Use creator token (`user_type = 1`). Seller token fail.
*   **Quota**: Daily limit exist. Do not spam API.

## 8. Code Example
```bash
curl -X POST \
  'https://open-api.tiktokglobalshop.com/affiliate_creator/202511/videos/precheck_task?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json' \
  -d '{
    "video_info": {
      "file_id": "v12d00gd0024d3nfqr7og65"
    },
    "product_link_info": {
      "product_id": "17294069642063424",
      "title": "Sample product anchor title"
    }
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_creator/202511/videos/precheck_task`*
