# TikTok Shop API: Update Global Inventory

# API Guide: Update Global Inventory

## 1. Overview
API updates stock levels for global products. Use when warehouse inventory changes.

## 2. Endpoint
*   **Method**: `POST`
*   **Path**: `/product/202309/global_products/{global_product_id}/inventory/update`

## 3. Headers & Auth
*   **Scope**: `seller.global_product.write`
*   **Headers**:
    *   `Authorization`: Bearer token
    *   `Content-Type`: `application/json`

## 4. Parameters
### Path Parameters
*   `global_product_id` (string, required): Target product ID.

### Body Parameters
*   Source schema defines no body parameters. 

## 5. Response Structure
JSON object:
*   `code` (int): Status code.
*   `message` (string): Status message.
*   `request_id` (string): Log ID for debug.
*   `data` (object): Return details.

## 6. Error Handling
Handle specific error codes:

| Code | Message / Cause | Action |
| :--- | :--- | :--- |
| `36009003` | Internal error. | Retry request. |
| `12019113` | Product status invalid. | Check product state. |
| `12019114` | Seller has no permission. | Verify seller credentials. |
| `12019117` | Missing variations. | Add SKU variation details. |
| `12019150` | Product ID does not exist. | Verify product ID. |
| `12052048` | Product not in account/shop. | Check shop ownership. |
| `12052055` | Inventory limit exceeded. | Adjust stock quantity. |
| `12052094` | No multiple warehouse permission. | Request permission. |
| `12052142` | No multi global warehouse permission. | Request permission. |
| `12052143` | SKU warehouse mismatch. | Align warehouses. |
| `12052145` | Activity warehouse locked. | Do not delete warehouse. |
| `12052146` | Inventory too low. | Set stock higher than locked quantity. |
| `12052260` | Product ID does not exist. | Verify product ID. |
| `12052379` | Region mismatch. | Check warehouse coverage. |
| `12052447` | Chinese warehouse has campaign stock. | Clear campaign stock before adding overseas warehouse. |
| `12052448` | Local fulfillment required. | Add overseas warehouse. |

## 7. Pitfalls & Best Practices
*   **Locked Stock**: Campaigns lock inventory. Drop below locked limit triggers error `12052146`. Check active campaigns before reducing stock.
*   **Warehouse Match**: SKU warehouse must match global warehouse. Mismatch triggers error `12052143`.
*   **Region Rules**: Local fulfillment mandatory for certain countries. Add local warehouse to avoid error `12052448`.

## 8. Code Example

```bash
curl -X POST "https://api.platform.com/product/202309/global_products/PROD12345/inventory/update" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202309/global_products/{global_product_id}/inventory/update`*
