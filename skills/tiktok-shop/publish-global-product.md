# TikTok Shop API: Publish Global Product

# Publish Global Product API Guide

## 1. Purpose
Publish global product to local markets. Use after product creation or update.

## 2. Endpoint
* **Method:** `POST`
* **Path:** `/product/202309/global_products/{global_product_id}/publish`

## 3. Auth & Headers
* **Scope:** `seller.global_product.write`
* **Headers:**
  * `Authorization: Bearer <ACCESS_TOKEN>`
  * `Content-Type: application/json`

## 4. Parameters
* **Path Parameters:**
  * `global_product_id` (string, required): Target product ID.

## 5. Response
```json
{
  "code": 0,
  "message": "success",
  "request_id": "req_123456",
  "data": {}
}
```
* `code` (int): Status.
* `message` (string): Status description.
* `request_id` (string): Log ID.
* `data` (object): Extra details.

## 6. Error Codes
* `12019004`: Seller inactive.
* `12019010`: Price invalid.
* `12019016`: Warehouse details missing.
* `12019028`: Multiple warehouses. Need all IDs.
* `12019113`: System error ("pro").

## 7. Pitfalls & Best Practices
1. Verify seller account status is active before publishing.
2. Configure all warehouse details for target markets.
3. If multiple warehouses exist, map all warehouse IDs to the product.
4. Call publish API.

## 8. Code Example
```bash
curl -X POST "https://api.example.com/product/202309/global_products/GP12345/publish" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /`*
