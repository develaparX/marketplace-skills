# TikTok Shop API: Create Responsible Person

# EU Responsible Person API Implementation Guide

## 1. Overview
API add EU responsible person for product compliance. Use when sell products in EU market.

## 2. Endpoint
* **Method:** `POST`
* **Path:** `/product/202409/compliance/responsible_persons`

## 3. Headers & Authentication
* **Scope required:** `seller.product.basic`
* **Headers:**
  * `content-type`: `application/json` (Required)
  * `x-tts-access-token`: Seller access token (Required)

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Signature from algorithm |
| `timestamp` | int | Yes | Unix timestamp GMT (UTC+00:00) |

### Request Body (JSON)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | string | Yes | Name. Max 200 characters |
| `email` | string | Yes | Email address |
| `phone_number` | object | Yes | Phone number object |
| `address` | object | Yes | Residential address object |
| `locale` | string | No | BCP-47 code. Allowed: `de-DE`, `en-IE`, `es-ES`, `fr-FR`, `it-IT` |

## 5. Response Structure
Format: JSON
```json
{
  "code": 0,
  "message": "success",
  "request_id": "20240918120000...",
  "data": {
    "responsible_person_id": "rp_123456"
  }
}
```

## 6. Error Codes
Handle these API errors:
* `38023022`: Invalid responsible person's name
* `38023024`: Invalid responsible person's address
* `38023025`: Internal error
* `38023026`: Invalid EU country
* `38023027`: Number of responsible person exceeds the limit
* `38023028`: Invalid EU phone country code
* `38023041`: Invalid phone number length
* `38023042`: Invalid email format
* `38023043`: Invalid address length
* `38023044`: Invalid name

## 7. Pitfalls & Best Practices
* **Limit check:** API limit total persons. Track count to avoid error `38023027`.
* **Validation:** Validate email format and phone length locally before send. Save API roundtrips.
* **Country check:** Address must be in EU country. Phone country code must match EU.

## 8. Code Example

```bash
curl -X POST "https://api.example.com/product/202409/compliance/responsible_persons?app_key=YOUR_APP_KEY&sign=YOUR_SIGNATURE&timestamp=1726660800" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: YOUR_ACCESS_TOKEN" \
  -d '{
    "name": "John Doe",
    "email": "john.doe@example.eu",
    "phone_number": {
      "country_code": "49",
      "number": "1701234567"
    },
    "address": {
      "street": "Hauptstr. 1",
      "city": "Berlin",
      "zip_code": "10115",
      "country": "DE"
    },
    "locale": "de-DE"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
