# TikTok Shop API: Get Inbound Order

# Implementation Guide: Get Inbound Order API

## 1. Purpose
API gets inbound order details. Returns planned details, actual details, status. Use when tracking stock sent to FBT warehouse.

## 2. Endpoint
*   **Method**: `GET`
*   **URL**: `https://open-api.tiktokglobalshop.com/fbt/202602/inbound_orders`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from Get Access Token (user_type = 0).

## 4. Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier.
*   `order_ids` (array, required): Inbound order IDs. Max 10. Do not include 'IBR' prefix.
*   `include_carton_details` (boolean, optional): Set `true` to get carton details.

## 5. Response Structure
Response returns status code, message, and order data.

```json
{
  "code": 0,
  "message": "success",
  "request_id": "20260225...",
  "data": {
    "inbound_orders": [
      {
        "order_id": "5766071177167344427",
        "order_id_string": "IBR5766071177167344427",
        "order_plan_id": "5766071177167345050",
        "merchant": {
          "id": "493493403043",
          "name": "ExampleCompany"
        },
        "create_time": 1773778751,
        "ship_time": 1773778751,
        "expected_arrival_time": 1773778751,
        "actual_arrival_time": 1773778751,
        "warehouse": {
          "fbt_warehouse_id": "121219993203023",
          "business_warehouse_ids": [
            "121219993209983"
          ],
          "name": "TikTok Warehouse"
        }
      }
    ]
  }
}
```

## 6. Error Handling
Handle these API error codes:
*   `36009003`: Internal error. Retry request.
*   `39001002`: Empty parameters. Check input.
*   `39015009`: Invalid SellerId. Check seller credentials.
*   `39015010`: No orders found. Check order IDs.
*   `39015020`: Order limit exceeded. Reduce batch size.

## 7. Pitfalls & Best Practices
*   **Order ID Prefix**: Remove 'IBR' prefix from `order_ids` query parameter. API fails if prefix present.
*   **Batch Limit**: Limit `order_ids` to 10 per request. Split larger lists into multiple requests.
*   **Timestamp**: Use GMT (UTC+00:00) epoch seconds. Signature fails if clock drift occurs.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/fbt/202602/inbound_orders?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&order_ids=5766071177167344427,5766071177167344428&include_carton_details=true' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /fbt/202602/inbound_orders`*
