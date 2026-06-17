# TikTok Shop API: Get Transactions by Order

# Guide: Get Transactions by Order API

## 1. Purpose
API get SKU-level transaction details. Use to audit sales, fees, commissions, shipping, taxes, refunds.

## 2. Endpoint
*   Method: `GET`
*   Path: `/finance/202501/orders/{order_id}/statement_transactions`

## 3. Headers & Auth
Set headers:
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (`user_type = 0`).

Query params need auth:
*   `app_key`: Unique app key.
*   `sign`: Signature from algorithm.
*   `timestamp`: Unix timestamp GMT (UTC+00:00).
*   `shop_cipher`: Shop identifier.

## 4. Parameters
### Path Parameters
*   `order_id` (string, required): TikTok Shop order ID.

### Query Parameters
*   `app_key` (string, required): App key.
*   `sign` (string, required): Signature.
*   `timestamp` (number, required): Unix timestamp.
*   `shop_cipher` (string, required): Shop cipher.

## 5. Response Structure
JSON response fields:
*   `code` (number): Status code. `0` is success.
*   `message` (string): Status message.
*   `request_id` (string): Log ID.
*   `data` (object): Transaction data.
    *   `order_id` (string): Order ID.
    *   `order_create_time` (number): Order creation timestamp.
    *   `currency` (string): Currency code.
    *   `revenue_amount` (string): Total revenue.
    *   `fee_and_tax_amount` (string): Fees and taxes.
    *   `shipping_cost_amount` (string): Shipping cost.
    *   `settlement_amount` (string): Final payout.
    *   `sku_transactions` (array): SKU details.
        *   `sku_id` (string): SKU ID.
        *   `sku_name` (string): SKU name.
        *   `statement_id` (string): Statement ID.
        *   `product_name` (string): Product name.
        *   `quantity` (string): Quantity.
        *   `settlement_amount` (string): SKU payout.
        *   `revenue_amount` (string): SKU revenue.
        *   `revenue_breakdown` (object):
            *   `subtotal_before_discount_amount` (string): Base price.
            *   `seller_discount_amount` (string): Seller discount.

## 6. Error Handling
*   Error `36009003`: Internal error. Action: Retry request. If fail, contact support.

## 7. Pitfalls & Best Practices
*   Sign generation: Sort query params alphabetically before hash. Wrong order cause auth fail.
*   Timestamp: Must be current UTC. Old timestamp cause auth fail.
*   Token: Use seller token (`user_type = 0`).
*   Amounts: Values are strings. Parse to decimal to avoid float rounding error.

## 8. Code Example
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/finance/202501/

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /finance/202501/orders/{order_id}/statement_transactions`*
