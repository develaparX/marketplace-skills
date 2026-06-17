# TikTok Shop API: Get Category Rules

# Get Category Rules API Implementation Guide

## 1. Purpose
API get extra listing rules. Use before post product. Check if need certificate.

## 2. Endpoint
*   **Method**: `GET`
*   **Path**: `/product/202309/categories/{category_id}/rules`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from Get Access Token, user_type = 0)

## 4. Parameters

### Path Parameter
*   `category_id` (string, required): Leaf category ID.

### Query Parameters
*   `app_key` (string, required): Unique developer app key.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier.
*   `category_version` (string, optional): Category tree version (`v1` or `v2`).
*   `locale` (string, optional): BCP-47 locale code.

## 5. Response Structure
JSON object. Main payload in `data`.

```json
{
  "code": 0,
  "message": "Success",
  "request_id": "string",
  "data": {
    "product_certifications": [
      {
        "id": "string",
        "name": "string",
        "is_required": true,
        "document_details": "string",
        "sample_image_url": "string",
        "requirement_conditions": [
          {
            "condition_type": "VALUE_ID_MATCH",
            "attribute_id": "string",
            "attribute_value_id": "string"
          }
        ],
        "expiration_date": {
          "is_required": true
        }
      }
    ]
  }
}
```

## 6. Error Handling
Check `code` in response. Handle specific errors:

*   `12052023`: Category not exist. Check ID.
*   `12052024`: Category not leaf. Find child category.
*   `12052217`: Region shop must use V2 category. Set `category_version=v2`.
*   `12052220`: Category banned on TikTok Shop. Choose other category.
*   `12052223` / `12052226`: Category restricted. Apply in Seller Center Qualification Center.
*   `12052230`: Version and ID mismatch. Check `category_version`.
*   `12052446`: Category closed in market.
*   `36009003`: System error. Retry request.

## 7. Pitfalls & Best Practices
*   **Leaf Category Only**: API fail if category has subcategories. Use leaf category.
*   **Conditional Rules**: Check `requirement_conditions`. Some certificates only required if specific attribute value selected.
*   **V2 Requirement**: Global shops must pass `category_version=v2`.

## 8. Example Request

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/product/202309/categories/600001/rules?timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&category_version=v1&locale=es-MX&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202309/categories/{category_id}/rules`*
