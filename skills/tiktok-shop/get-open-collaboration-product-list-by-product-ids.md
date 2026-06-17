# TikTok Shop API: Get Open Collaboration Product List By Product Ids

# Implementation Guide: Get Open Collaboration Product List By Product Ids

### 1. Purpose
Get open collaboration product details. Use when creator needs info (price, image, shop) for specific product IDs.

### 2. Endpoint
*   **Method:** `POST`
*   **URL:** `https://open-api.tiktokglobalshop.com/affiliate_creator/202509/open_collaborations/products`

### 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Creator access token (from Get Access Token, `user_type = 1`).

### 4. Parameters

#### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `product_ids` | string | No | Comma-separated product IDs (e.g., `123,456`). |

#### Request Body
*   Empty JSON object: `{}`

### 5. Response Structure
Returns JSON object.

*   `code` (number): Status code. `0` means success.
*   `message` (string): Error details.
*   `request_id` (string): Log identifier.
*   `data` (object):
    *   `products` (array):
        *   `id` (string): Product ID.
        *   `title` (string): Product name.
        *   `has_inventory` (boolean): Stock status.
        *   `units_sold` (number): Sales count.
        *   `sale_region` (string): Region code (e.g., `ID`).
        *   `main_image_url` (string): Image link.
        *   `detail_link` (string): Product page link.
        *   `shop` (object): Name of shop.
        *   `original_price` (object): Currency, min/max amount.
        *   `category_chains` (array): Category path.

### 6. Error Handling
*   Check `code` field.
*   If `code` not `0`, read `message` for failure reason.
*   Log `request_id` for debugging.

### 7. Pitfalls & Best Practices
*   **Sign mismatch:** Generate `sign` using exact query parameters and timestamp.
*   **Token expiry:** Refresh `x-tts-access-token` before expiry.
*   **Product IDs format:** Pass `product_ids` as comma-separated values in query string, not in JSON body.

### 8. Code Example (cURL)

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_creator/202509/open_collaborations/products?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&app_key=38abcd&product_ids=123,456' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_creator/202509/open_collaborations/products`*
