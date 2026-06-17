# TikTok Shop API: Partial Edit Responsible Person

# Implementation Guide: Partial Edit Responsible Person

## 1. Purpose
Update specific fields for compliance responsible person. Use when details change. Avoids full resource overwrite.

## 2. Endpoint
*   **Method:** `POST`
*   **Path:** `/product/202409/compliance/responsible_persons/{responsible_person_id}/partial_edit`

## 3. Authentication & Headers
*   **Scope:** `seller.product.basic`
*   **Headers:**
    *   `Authorization: Bearer <ACCESS_TOKEN>`
    *   `Content-Type: application/json`

## 4. Parameters
### Path Parameters
*   `responsible_person_id` (string, required): Unique identifier of target responsible person.

### Request Body
*   JSON object containing fields to update.

## 5. Response Structure
JSON response fields:
*   `code` (int): Status code.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier.
*   `data` (object): Return payload.

## 6. Error Handling
*   Check `code` field.
*   `400`: Invalid payload.
*   `401`: Missing/expired token.
*   `403`: Missing scope `seller.product.basic`.
*   `404`: ID not found.

## 7. Best Practices
*   Use `POST` method. API does not use `PATCH`.
*   Send only modified fields.
*   Log `request_id` for support.

## 8. Code Example
```bash
curl -X POST "https://api.example.com/product/202409/compliance/responsible_persons/RP12345/partial_edit" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "new_email@example.com"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202409/compliance/responsible_persons/{responsible_person_id}/partial_edit`*
