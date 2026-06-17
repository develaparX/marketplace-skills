# TikTok Shop API: Get Warehouse List

# Guide: Get Warehouse List API

## Purpose
API get seller warehouse details. Use to fetch warehouse ID, status, address.

## Endpoint
* **Method**: `GET`
* **Path**: `/logistics/202309/warehouses`
* **Base URL**: `https://open-api.tiktokglobalshop.com`

## Headers
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (user_type = 0).

## Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Request signature.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `shop_cipher` (string, required): Shop identifier. Required for cross-border shops.

## Response Structure
JSON response contains:
* `code` (number): Status code. `0` means success.
* `message` (string): Error description.
* `request_id` (string): Log identifier.
* `data` (object): Payload.
  * `warehouses` (array):
    * `id` (string): Warehouse ID.
    * `entity_id` (string): Entity ID.
    * `name` (string): Name.
    * `effect_status` (string): Status (e.g., `ENABLED`).
    * `type` (string): Type (e.g., `SALES_WAREHOUSE`).
    * `sub_type` (string): Sub-type (e.g., `DOMESTIC_WAREHOUSE`).
    * `is_default` (boolean): Default flag.
    * `address` (object): Address details.

## Error Handling
* **Code `36009003`**: Internal error. Action: Retry request. Contact support if error persists.

## Pitfalls & Best Practices
* **Wrong `shop_cipher`**: Returns bad data. Action: Verify cipher before call.
* **Signature mismatch**: Action: Generate `sign` using exact query parameters.

## Example Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/logistics/202309/warehouses?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

## Example Response
```json
{
  "code": 0,
  "data": {
    "warehouses": [
      {
        "id": "7000714532876273410",
        "entity_id": "7395366865142499073",
        "name": "Guang

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /logistics/202309/warehouses`*
