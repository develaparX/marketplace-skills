# TikTok Shop API: Update Tracking

# Inbound Order Tracking Update API Guide

## 1. Purpose
API updates carton tracking. Use for inbound orders. Creates or overwrites records.

## 2. Endpoint
* **Method:** `POST`
* **Path:** `/fbt/202602/inbound_orders/tracking_update`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token from auth flow.

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `shop_cipher` | string | Yes | Shop identifier. |

### Body Parameters (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `order_id` | string | Yes | Inbound order ID. Numeric only. No "IBR" prefix. |
| `parcel_tracking_info` | array | No | List of tracking objects. |

#### `parcel_tracking_info` Object Structure
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `provider_name` | string | Yes | Carrier name (e.g., "FEDEX"). |
| `tracking_number` | string | Yes | Shipment tracking number. |
| `carton_number` | string | Yes | Carton identifier (e.g., "C0001"). |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {}
}
```
* `code`: Status code. `0` means success.
* `message`: Status description.
* `request_id`: Log identifier.
* `data`: Return payload. Empty object on success.

## 6. Error Codes
| Code | Description | Action |
| :--- | :--- | :--- |
| `36009003` | Internal error. | Retry request. |
| `39001002` | Empty request parameters. | Check payload. |
| `39015007` | Access denied. Seller must bind to one merchant. | Check merchant binding. |
| `39015009` | Invalid SellerId. | Check credentials. |
| `39015010` | No inbound orders found. | Check merchant ID. |
| `39015015` | Empty tracking list. | Add tracking info. |
| `39015016` | Invalid carrier. | Check provider name. |
| `39015017` | Invalid carton number. | Check carton format. |
| `39015018` | Order not in 'Shipped' status. | Ship order first. |
| `39015019` | Invalid tracking number. | Check tracking format. |

## 7. Pitfalls & Best Practices
* **Order Status:** Order must be "Shipped". If not, API fails (Error `39015018`).
* **Order ID Format:** Strip "IBR" prefix. Use numbers only.
* **Upsert Behavior:** New data overwrites old data. Send complete tracking list every time.

## 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fbt/202602/inbound_orders/tracking_update?app_key=38abcd&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "order_id": "5766071177167344427",
  "parcel_tracking_info": [
    {
      "provider_name": "FEDEX",
      "tracking_number": "889042812410",
      "carton_number": "C0001"
    }
  ]
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fbt/202602/inbound_orders/tracking_update`*
