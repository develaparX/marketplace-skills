# TikTok Shop API: Upload Shipping Document And Tracking Info

# API Integration Guide: Upload Return Shipping Info

## Purpose
Upload return shipping label, QR code, tracking number, carrier ID. Use when buyer needs return details from seller.

## Endpoint
*   **Method:** `POST`
*   **URL:** `https://open-api.tiktokglobalshop.com/return_refund/202405/returns/shipping_documents`

## Headers
*   `content-type`: `multipart/form-data`
*   `x-tts-access-token`: Seller access token (user_type = 0)

## Parameters

### Query Parameters
*   `app_key` (string, required): App identifier.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp (UTC).
*   `shop_cipher` (string, required): Shop identifier.
*   `return_ids` (array, required): Return order IDs.
*   `return_id_type` (string, optional): ID type. Values: `RMA`, `SKU_RETURN_ORDER` (default).

### Form Data (Multipart)
*   `return_shipping_label` (file, optional): Return label file. PDF only.
*   `return_qr_code` (file, optional): Return QR code file.
*   `tracking_number` (string, required): Return tracking number.
*   `return_provider_id` (string, required): Return carrier ID.

## Response
```json
{
  "code": 0,
  "data": {},
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7"
}
```

## Error Codes
*   `25021022`: Already uploaded. Do not retry.
*   `25021023`: Format error. Upload PDF only.
*   `25023001`: Invalid return ID. Check ID.
*   `25023002`: Wrong seller. Check shop cipher.
*   `36009003`: Internal error. Retry later.

## Pitfalls & Best Practices
*   **File format:** Label must be PDF. API rejects other formats.
*   **Duplicate upload:** Check return status before upload. API fails if already uploaded.
*   **Query vs Form:** Put auth/IDs in query string. Put files/tracking in multipart form body.

## Example Request
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/return_refund/202405/returns/shipping_documents?sign=SIGNATURE&timestamp=TIMESTAMP&shop_cipher=CIPHER&return_ids=ID&return_id_type=RMA&app_key=KEY' \
  -H 'x-tts-access-token: TOKEN' \
  -H 'content-type: multipart/form-data' \
  -F 'return_qr_code=@"qr.pdf"' \
  -F 'return_shipping_label=@"label.pdf"' \
  -F 'tracking_number=TRACKING_NUM' \
  -F 'return_provider_id=PROVIDER_ID'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /return_refund/202405/returns/shipping_documents`*
