# TikTok Shop API: Post Shoppable Video

# Post Shoppable Video API Implementation Guide

## 1. Overview
Post shoppable video to TikTok. Link product to video for affiliate creator.

## 2. Endpoint
*   **Method:** `POST`
*   **URL:** `https://open-api.tiktokglobalshop.com/affiliate_creator/202603/videos`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Creator access token.

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT. |

### Body Parameters (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `video_info` | object | Yes | Video information. |
| `video_info.file_id` | string | Yes | Valid video file ID. |
| `video_info.title` | string | No | Video title. |
| `video_info.cover_uri` | string | No | Cover image URI. |
| `video_info.cover_timestamp_ms` | number | No | Cover timestamp in milliseconds. |
| `video_info.music_id` | string | No | Music ID. |
| `product_link_info` | object | Yes | Product link information. |
| `product_link_info.product_id` | string | Yes | Product ID. |
| `product_link_info.title` | string | Yes | Product anchor title. |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {
    "video": {
      "id": "7548431509997292816"
    }
  }
}
```
*   `code`: Status code. `0` means success.
*   `message`: Status description.
*   `request_id`: Log ID for debugging.
*   `data.video.id`: Created TikTok video ID.

## 6. Error Handling
Check `code` field in response. Handle specific errors:

| Code | Description | Action |
| :--- | :--- | :--- |
| `16011007` | Title > 30 characters. | Shorten product link title. |
| `16011069` | Title has punctuation or emoji. | Remove special characters. |
| `170001020` | Post frequency limit exceeded. | Wait before retry. |
| `170001024` / `170001025` | Invalid cover timestamp. | Set timestamp within video duration. |
| `170001030` / `170001031` | Creator banned/forbidden. | Stop requests for this creator. |

## 7. Pitfalls & Best Practices
*   **Title Limits:** Product link title must be under 30 characters. No emojis. No punctuation.
*   **Video ID:** Upload video first to get valid `file_id`.
*   **Signature:** Generate `sign` query parameter using official algorithm before call.

## 8. Code Example

```bash
curl -X POST \
  'https://open-api.tiktokglobalshop.com/affiliate_creator/202603/videos?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json' \
  -d '{
    "video_info": {
      "file_id": "v12d00gd0024d3nfqr7og65",
      "title": "Sample video title",
      "cover_uri": "v12d00gd0024d3nfqr7og65oooiuuyy",
      "cover_timestamp_ms": 1000,
      "music_id": "717294069642063456"
    },
    "product_link_info": {
      "product_id": "17294069642063424",
      "title": "Sample product anchor title"
    }
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_creator/202603/videos`*
