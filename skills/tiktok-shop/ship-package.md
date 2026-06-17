# TikTok Shop API: Ship Package

# Ship Package API

## 1. Purpose
API triggers package shipment. Use after package packed, ready for carrier.

## 2. Endpoint
*   Method: `POST`
*   Path: `/`

## 3. Headers & Auth
*   `Authorization: Bearer <token>`
*   `Content-Type: application/json`

## 4. Parameters
Request body (JSON):
*   `package_id` (string, required): Unique package ID.
*   `carrier` (string, required): Carrier name (e.g., "USPS", "FedEx").
*   `service_level` (string, required): Shipping speed (e.g., "ground", "next_day").

## 5. Response
Status: `200 OK`
Body (JSON):
```json
{
  "shipment_id": "shp_987654321",
  "status": "shipped",
  "tracking_number": "1Z999AA10123456784",
  "label_url": "https://shipping.service/labels/lbl_123.pdf"
}
```

## 6. Error Handling
*   `400 Bad Request`: Missing required fields.
*   `401 Unauthorized`: Invalid API key.
*   `422 Unprocessable Entity`: Carrier rejected request.

## 7. Pitfalls & Best Practices
*   Double shipping: Retrying failed requests can charge twice. Use idempotency keys.
*   Carrier timeouts: Carrier APIs slow. Set client timeout to 30 seconds.

## 8. Code Example
```bash
curl -X POST https://api.shipping.service/v1/ \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "package_id": "pkg_12345",
    "carrier": "FedEx",
    "service_level": "ground"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /`*
