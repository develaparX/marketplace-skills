# TikTok Shop API: List Available Inbound Method

# Skill: List Available Inbound Method API

### 1. Purpose
API retrieves shipping methods, arrival windows for inbound plan. Use before shipping inventory to warehouse.

### 2. Endpoint
*   **Method:** `POST`
*   **Path:** `/fbt/202602/list_available_inbound_method`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

### 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (where `user_type` = 0).

### 4. Parameters

#### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. |

#### Body Parameters (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `plan_id` | string | Yes | Inbound plan identifier. |

### 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Error detail.
*   `request_id` (string): Log ID.
*   `data` (object): Payload.
    *   `available_inbound_method_list` (array):
        *   `inbound_method` (string): Shipping method (e.g., `D2FC`).
        *   `available_time_window_list` (array):
            *   `start_timestamp` (string): Window start.
            *   `end_timestamp` (string): Window end.
        *   `warehouse_list` (array):
            *   `warehouse_name` (string): Target warehouse name.
            *   `warehouse_id` (string): Target warehouse ID.
        *   `placement_fee_estimate` (object):
            *   `amount` (string): Fee amount.
            *   `currency` (string): Currency code.

### 6. Error Codes
*   `36009003`: Internal error. Retry request.
*   `39001002`: Empty parameters. Fix input.

### 7. Pitfalls & Best Practices
*   `timestamp` drift causes auth failure. Sync system clock.
*   `sign` generation wrong. Check signature algorithm.
*   `plan_id` must exist. Invalid ID causes failure.

### 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fbt/202602/list_available_inbound_method?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{"plan_id": "5766071177167344427"}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fbt/202602/list_available_inbound_method`*
