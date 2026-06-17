# TikTok Shop API: Partial Edit Manufacturer

# Implement Partial Edit Manufacturer API

## 1. Purpose
Update manufacturer details partially. Use when need change specific fields without sending full payload.

## 2. Endpoint
*   **Method**: `POST`
*   **Path**: `/product/202409/compliance/manufacturers/{manufacturer_id}/partial_edit`

## 3. Headers and Auth
*   **Scope**: `seller.product.basic`
*   **Headers**:
    *   `Authorization`: Bearer token
    *   `Content-Type`: `application/json`

## 4. Parameters
*   **Path Parameter**:
    *   `manufacturer_id` (string, required): Target manufacturer ID.
*   **Body Parameter**:
    *   JSON object containing fields to update.

## 5. Response Structure
```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {}
}
```
*   `code` (int): Status code.
*   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object): Return information.

## 6. Error Handling
Check `code` field. Log `request_id` for support.
Common errors:
*   `400`: Invalid body fields.
*   `401`: Token expired or missing.
*   `403`: Missing `seller.product.basic` scope.
*   `404`: Manufacturer ID not found.

## 7. Pitfalls and Best Practices
*   Only send fields needing change. Avoid full payload.
*   Log `request_id`. Crucial for debugging.

## 8. Code Example
```bash
curl -X POST "https://api.example.com/product/202409/compliance/manufacturers/12345/partial_edit" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "New Manufacturer Name"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202409/compliance/manufacturers/{manufacturer_id}/partial_edit`*
