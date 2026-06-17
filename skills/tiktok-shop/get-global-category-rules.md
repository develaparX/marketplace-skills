# TikTok Shop API: Get Global Category Rules

# Get Global Category Rules API Guide

## 1. Overview
API fetch certification rules for global category. Use before list product. Verify required certificates per region.

## 2. Endpoint
* **Method:** `GET`
* **Path:** `/product/202309/categories/{category_id}/global_rules`

## 3. Auth & Headers
* **Scope:** `seller.global_product.category.info`
* **Headers:**
  * `Authorization: Bearer <ACCESS_TOKEN>`
  * `Content-Type: application/json`

## 4. Parameters
* **Path Parameter:**
  * `category_id` (string, required): Target category ID.

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "20230915100000A0B0C0D0E0F0G0H0",
  "data": {
    "product_certifications": [
      {
        "id": "cert_123",
        "name": "CE Certification",
        "is_required": true,
        "sample_image_url": "https://example.com/sample.jpg",
        "required_regions": ["EU", "GB"],
        "optional_regions": ["US"],
        "requirement_conditions": []
      }
    ]
  }
}
```

## 6. Error Handling
Map code to fix:
* `12019002` / `12052023`: Category invalid/missing. Check ID.
* `12052024`: Not leaf category. Use deepest subcategory.
* `12052217`: Region shop must use V2 category. Upgrade category.
* `12052220` / `12052223`: Category blocked. Choose other category.
* `12052230`: Version mismatch. Sync category list.

## 7. Pitfalls & Best Practices
* **Leaf category only:** Parent categories fail (error `12052024`). Use deepest node.
* **Cache rules:** Category rules change slow. Cache response to avoid rate limit.
* **Region check:** Check `required_regions` vs `optional_regions`. Upload correct certs for target market.

## 8. Code Example
```bash
curl -X GET "https://api-api.example.com/product/202309/categories/12345/global_rules" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202309/categories/{category_id}/global_rules`*
