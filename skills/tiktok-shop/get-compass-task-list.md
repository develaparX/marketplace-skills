# TikTok Shop API: Get Compass Task List

# Get Compass Task List API Guide

### 1. Purpose
API retrieve export tasks created via Open API for authorized seller. Use to check task status and get file names. Limit: last 7 days.

### 2. Endpoint
*   **Method**: `GET`
*   **URL**: `https://open-api.tiktokglobalshop.com/affiliate_seller/202603/compass/offline_tasks`

### 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (use token where `user_type` is `0`).

### 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique developer app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00) in seconds. |
| `doc_type` | string | Yes | Allowed values: `CREATOR`, `BASE`. |
| `shop_cipher` | string | Yes | Shop identifier cipher. |

### 5. Response Fields
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier for debug.
*   `data` (object): Task container.
    *   `tasks` (array): List of tasks.
        *   `id` (string): Unique task ID.
        *   `module_type` (string): Task module type.
        *   `file_name` (string): Name of exported file.
        *   `status` (string): Task state (e.g., `RUNNING`).

### 6. Error Handling
*   Check `code` field. Non-zero value means failure.
*   Save `request_id` for support tickets.

### 7. Pitfalls & Best Practices
*   **Time Limit**: API only returns tasks from last 7 days. Older tasks fail to appear.
*   **Doc Type**: Schema lists `CREATOR` and `BASE`. Example request uses `VIDEO`. Test allowed values to prevent validation errors.
*   **Sign calculation**: Generate signature last. Any query parameter change invalidates signature.

### 8. Example Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/affiliate_seller/202603/compass/offline_tasks?timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&doc_type=VIDEO&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_seller/202603/compass/offline_tasks`*
