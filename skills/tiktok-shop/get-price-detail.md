# TikTok Shop API: Get Price Detail

# Implementation Guide: Get Price Detail API

## Purpose & Use Cases
API gets detailed price calculations for orders or line items. Includes vouchers, tax, shipping, net price.
Use cases:
* Calculate seller payout.
* Audit tax details.
* Show order cost breakdown in ERP.

## Endpoint & Method
* Method: `GET`
* Path: `/order/202407/orders/{order_id}/price_detail`
* Base URL: `https://open-api.tiktokglobalshop.com`

## Headers & Authentication
Headers:
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token. Get from Get Access Token API.

Query Auth:
* `app_key`: Unique app identifier.
* `sign`: Request signature. Generate via platform algorithm.
* `timestamp`: Unix timestamp (UTC).
* `shop_cipher`: Shop identifier. Get from Get Authorization Shop API.

## Parameters

### Path Parameters
* `order_id` (string, required): Target order ID.

### Query Parameters
* `app_key` (string, required): App key.
* `sign` (string, required): Signature hash.
* `timestamp` (number, required): Unix timestamp (seconds).
* `shop_cipher` (string, required): Shop cipher. Required for cross-border shops.

## Response Structure
Response format: JSON.

### Root Fields
* `code` (number): Status code. `0` means success.
* `message` (string): Error description or success message.
* `request_id` (string): Log ID for debugging.
* `data` (object): Price breakdown details.

### Data Object Fields
* `currency` (string): Currency code (e.g., USD).
* `total` (string): Total price.
* `payment` (string): Buyer paid amount.
* `sku_list_price` (string): Original SKU price.
* `sku_sale_price` (string): SKU price after discount.
* `subtotal` (string): Subtotal amount.
* `subtotal_deduction_seller` (string): Seller discount on subtotal.
* `subtotal_deduction_platform` (string): Platform discount on subtotal.
* `subtotal_tax_amount` (string): Tax on subtotal.
* `voucher_deduction_platform` (string): Platform voucher discount.
* `voucher_deduction_seller` (string): Seller voucher discount.
* `shipping_list_price` (string): Original shipping cost.
* `shipping_sale_price` (string): Shipping cost after discount.
* `shipping_fee_deduction_seller` (string): Seller shipping discount.
* `shipping_fee_deduction_platform` (string): Platform shipping discount.
* `shipping_fee_deduction_platform_voucher` (string): Platform shipping voucher discount.
* `tax_amount` (string): Total tax.
* `tax_rate` (string): Tax rate applied.
* `net_price_amount` (string): Net price.

## Error Handling
Check `code` in response.
* `21001001`: Invalid parameters. Action: Validate inputs.
* `21008111`: Order/package not owned by seller. Action: Verify shop cipher and token match order.
* `36009003`: Internal error. Action: Retry request. Contact support if fail persists.

## Pitfalls & Best Practices
* Wrong shop cipher returns bad data. Always fetch fresh cipher via Get Authorization Shop API.
* Timestamp drift causes signature failure. Sync server clock with NTP.
* Voucher values use different decimal scale (e.g., `1010000` vs `

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /order/202407/orders/{order_id}/price_detail`*
