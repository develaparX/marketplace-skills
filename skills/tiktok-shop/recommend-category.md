# TikTok Shop API: Recommend Category

# Recommend Category API Implementation Guide

## 1. Overview
API find best category for product. Use during product creation. Input title, description, images. Get category ID.

## 2. Endpoint
* **Method:** `POST`
* **URL:** `https://open-api.tiktokglobalshop.com/product/202309/categories/recommend`

## 3. Headers & Auth
### Headers
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, user_type = 0).

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Request signature.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `shop_cipher` (string, required): Shop identifier.

## 4. Parameters
### Request Body (JSON)
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `product_title` | string | Yes | Product name. |
| `description` | string | No | HTML format description. |
| `images` | array | No | List of image objects containing `uri`. |
| `category_version` | string | No | Category tree version: `v1` or `v2`. |
| `listing_platform` | string | No | Target platform: `TIKTOK_SHOP` or `TOKOPEDIA`. |
| `include_prohibited_categories` | boolean | No | Include categories blocked on TikTok Shop. |
| `locale` | string | No | BCP-47 locale code for category names. |

## 5. Response Structure
JSON payload returned:
* `code` (number): Status code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Request log identifier.
* `data` (object): Payload.
  * `leaf_category_id` (string): Recommended leaf category ID.
  * `categories` (array): Category hierarchy list.
    * `id` (string): Category ID.
    * `name` (string): Category name.
    * `level` (number): Category level.
    * `is_leaf` (boolean): Leaf node indicator.
    * `permission_statuses` (array): Permissions (e.g., `INVITE_ONLY`).

## 6. Error Handling
Check `code` in response. Key error codes:
* `12052261`: Product name empty.
* `12052931`: Title format invalid (no emojis, no HTML escapes, no repeating chars).
* `12052345`: HTML tag not supported in description.
* `12052217`: Region shop must use V2 categories.
* `12052912`: Category outside seller main category scope.
* `12052722`: Image URI does not exist in TikTok Shop.

## 7. Pitfalls & Best Practices
* **Upload images first:** Image URIs must exist in TikTok Shop storage. Call upload image API before calling this API.
* **Clean title text:** Remove emojis, HTML escape characters, and repeating characters (e.g. "aaaaa") before sending.
* **Check HTML tags:** Description HTML must not nest unsupported tags or contain illegal attributes.
* **Use V2:** Set `category_version` to `v2` for new region shops to avoid error `12052217`.

## 8. Code Example

```bash
curl -X POST \
 'https://open-api.tiktokglobalshop.com/product/202309/categories/recommend?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "product_title": "Men'\''s Fashion Sports Low Cut Cotton Breathable Ankle Short",
  "description": "\u003cp\u003ePlease check the measurements before purchase.\u003c/p\u003e\u003cul\u003e  \u003cli\u003eM-Size\u003c/li\u003e  \u003cli\u003eXL-Size\u003c/li\u003e\u003c/ul\u003e \u003cimg src=\"https://p16-oec-va.ibyteimg.com/tos-maliva-i-o3syd03w52-us/181595ea7d26489284b5667488d708c1~tplv-o3syd03w52-origin-jpeg.jpeg?from=1432613627\" width='\''100'\'' height='\''100'\'' /\u003e  ",
  "images": [
    {
      "uri": "tos-maliva-i-o3syd03w52-us/c668cdf70b7f483c94dbe"
    }
  ],
  "category_version": "v1",
  "listing_platform": "TIKTOK_SHOP",
  "include_prohibited_categories": false,
  "locale": "en"
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202309/categories/recommend`*
