# TikTok Shop API: Upload Message Image

# Upload Message Image API Implementation Guide

## Overview
Upload image first. Send IM Message API require image URL. 

## Endpoint
*   **Method**: `POST`
*   **URL**: `https://open-api.tiktokglobalshop.com/affiliate_seller/202511/images/upload`

## Headers
*   `content-type`: `multipart/form-data`
*   `x-tts-access-token`: Seller access token (user_type = 0).

## Parameters

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from generation algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).

### Body Parameters (Multipart Form)
*   `data` (binary, required): Image file. Format must be jpg, gif, webp, png. Max size 10MB.

## Implementation Sequence
1. Generate the signature (`sign`) and Unix timestamp (`timestamp`).
2. Send the POST request with the image file in the `data` field of the multipart form.
3. Extract the image URL from the response `data.url` field.
4. Use the extracted URL to send the image message via the Send IM Message API.

## Response Structure
*   `code` (number): Status code. `0` mean success.
*   `message` (string): Error details or success status.
*   `request_id` (string): Request log ID.
*   `data` (object):
    *   `url` (string): Image URL.
    *   `width` (number): Image width.
    *   `height` (number): Image height.

## Error Codes
*   `36009003`: Internal error. Retry request. Contact support if fail persist.
*   `45101001`: Internal error. Retry request later. Contact support if fail persist.

## Pitfalls & Best Practices
*   **Format check**: Use jpg, gif, webp, png. Other format reject.
*   **Size limit**: Keep image under 10MB. Large file fail.
*   **Token type**: Use seller token. `user_type` must be 0.

## Example Request (cURL)
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_seller/202511/images/upload?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=16238126

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202511/images/upload`*
