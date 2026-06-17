# TikTok Shop API: Replicate Product

# Replicate Product API Implementation Guide

## 1. Overview
Replicate product to other regions. Use for regional market expansion.

## 2. Endpoint
* **Method:** `POST`
* **Path:** `/product/202507/products/{product_id}/global_replicate`

## 3. Authentication & Headers
* **Scope Required:** `seller.product.write`
* **Headers:**
  * `Authorization: Bearer <access_token>`
  * `Content-Type: application/json`

## 4. Parameters
### Path Parameters
* `product_id` (string, required): ID of source product to replicate.

### Body Parameters
* None.

## 5. Response Structure
JSON response contains:
* `code` (int): Status code.
* `message` (string): Status message.
* `request_id` (string): Request log ID.
* `data` (object): Return information.

### Response Example
```json
{
  "code": 0,
  "message": "success",
  "request_id": "202507010001abc",
  "data": {}
}
```

## 6. Error Handling
Handle specific error codes:

| Error Code | Message / Cause | Action |
| :--- | :--- | :--- |
| `12052500` | Replica already exists in target region. Limit one replica per region. | Stop request. Check existing regional products. |
| `12052501` | Shop uses `GLOBAL_PUBLISHING`. Operation requires `LOCAL_REPLICATION` mode. | Check shop configuration. Change listing method if allowed. |
| `12052503` | Inventory mode is `SHARED` but SKU quantities differ. | Equalize inventory quantities across all SKUs before retry. |
| `12052518` | SKU count does not match source product. | Verify source product SKU structure. Sync SKUs. |

## 7. Pitfalls & Best Practices
* **Verify Shop Mode:** Call fails if shop uses `GLOBAL_PUBLISHING`. Check shop settings first.
* **Match SKUs:** Ensure target configuration matches source SKU count exactly.
* **Inventory Check:** If using `SHARED` inventory, set identical quantities for all SKUs.

## 8. Code Example

### cURL
```bash
curl -X POST "https://api.example.com/product/202507/products/PROD12345/global_replicate" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202507/products/{product_id}/global_replicate`*
