# TikTok Shop API: Get Global Seller Warehouse

# Get Global Seller Warehouse API Implementation Guide

## 1. Overview
API gets seller warehouse data. Use to get warehouse ID, name, ownership. Call before inventory sync or shipping setup.

## 2. Endpoint
*   **Method**: `GET`
*   **Path**: `/logistics/202309/global_warehouses`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from auth flow, `user_type = 0`).

## 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique developer app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |

## 5. Response Structure
Returns JSON object:
*   `code` (number): Status code. `0` is success.
*   `message` (string): Status/error details.
*   `request_id` (string): Log identifier.
*   `data` (object):
    *   `global_warehouses` (array):
        *   `id` (string): Warehouse ID.
        *   `name` (string): Warehouse name.
        *   `ownership` (string): Owner type (e.g., `SELLER`).

## 6. Error Handling
*   Check `code` value. Non-zero means fail.
*   Read `message` for error cause.
*   Log `request_id` for support tickets.

## 7. Pitfalls & Best Practices
*   **Clock Sync**: Server time must match UTC. Drift causes signature failure.
*   **Sign Order**: Sort query parameters alphabetically before hashing.
*   **Token Refresh**: Track token life. Refresh before expiry.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/logistics/202309/global_warehouses?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /logistics/202309/global_warehouses`*
