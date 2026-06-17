# TikTok Shop API: Get Global Product

# Implement Get Global Product API

### 1. Purpose & Use Case
* **Action**: Get global product details.
* **Use case**: Sync product data. Find local product IDs in published markets.
* **Condition**: Product status must be DRAFT, UNPUBLISHED, or PUBLISHED. Other status fail.

### 2. Endpoint
* **Method**: `GET`
* **Path**: `/product/202309/global_products/{global_product_id}`
* **Base URL**: `https://open-api.tiktokglobalshop.com`

### 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (user_type = 0).

### 4. Parameters

#### Path Parameter
* `global_product_id` (string, required): Global product ID.

#### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Request signature.
* `timestamp` (number, required): Unix timestamp (UTC).

### 5. Response Structure
* `code` (number): Status code. `0` means success.
* `message` (string): Error details.
* `request_id` (string): Request log ID.
* `data` (object): Product details.
  * `id` (string): Global product ID.
  * `title` (string): Product name.
  * `main_images` (array): Image list. Contains `height`, `width`, `uri`.
  * `video` (object): Video details. Contains `id`.
  * `description` (string): Product description.
  * `package_dimensions` (object): Package size. Contains `length`, `width`, `height`, `unit`.

### 6. Error Handling
* `12052032`: Product not exist. Check ID.
* `12052048`: No permission. Check account/shop.
* `12052260`: Product ID not exist. Check ID.
* `36009003`: Internal error. Retry request.
* `12052901`: Invalid status. Change status, retry.

### 7. Pitfalls & Best Practices
* **Status check**: Product must be DRAFT, UNPUBLISHED, PUBLISHED. Check status before call.
* **Timestamp**: Use UTC. Old timestamp fail request.
* **Signature**: Sign query parameters. Wrong signature block request.

### 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/product/202309/global_products/1729592969712207008?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202309/global_products/{global_product_id}`*
