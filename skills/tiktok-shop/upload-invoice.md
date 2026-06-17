# TikTok Shop API: Upload Invoice

# Guide: Upload Invoice API

## Purpose
Upload invoice document. Use only for Brazil local sellers. 

## Endpoint
* **Method**: `POST`
* **Path**: `/fulfillment/202502/invoice/upload`
* **Base URL**: `https://open-api.tiktokglobalshop.com`

## Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token. Get from Get Access Token API. Use `user_type = 0`.

## Parameters

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature from gen algorithm.
* `timestamp` (number, required): Unix timestamp (UTC).
* `shop_cipher` (string, required): Shop identifier.

### Body Parameters
* `invoices` (array, optional): Invoice list.
  * `package_id` (string): Package ID.
  * `order_ids` (string): Order ID.
  * `file_type` (string): File type (e.g., "XML").
  * `file` (string): Base64 encoded file.

## Response Structure
* `code` (number): Status code.
* `message` (string): Status message.
* `request_id` (string): Request log ID.
* `data` (object): Return details. Contains `errors` array for item failures.

## Error Handling
* **Code `36009003`**: Internal error. Retry request. Contact support if fail.
* **Code `10007014`** (in `data.errors`): Invoice exists. Retry later.

## Pitfalls & Best Practices
* **Brazil only**: Do not call for other markets.
* **Base64 encoding**: Encode file content. Large files cause timeout.
* **Check item errors**: Check `data.errors` array. Success response can contain item errors.

## Example Request
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fulfillment/202502/invoice/upload?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'content-type: application/json' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-d '{"invoices": [{"package_id": "1161235029d14122252", "order_ids": "5361235029d14122252", "file_type": "XML", "file": "PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGL"}]}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fulfillment/202502/invoice/upload`*
