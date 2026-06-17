# TikTok Shop API: Get Showcase Products

# Get Showcase Products Implementation Guide

## Overview
API fetch creator showcase products. Use to sync showcase items. Max limit 2000 products.

## Endpoint
*   **Method**: `GET`
*   **Path**: `/affiliate_creator/202405/showcases/products`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Creator access token. Get from "Get Access Token" flow. User type must be 1.

## Query Parameters
*   `app_key` (string, required): Unique app identifier.
*   `sign` (string, required): Signature from gen algorithm. Verify sender.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `page_size` (number, required): Results per page. Range: `[1-20]`.
*   `page_token` (string, optional): Token for next page. Skip for page 1.
*   `origin` (string, required): Source. Values: `LIVE` or `SHOWCASE`.

## Response Structure
*   `code` (number): Status code. 0 is success.
*   `message` (string): Error details.
*   `request_id` (string): Log identifier.
*   `data` (object): Payload. Contains `products` array.
    *   `products[].id` (string): Product ID.
    *   `products[].shop.name` (string): Shop name.
    *   `products[].addition.customized_main_images` (array): Image details (width, height, url).
    *   `products[].price.original_price` (object): Price range (minimum_amount, maximum_amount).

## Error Handling
*   **Code `18001405`**: Creator account lacks selection region. Check creator settings.
*   **Code `36009003`**: Internal error. Retry request. Contact support if fail persist.

## Pitfalls & Best Practices
*   **Pagination**: Max 2000 items. Loop using `next_page_token`. Stop when token empty.
*   **Signature**: Generate `sign` using exact query params. Wrong order cause auth fail.
*   **Timestamp**: Must be current UTC time. Server reject old timestamp.

## Code Example

### Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/affiliate_creator/202405/showcases/products?timestamp=1623812664&page_size=10&page_token=V231as2V0PTAK&origin=LIVE&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Response
```json
{
  "code": 0,
  "data": {
    "products": [
      {
        "id": "53219092314",
        "shop": {
          "name": "Gift store"
        },
        "addition": {
          "customized_main_images": [
            {
              "width": 100,
              "heigth": 100,
              "url": "https://p16-sign.tiktokcdn-us.com/tos-useast5-avt-0068-tx/d76b8cc1b598de90ad5048df46e672b3~c5_100x100.webp?x-expires=1691895600&x-signature=oAT9KOL7aCN3Did9U%2FoKEsbBDj0%3D"
            }
          ]
        },
        "price": {
          "original_price": {
            "minimum_amount": "12.21",
            "maximum_amount": "100.00"
          }
        }
      }
    ]
  }
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_creator/202405/showcases/products`*
