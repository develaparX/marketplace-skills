# TikTok Shop API: Upload Product Image

# Implementation Guide: Upload Product Image

## 1. Purpose
Upload product image to system. Use when adding new product media or updating existing product images.

## 2. Endpoint
*   **Method:** `POST`
*   **Path:** `/`

## 3. Headers and Authentication
*   `Authorization: Bearer <token>` (Required)
*   `Content-Type: multipart/form-data` (Required)

## 4. Parameters
Form-data body:
*   `image` (File, Required): Binary image data. Limit formats: PNG, JPEG, WebP.
*   `product_id` (String, Required): ID of target product.

## 5. Response Structure
Status: `201 Created`
Body:
```json
{
  "image_url": "https://cdn.example.com/products/image.jpg",
  "product_id": "prod_123"
}
```

## 6. Error Handling
*   `400 Bad Request`: Missing `image` or `product_id`.
*   `401 Unauthorized`: Token missing or expired.
*   `413 Payload Too Large`: File exceeds size limit.
*   `415 Unsupported Media Type`: File not image.

## 7. Pitfalls and Best Practices
*   Validate file headers (magic bytes), not just file extension. Prevent malicious uploads.
*   Resize images on server or use CDN image optimization. Save bandwidth.
*   Generate unique file names. Prevent overwriting existing files.

## 8. Code Example
```bash
curl -X POST https://api.example.com/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "image=@/absolute/path/to/image.jpg" \
  -F "product_id=prod_123"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /`*
