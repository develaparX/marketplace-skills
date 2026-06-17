# TikTok Shop API: Calculate Refund

# Calculate Refund API Implementation Guide

## 1. Purpose
API calculate estimated refund amount. Use before cancel, refund, or return-and-refund request. Prevent math error.

## 2. Endpoint
*   Method: `POST`
*   URL: `https://open-api.tiktokglobalshop.com/return_refund/202602/refunds/calculate`

## 3. Headers & Auth
Query parameters:
*   `app_key` (string, required): App unique key.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier.

Headers:
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (user_type = 0).

## 4. Parameters
Body (JSON):
*   `order_id` (string, required): TikTok Shop order ID.
*   `request_type` (string, required): `CANCEL`, `REFUND`, or `RETURN_AND_REFUND`.
*   `reason_name` (string, required): Seller reason for return.
*   `shipment_type` (string, optional): `PLATFORM` or `BUYER_ARRANGE`.
*   `handover_method` (string, optional): `DROP_OFF` or `PICKUP`.
*   `order_line_item_ids` (array of strings, optional): Line item IDs.
*   `skus` (array of objects, optional): SKU list. Each object: `sku_id` (string), `quantity` (number).
*   `order_line_list` (array of objects, optional): Bundle-compatible line list. Each object: `order_line_item_id` (string).

## 5. Response
JSON object:
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object): Refund details.
    *   `order_refund_amount` (object):
        *   `currency` (string): Currency code.
        *   `refund_total` (string): Total refund.
        *   `refund_subtotal` (string): Subtotal refund.
        *   `refund_shipping_fee` (string): Shipping refund.
        *   `refund_tax` (string): Tax refund.
        *   `retail_delivery_fee` (string): Delivery fee refund.

## 6. Error Codes
*   `25001001`: Invalid parameter. Check types and formats.
*   `25007006`: Order not found. Check `order_id`.

## 7. Pitfalls & Best Practices
*   **Bundle orders**: Use `order_line

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /return_refund/202602/refunds/calculate`*
