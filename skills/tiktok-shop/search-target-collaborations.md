# TikTok Shop API: Search Target Collaborations

# Search Target Collaborations API Guide

## 1. Overview
API find target collaborations. Use to query seller collaborations.

## 2. Endpoint
* **Method**: `POST`
* **Path**: `/affiliate_seller/202508/target_collaborations/search`

## 3. Auth & Headers
* **Scope**: `seller.affiliate_collaboration.read`
* **Headers**:
  * `content-type`: `application/json` (Required)
  * `x-tts-access-token`: Seller access token (Required)

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | App key |
| `sign` | string | Yes | Request signature |
| `timestamp` | int | Yes | Unix timestamp (UTC) |
| `shop_cipher` | string | Yes | Shop cipher |
| `page_size` | int | No | Page size. Must be 20, 50, or 100 |
| `page_token` | string | No | Pagination offset token |

### Body Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `collaboration_status` | string | Yes | `ONGOING`, `EXPIRING`, `VALID`, `CANCELING`, `COMPLETED` |
| `creator_accept_status` | string | No | `ACCEPT`, `ALL`. Default: `ALL` |
| `free_sample_setting` | string | No | `WITH_FREE_SAMPLE`, `ALL`. Default: `ALL` |
| `creator_user_open_id` | string | No | Creator TikTok Open ID |
| `search_param` | object | No | Search parameters |

## 5. Response Structure
* `code` (int): Status code. 0 for success.
* `message` (string): Status message.
* `request_id` (string): Request log identifier.
* `data` (object): Collaboration details.

## 6. Error Handling
* Check `code` field. Non-zero value indicates failure.
* Log `request_id` to debug API issues.

## 7. Pitfalls & Best Practices
* `page_size` strict. Only use 20, 50, or 100.
* `collaboration_status` required. Request fails if missing.
* Generate `sign` using correct algorithm before request.

## 8. Code Example

```bash
curl -X POST "https://api-sandbox.tiktokshop.com/affiliate_seller/202508/target_collaborations/search?app_key=test_key&sign=test_sign&timestamp=1710000000&shop_cipher=test_cipher&page_size=20" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: test_token" \
  -d '{
    "collaboration_status": "ONGOING",
    "creator_accept_status": "ALL",
    "free_sample_setting": "ALL"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
