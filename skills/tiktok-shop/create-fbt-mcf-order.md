# TikTok Shop API: Create FBT MCF Order

# Create FBT MCF Order API Implementation Guide

## 1. Overview
API create MCF order in FBT system. Use when external channel (like Shopify) get order, need FBT ship.

## 2. Endpoint & Method
*   **Method:** `POST`
*   **Path:** `/fbt/202601/mcf_outbound_orders`
*   **Base URL:** `https://open-api.tiktokglobalshop.com`

## 3. Headers & Authentication

### Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. `user_type` must be `0`.

### Query Parameters
*   `app_key`: Unique app key.
*   `sign`: Signature from gen algorithm.
*   `timestamp`: Unix timestamp GMT (UTC+00:00).
*   `shop_cipher`: Shop identifier.

## 4. Request Parameters

### Body (JSON)
*   `external_order_id` (string, required): OMS order ID.
*   `goods` (array, required): Items to fulfill. Must exist in FBT.
    *   `id` (string, required): Item ID.
    *   `quantity` (number, required): Item count.
*   `consignee` (object, required): Contact info.
    *   `name` (string, required): Recipient name.
    *   `phone_number` (string, required): Recipient phone.
    *   `email` (string, required): Recipient email.
    *   `address` (object, required): Shipping address.
        *   `country_code` (string, required): ISO country code.
        *   `state_or_region` (string, required): State/Region.
        *   `district_or_county` (string, required): District/County.
        *   `city` (string, required): City.
        *   `address_line_1` (string, required): Street address.

## 5. Response Structure
*   `code` (number): Status code. `0` mean success.
*   `message` (string): Status message. Fail reason show here.
*   `request_id` (string): Request log ID.
*   `data` (object): Return payload.
    *   `mcf_order` (object): Created order details.
        *   `external_order_id` (string): OMS order ID.
        *   `mcf_order_id` (string): FBT order ID.
        *   `create_time` (number): Creation timestamp.

## 6. Error Handling
Check `code` in response. If not `0`, handle error:

*   `177001001`: Bad parameter format. Fix request body.
*   `177001002`: Item not in FBT. Verify item ID.
*   `177001003`: Address verification failed. Check address fields.
*   `177001004`: Out of stock. Replenish inventory or use other shipper.
*   `177001006`: No permission for external orders. Contact platform.
*   `177001007`: Duplicate order. `external_order_id` already active.
*   `177001008`: Rate limit hit. Slow down requests.
*   `177001009`: Internal error. Retry.
*   `177001010`: Invalid `mcf_order_id`. Verify ID.
*   `177001011`: Address unreachable. Check shipping destination.
*   `177001012`: Order already pushed. Do not resubmit.
*   `177001013`: Unpaid FBT bill. Pay bill first.

## 7. Pitfalls & Best Practices
*   **Idempotency:** Use unique `external_order_id`. Prevent duplicate orders (error `177001007`).
*   **Address validation:** Verify address before call. Bad address fail (error `177001003`, `177001011`).
*   **Inventory check:** Verify stock levels before call. Insufficient stock fail (error `177001004`).
*   **Billing:** Keep FBT account paid. Unpaid bill block order (error `177001013`).

## 8. Code Example

```bash
curl -X POST 'https

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fbt/202601/mcf_outbound_orders`*
