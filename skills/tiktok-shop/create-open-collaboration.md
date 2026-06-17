# TikTok Shop API: Create Open Collaboration

# Create Open Collaboration API Implementation Guide

## 1. Overview
API creates open collaboration. Use when seller wants affiliates to promote product for commission.

## 2. Endpoint
*   **Method**: `POST`
*   **URL**: `https://open-api.tiktokglobalshop.com/affiliate_seller/202412/open_collaborations`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from Get Access Token, user_type = 0).

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from generation algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. |

### Body Parameters (JSON)
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `product_id` | string | Yes | Target product ID. |
| `commission_rate` | number | Yes | Rate in hundredths of percent. Minimum 100 (1%). Maximum 8000 (80%). |

## 5. Response Structure
Returns JSON object:
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier.
*   `data` (object): Payload.
    *   `open_collaboration` (object): Created collaboration details.
        *   `id` (string): Collaboration ID.
        *   `product_id` (string): Product ID.
        *   `effective_time` (number): Unix timestamp start.

## 6. Error Handling
Check `code` in response. Handle specific errors:

| Code | Description | Action |
| :--- | :--- | :--- |
| `16003012` | Collaboration exists. | Stop process. Update existing instead. |
| `16003025` | Seller account deactivated. | Alert seller to reactivate account. |
| `16003033` | Rate not 1% to 80%. | Validate input. Value must be 100 to 8000. |
| `16003035` | Product restricted. | Block product selection in UI. |
| `16603010` | Seller restricted. | Alert seller to check platform status. |

## 7. Pitfalls & Best Practices
*   **Commission Math**: Rate uses hundredths of percent. 10% = `1000`. 1% = `100`. Do not send raw floats like `0.1`.
*   **Signature Fail**: Generate `sign` using exact query parameters. Outdated `timestamp` causes failure. Keep system clock synced.

## 8. Code Example

### Curl
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_seller/202412/open_collaborations?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "product_id": "789078671231",
  "commission_rate": 1000
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202412/open_collaborations`*
