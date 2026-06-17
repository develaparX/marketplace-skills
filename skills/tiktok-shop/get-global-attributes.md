# TikTok Shop API: Get Global Attributes

# Get Global Attributes API Guide

## 1. Purpose & Use Case
API get product/sales attributes for global category. Use before listing product. Ensure correct attributes sent.

## 2. Endpoint & HTTP Method
*   Method: `GET`
*   Path: `/product/202309/categories/{category_id}/global_attributes`

## 3. Headers & Auth
*   Authorization: `Bearer <token>`
*   Required Scope: `seller.global_product.category.info`

## 4. Parameters
*   `category_id` (string, path, required): Target category ID.

## 5. Response Structure
```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "attributes": [
      {
        "id": "string",
        "name": "string",
        "type": "string",
        "is_requried": true,
        "values": [
          {
            "id": "string",
            "name": "string"
          }
        ],
        "is_multiple_selection": true,
        "is_customizable": true,
        "requirement_conditions": [
          {
            "region": "string",
            "condition_type": "string",
            "attribute_id": "string"
          }
        ]
      }
    ]
  }
}
```
*Note: API use spelling `is_requried`.*

## 6. Error Handling
*   `12052023`: Category does not exist. Action: Check ID.
*   `12052024`: Category is not final category. Action: Use leaf category.
*   `12052217`: All region shops must use V2 categories. Action: Check V2 docs.

## 7. Pitfalls & Best Practices
*   Leaf node required. API fail if category has subcategories.
*   Typo warning. Code must parse `is_requried`, not `is_required`.
*   Region rules. Check `requirement_conditions` array. Attributes vary by region.

## 8. Code Example
```bash
curl -X GET "https://api-gateway.domain/product/202309/categories/12345/global_attributes" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /product/202309/categories/{category_id}/global_attributes`*
