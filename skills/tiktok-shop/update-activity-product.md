# TikTok Shop API: Update Activity Product

# API Guide: Update Activity Product

## 1. Overview
Add products or SKUs to discount/flash deal activity. Update existing discounts. Use when merchant changes promotion items.

## 2. Endpoint
* **Method:** `PUT`
* **Path:** `/promotion/202309/activities/{activity_id}/products`

## 3. Headers & Auth
* **Scope:** `seller.promotion.write`
* **Headers:**
  * `Authorization: Bearer <token>`
  * `Content-Type: application/json`

## 4. Parameters
### Path Parameters
* `activity_id` (string, required): Target promotion activity ID.

### Body Parameters
*Note: API schema defines empty parameter list, but payload requires product/SKU data to update.*
* `products` (array, implied): List of products or SKUs to add/update.

## 5. Response Structure
JSON object:
* `code` (int): Status code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Log identifier.
* `data` (object):
  * `activity_id` (string): Updated activity ID.
  * `title` (string): Activity title.
  * `update_time` (int): Epoch timestamp.
  * `status` (string): Activity status.
  * `total_count` (int): Total product count.

## 6. Error Handling
* Check `code` field. Non-zero means failure.
* Log `request_id` for support.
* Common HTTP codes: `401` (Unauthorized), `403` (Forbidden scope), `404` (Activity not found).

## 7. Pitfalls & Best Practices
* **Verify Status:** Do not update expired activities.
* **Batch Limits:** Keep payload size small to avoid timeouts.
* **ID Match:** Double check SKU IDs. Wrong IDs cause silent failures or errors.

## 8. Code Example

```bash
curl -X PUT "https://api.platform.com/promotion/202309/activities/act_12345/products" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "products": [
      {
        "product_id": "prod_987",
        "skus": [
          {
            "sku_id": "sku_654",
            "discount_price": 19.99
          }
        ]
      }
    ]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `PUT /promotion/202309/activities/{activity_id}/products`*
