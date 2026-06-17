# TikTok Shop API: Get FBF MCF Order Status

# Implement FBF MCF Order Status API

## 1. Purpose & Use Case
API queries MCF order status. Use to track shipments, get tracking numbers, check inventory blocks.

## 2. Endpoint & Method
*   **Method:** `GET`
*   **Path:** `/fbt/202601/mcf_outbound_orders`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from auth flow.

## 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique developer app key. |
| `sign` | string | Yes | Signature from generation algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `mcf_order_id` | string | Yes | Unique MCF order ID. |
| `shop_cipher` | string | Yes | Shop identifier. |

## 5. Response Structure
Response contains:
*   `code` (number): Status code. `0` means success.
*   `message` (string): Error or success message.
*   `request_id` (string): Log identifier.
*   `data` (object): Order details.
    *   `mcf_order` (object):
        *   `external_order_id` (string): Origin system ID (e.g. Shopify).
        *   `mcf_order_id` (string): TikTok MCF ID.
        *   `consign_orders` (array): Shipment list.
            *   `id` (string): Shipment ID.
            *   `goods` (array): Items in shipment.
            *   `tracking_number` (string): Carrier tracking code.
            *   `carrier` (string): Shipping carrier.
            *   `status` (string): Shipment status (e.g. `PENDING`).
            *   `is_platform_closed` (boolean): Platform closure state.
            *   `issue` (string): Block reason (e.g. "Lack of inventory").
            *   `shipping_provider` (object): Provider details.

## 6. Error Handling
*   `177001009`: Internal error. Retry request. Contact support if fail.
*   `177001010`: Order not found. Check `mcf_order_id` value.

## 7. Pitfalls & Best Practices
*   **Signature error:** Calculate signature using exact query parameters. Order parameters alphabetically before hash.
*   **Timestamp expiry:** Generate fresh timestamp. Server rejects old requests.
*   **Split shipments:** One MCF order can generate multiple `consign_orders`. Loop array to get all tracking numbers.
*   **Inventory blocks:** Check `issue` field when status is `PENDING`.

## 8. Code Example

### Curl
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/fbt/202601/mcf_outbound_orders?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&mcf_order_id=7136104329798256386&app_key=38abcd' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Pseudocode
```python
# Setup parameters
params = {
    "app_key": "38abcd",
    "timestamp": get_current_timestamp(),
    "shop_cipher": "GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3",
    "mcf_order_id": "7136104329798256386"
}

# Generate sign
params["sign"] = generate_signature(params, app_secret)

# Headers
headers = {
    "x-tts-access-token": "TTP_pwSm2...",
    "content-type": "application/json"
}

# Request
response = http.get("https://open-api.tiktokglobalshop.com/fbt/202601/mcf_outbound_orders", query=params, headers=headers)

# Parse
if response.code == 0:
    for shipment in response.data.mcf_order.consign_orders:
        print(shipment.carrier, shipment.tracking_number, shipment.status)
else:
    handle_error(response.code, response.message)
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /fbt/202601/mcf_outbound_orders`*
