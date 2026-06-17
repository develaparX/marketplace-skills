# TikTok Shop API: Mark Package As Shipped

# Mark Package As Shipped API Guide

## 1. Overview
API marks order package as shipped. Use after carrier takes package.

## 2. Endpoint
* **Method:** `POST`
* **Path:** `/fulfillment/202309/orders/{order_id}/packages`

## 3. Auth & Headers
* **Scope:** `seller.fulfillment.basic`
* **Headers:**
  * `Authorization: Bearer <token>`
  * `Content-Type: application/json`

## 4. Parameters
* **Path Parameter:**
  * `order_id` (string, required): Target order ID.
* **Body Parameters:**
  * None.

## 5. Response Structure
Returns JSON object:
* `code` (int): Status code.
* `message` (string): Status message.
* `request_id` (string): Log ID for debug.
* `data` (object):
  * `order_id` (string): Processed order ID.
  * `order_line_item_ids` (array of strings): Shipped items.
  * `package_id` (string): Created package ID.
  * `warning` (object): Optional. Contains `message` (string).

## 6. Error Handling
* Check `code` field. Non-zero means error.
* Save `request_id`. Need this for support tickets.

## 7. Pitfalls & Best Practices
* **Market Limit:** Only works for US, UK, ES, IE, IT, DE, FR, JP.
* **Warnings:** Check `data.warning.message`. API can succeed but have warnings.

## 8. Code Example
```bash
curl -X POST "https://api.example.com/fulfillment/202309/orders/12345/packages" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fulfillment/202309/orders/{order_id}/packages`*
