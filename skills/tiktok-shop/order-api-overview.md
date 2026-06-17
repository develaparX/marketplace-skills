# TikTok Shop API: Order API overview

# Order API Implementation Guide

## 1. Purpose & Use Cases
API manage order lifecycle. Use to:
* Sync order data.
* Track order status.
* Map external system IDs.
* Update blind box results.

---

## 2. Endpoints
| Method | Path | Description |
| :--- | :--- | :--- |
| `POST` | `/docv2/page/get-order-list-202309` | Get list of orders |
| `GET` | `/docv2/page/get-price-detail-202407` | Get price details |
| `POST` | `/docv2/page/add-external-order-references-202406` | Link external ID to order |
| `GET` | `/docv2/page/get-external-order-references-202406` | Get linked external ID |
| `POST` | `/docv2/page/search-order-by-external-order-reference-202406` | Find order by external ID |
| `GET` | `/docv2/page/get-order-detail-202507` | Get single order details |
| `POST` | `/docv2/page/update-the-blind-box-opening-results-202605` | Update blind box results |

---

## 3. Headers & Auth
Send headers with every request:
```http
Authorization: Bearer <token>
Content-Type: application/json
```

---

## 4. Parameters & Entities

### Core Entities
* **Order ID** (string): Unique buyer order identifier.
* **SKU ID** (string): Unique stock keeping unit identifier.
* **Order Line Item ID** (string): Unique item line identifier.

### Endpoint Parameters

#### `POST /docv2/page/get-order-list-202309`
* `status` (string, optional): Filter by order status.
* `page_size` (integer, optional): Max orders to return.
* `cursor` (string, optional): Pagination token.

#### `GET /docv2/page/get-price-detail-202407`
* `order_id` (string, required): Target order.

#### `POST /docv2/page/add-external-order-references-202406`
* `order_id` (string, required): Target order.
* `external_order_ref` (string, required): External system ID.

#### `GET /docv2/page/get-external-order-references-202406`
* `order_id` (string, required): Target order.

#### `POST /docv2/page/search-order-by-external-order-reference-202406`
* `external_order_ref` (string, required): External system ID.

#### `GET /docv2/page/get-order-detail-202507`
* `order_id` (string, required): Target order.

#### `POST /docv2/page/update-the-blind-box-opening-results-202605`
* `order_id` (string, required): Target order.
* `sku_id` (string, required): Target SKU.
* `result_details` (object, required): Opening outcome.

---

## 5. State Machine & Transitions

### Status List
* `UNPAID`: Order created. Payment pending.
* `ON_HOLD`: Paid. Remorse period active. Fulfillment blocked. Address hidden.
* `AWAITING_SHIPMENT`: Ready for logistics.
* `PARTIALLY_SHIPPING`: Some items shipped.
* `AWAITING_COLLECTION`: Logistics set. Awaiting pickup.
* `IN_TRANSIT`: Carrier has package.
* `DELIVERED`: Items arrived.
* `COMPLETED`: Order finished. No refunds allowed.
* `CANCELLED`: Order dead.

### Valid Transitions
```
[UNPAID] ------------(Buyer pays)-------------> [ON_HOLD]
[UNPAID] ------------(Buyer cancels/timeout)----> [CANCELLED]

[ON_HOLD] -----------(1 hour passes)-----------> [AWAITING_SHIPMENT]
[ON_HOLD] -----------(Buyer/Seller cancel)-----> [CANCELLED]

[AWAITING_SHIPMENT] -(Some items ship)---------> [PARTIALLY_SHIPPING]
[AWAITING_SHIPMENT] -(All items ship)----------> [AWAITING_COLLECTION]
[AWAITING_SHIPMENT] -(Cancel/Timeout)----------> [CANCELLED]

[PARTIALLY_SHIPPING] (Rest ship)---------------> [AWAITING_COLLECTION]
[PARTIALLY_SHIPPING] (Cancel unshipped)--------> [CANCELLED]

[AWAITING_COLLECTION] (Carrier tracking set)----> [IN_TRANSIT]
[AWAITING_COLLECTION] (Seller cancel/Timeout)--> [CANCELLED]

[IN_TRANSIT] --------(Delivery done)-----------> [DELIVERED]

[DELIVERED] ---------(Refund/Period ends)------> [COMPLETED]
```

---

## 6. Error Handling
API returns standard HTTP codes:
* `400 Bad Request`: Missing parameters.
* `401 Unauthorized`: Bad token.
* `404 Not Found`: Order ID not exist.
* `409 Conflict`: Invalid state transition (e.g., ship order when `ON_HOLD`).
* `500 Internal Error`: Server issue. Retry with backoff.

---

## 7. Pitfalls & Best Practices
* **Remorse Period**: Do not ship when status is `ON_HOLD`. Address data hidden anyway. Wait for status `AWAITING_SHIPMENT`.
* **Split Shipments**: If shipping items separately, transition goes `AWAITING_SHIPMENT` -> `PARTIALLY_SHIPPING` -> `AWAITING_COLLECTION`. Track line items carefully.
* **Idempotency**: Save external references early to prevent double-processing.

---

## 8. Code Examples

### Get Order Detail
```bash
curl -X GET "https://api.example.com/docv2/page/get-order-detail-202507?order_id=12345" \
  -H "Authorization: Bearer token123" \
  -H "Content-Type: application/json"
```

### Add External Reference
```bash
curl -X POST "https://api.example.com/docv2/page/add-external-order-references-202406" \
  -H "Authorization: Bearer token123" \
  -H "Content-Type: application/json" \
  -d '{
    "order_id": "12345",
    "external_order_ref": "EXT-9988"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
