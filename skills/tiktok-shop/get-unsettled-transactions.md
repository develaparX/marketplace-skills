# TikTok Shop API: Get Unsettled Transactions

# Unsettled Transactions API Implementation Guide

## 1. Purpose
Fetch unpaid orders and adjustments. Use for cash flow projection, financial reconciliation.

## 2. Endpoint
* **Method**: `GET`
* **Path**: `/finance/202507/orders/unsettled`
* **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, `user_type` must be `0`).

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `shop_cipher` | string | Yes | Shop identifier. |
| `sort_field` | string | Yes | Must be `order_create_time`. |
| `page_token` | string | No | Token for next page. |
| `page_size` | number | No | Results per page. Range: `1-100`. Default: `20`. |
| `sort_order` | string | No | `ASC` or `DESC`. Default: `ASC`. |
| `search_time_ge` | number | No | Filter start time. Unix timestamp. |
| `search_time_lt` | number | No | Filter end time. Unix timestamp. |

## 5. Response Structure

### Root Fields
* `code` (number): Status code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Request log identifier.
* `data` (object): Response payload.

### Data Object (`data`)
* `next_page_token` (string): Token for next page. Empty if no more pages.
* `total_count` (number): Total matching records.
* `sum_est_settlement_amount` (string): Estimated settlement sum.
* `sum_est_revenue_amount` (string): Estimated revenue sum.
* `sum_est_adjustment_amount` (string): Estimated adjustment sum.
* `sum_est_fee_amount` (string): Estimated fee sum.
* `transactions` (array): List of transaction objects.

### Transaction Object
* `type` (string): `ORDER` or `ADJUSTMENT`.
* `id` (string): Transaction ID.
* `status` (string): Settlement status.
* `currency` (string): Currency code (e.g., `USD`).
* `estimated_settlement` (string): Estimated settlement time.
* `unsettled_reason` (string): Reason not settled.
* `order_create_time` (number): Order creation timestamp.
* `order_delivery_time` (number): Order delivery timestamp.
* `order_id` (string): Order ID.
* `adjustment_id` (string): Adjustment ID.
* `adjustment_order_id` (string): Linked order ID.

## 6. Errors
* **Code `36009003`**: Internal error. Action: Retry request. If fail, contact support.

## 7. Pitfalls & Best Practices
* **Sort Field Constraint**: `sort_field` only accepts `order_create_time`. Other values cause validation error.
* **Pagination**: Use `next_page_token` from response. Pass into `page_token` query parameter for next page. Do not calculate offsets.
* **Time Format**: Use Unix epoch seconds for `search_time_ge`, `search_time_lt`, and `timestamp`.

## 8. Code Example

### Curl
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/finance/202507/orders/unsettled?search_time_lt=1623812664&timestamp=1623812664&app_key=38abcd&page_size=20&sort_order=ASC&search_time_ge=1623812664&sign=5361235029d141222525e303d742f

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /finance/202507/orders/unsettled`*
