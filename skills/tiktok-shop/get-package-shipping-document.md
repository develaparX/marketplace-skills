# TikTok Shop API: Get Package Shipping Document

# Guide: Get Package Shipping Document

Get URL for shipping label and packing slip. Use only for TikTok Shipping orders. Use after arrange shipment, before carrier pickup.

## Endpoint

*   **Method:** `GET`
*   **Path:** `/fulfillment/202309/packages/{package_id}/shipping_documents`

## Authentication

*   **Required Scope:** `seller.fulfillment.basic`
*   **Headers:**
    *   `x-tts-access-token`: Access token.
    *   `Content-Type`: `application/json`

## Parameters

### Path Parameter
*   `package_id` (string, required): Target package identifier.

## Response

### Schema
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "string",
  "data": {
    "doc_url": "string",
    "tracking_number": "string"
  }
}
```

### Fields
*   `code` (int): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier.
*   `data.doc_url` (string): Document download URL.
*   `data.tracking_number` (string): Package tracking number.

## Error Handling

Handle specific error codes:

*   `11034002` / `21008017`: Seller Shipping order. Get label offline. Upload manually.
*   `21023035` / `21042104`: Shipment not arranged. Call arrange shipment API first.
*   `11034037`: Document generating. Wait. Retry request.
*   `21021010`: Active after-sale request. Process return/refund first.
*   `21023046` / `21042102`: Package already shipped/picked up. Printing blocked.

## Pitfalls & Best Practices

*   **Check Shipping Type:** API fails on Seller Shipping. Check order fulfillment type before call.
*   **Handle Generation Delay:** Code `11034037` means logistics provider is generating PDF. Implement retry logic with exponential backoff.
*   **Download Immediately:** Document URLs expire. Download PDF and store locally. Do not hotlink.

## Code Example

```bash
curl -X GET "https://api-sandbox.tiktokshop.com/fulfillment/202309/packages/123456789/shipping_documents" \
  -H "x-tts-access-token: ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /fulfillment/202309/packages/{package_id}/shipping_documents`*
