# TikTok Shop API: Get Global Listing Rules

# Get Global Listing Rules API Guide

### 1. Purpose
Get global listing rules for local shop belonging to global seller. Use to map inventory or check publish method.

### 2. Endpoint
* **Method:** `GET`
* **URL:** `https://open-api.tiktokglobalshop.com/product/202507/global_listing_rules`

### 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, where `user_type` = 0).

### 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `shop_cipher` | string | Yes | Shop identifier. |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |

### 5. Response Structure
* `code` (number): Status. `0` means success.
* `message` (string): Status description.
* `request_id` (string): Log identifier.
* `data` (object): Rules payload.
  * `listing_methods` (string): Publishing method (e.g., `GLOBAL_PUBLISHING`).
  * `inventory_rules` (array): Warehouse mapping.
    * `local_warehouse_id` (string): Local warehouse ID.
    * `allocation_mode` (string): Mode (e.g., `SHARED`).
    * `associated_warehouses` (array): Global warehouses.
      * `warehouse_id` (string): Global warehouse ID.
      * `region` (string): Region code (e.g., `DE`).

### 6. Error Handling
Check `code` field. Non-zero means error. Read `message` for failure reason. Save `request_id` for support.

### 7. Pitfalls & Best Practices
* **Timestamp expiry:** Sync system clock to UTC. Request fails if timestamp old.
* **Signature error:** Generate signature correct. Sort query params alphabetically before hash.
* **Scope limit:** Only works for local shops under global seller account. Normal shops return error.

### 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/product/202507/global_listing_rules?shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202507/global_listing_rules`*
