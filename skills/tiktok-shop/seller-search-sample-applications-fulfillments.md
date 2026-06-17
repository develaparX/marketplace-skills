# TikTok Shop API: Seller Search Sample Applications Fulfillments

# Implementation Guide: Seller Search Sample Applications Fulfillments

## 1. Purpose
Track sample application fulfillment status. Check if creator content (LIVE/VIDEO) generated orders. Use after creator receives sample.

## 2. Endpoint
*   **Method:** `POST`
*   **Path:** `/affiliate_seller/202409/sample_applications/{application_id}/fulfillments/search`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token.
*   Query parameters needed for signature: `app_key`, `sign`, `timestamp`, `shop_cipher`.

## 4. Parameters

### Path Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `application_id` | string | Yes | Application identifier. |

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop cipher. |

### Body Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `content_format` | string | No | Creator content type. Allowed: `LIVE`, `VIDEO`. |

## 5. Response Structure
JSON object containing:
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier.
*   `data` (object):
    *   `fulfillments` (array):
        *   `product` (object):
            *   `id` (string): Product ID.
            *   `main_image_url` (string): Image URL.
        *   `content` (object):
            *   `id` (string): Content ID.
            *   `format` (string): `LIVE` or `VIDEO`.
            *   `url` (string): Content URL.
            *   `view_count` (number): Views.
            *   `like_count` (number): Likes.
            *   `comment_count` (number): Comments.
            *   `paid_order_count` (number): Orders from content.
            *   `page_link` (string): Page link.
            *   `description` (string): Description.
            *   `create_time` (number): Unix timestamp.
            *   `live_end_time` (number): Unix timestamp.

## 6. Error Handling
| Code | Description | Action |
| :--- | :--- | :--- |
| `36009003` | Internal error. | Retry request. |

## 7. Pitfalls & Best Practices
*   **Sign generation:** Calculate signature using exact query string. Wrong order fails auth.
*   **Timestamp:** Use UTC. Out of sync timestamp blocks request.
*   **Cipher:** Match `shop_cipher` to authorized seller shop.

## 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_seller/202409/sample_applications/123456789/fulfillments/search?timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{"content_format": "LIVE"}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202409/sample_applications/{application_id}/fulfillments/search`*
