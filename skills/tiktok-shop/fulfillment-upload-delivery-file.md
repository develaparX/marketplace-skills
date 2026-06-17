# TikTok Shop API: Fulfillment Upload Delivery File

# Implementation Guide: Fulfillment Upload Delivery File

## 1. Purpose
Upload proof of delivery. Get file URL. Use when package delivered.

## 2. Endpoint
*   **Method**: `POST`
*   **Path**: `/fulfillment/202309/files/upload`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Auth
### Headers
*   `content-type`: `multipart/form-data` (Required)
*   `x-tts-access-token`: Seller access token (Required)

### Query Parameters
*   `app_key`: App key (Required)
*   `sign`: Request signature (Required)
*   `timestamp`: Unix timestamp GMT (Required)
*   `shop_cipher`: Shop cipher (Required)
*   `category_asset_cipher`: Partner ID (Optional)

## 4. Parameters
### Form Data (Multipart)
*   `data` (string/binary): PDF file data. Max 10MB. (Required)
*   `name` (string): File name. Must include extension (e.g., `file.pdf`). (Required)

## 5. Response Structure
Success returns JSON:
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log ID.
*   `data` (object):
    *   `url` (string): Uploaded file URL.
    *   `name` (string): Uploaded file name.

## 6. Error Handling
Check `code` in response.
*   `12038002`: Invalid file data. Fix: Check file integrity.
*   `12038004`: Invalid file type. Fix: Use PDF format.
*   `12038005`: File too big. Fix: Keep under 10MB.

## 7. Pitfalls & Best Practices
*   **Format**: PDF only. Other formats fail.
*   **Size**: Under 10MB. Compress before upload.
*   **Name**: Must end with `.pdf`.
*   **Signature**: Generate signature using standard algorithm. Include query params in signature.

## 8. Code Example

### Request
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fulfillment/202309/files/upload?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'content-type: multipart/form-data' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -F 'data=@"file.pdf"' \
  -F 'name=attachment_file.pdf'
```

### Response
```json
{
  "code": 0,
  "data": {
    "url": "https://maellane.bytedance.net/wsos_v2/oec_fulfillment_doc_tts/o",
    "name": "attachment_file.pdf"
  },
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fulfillment/202309/files/upload`*
