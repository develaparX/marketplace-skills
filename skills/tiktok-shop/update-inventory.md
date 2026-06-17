# TikTok Shop API: Update Inventory

# Update Inventory API Guide

## 1. Purpose
Update product stock levels. Use when warehouse stock changes.

## 2. Endpoint
* **Method:** `POST`
* **Path:** `/product/202309/products/{product_id}/inventory/update`

## 3. Auth & Headers
* **Required Scope:** `seller.product.write`
* **Headers:**
  * `Authorization: Bearer <token>`
  * `Content-Type: application/json`

## 4. Parameters
### Path Parameters
* `product_id` (string): Target product ID. Required.

### Body Parameters (JSON)
*Based on error definitions:*
* `sku_id` (string): Target SKU ID. Required.
* `stock_count` (int): New stock quantity. Required.
* `warehouse_id` (string): Target warehouse ID. Required.

## 5. Response Structure
```json
{
  "code": 0,
  "message": "success",
  "request_id": "string",
  "data": {}
}
```
* `code` (int): Status code.
* `message` (string): Status message.
* `request_id` (string): Log ID.
* `data` (object): Return payload.

## 6. Error Codes
* `12019022`: SKU must contain valid warehouse.
* `12019024`: Stock count invalid.
* `12019028`: Multiple warehouses detected. Include all warehouse IDs and details.
* `12052031`: Invalid product ID(s) found.
* `12052032`: Product does not exist.
* `12052036`: SKU ID necessary.
* `12052037`: Cannot update inventory. Causes: Auto-allocated inventory, incorrect warehouse IDs, or missing warehouse IDs.
* `12052048`: Product not listed in account or shop.
* `12052050`: Product has more than 100 SKUs.

## 7. Pitfalls & Best Practices
* **Include all warehouses:** Product stocked in multiple warehouses requires all warehouse IDs in request. Missing IDs cause error `12052037`.
* **Check allocation type:** Auto-allocated inventory blocks manual updates.
* **SKU limit:** Keep SKUs under 100 per product.

## 8. Example (cURL)
```bash
curl -X POST "https://api.example.com/product/202309/products/prod_12345/inventory/update" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sku_id": "sku_abc123",
    "warehouse_id": "wh_us_east",
    "stock_count": 150
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202309/products/{product_id}/inventory/update`*
