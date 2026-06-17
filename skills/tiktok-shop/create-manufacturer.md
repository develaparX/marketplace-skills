# TikTok Shop API: Create Manufacturer

# Create Manufacturer API Integration Guide

## 1. Overview
Add manufacturer for EU compliance. Use when seller operates in EU. System auto-translates details to EU languages.

## 2. Endpoint
* **Method:** `POST`
* **Path:** `/product/202409/compliance/manufacturers`

## 3. Headers & Authentication
* **Required Scope:** `seller.product.basic`

| Header | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `content-type` | string | Yes | Must be `application/json` |
| `x-tts-access-token` | string | Yes | Seller access token |

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Request signature |
| `timestamp` | integer | Yes | Unix timestamp (UTC) |

### Request Body (JSON)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `name` | string | Yes | Max 255 characters |
| `registered_trade_name` | string | No | Max 200 characters |
| `email` | string | Yes | Email address |
| `phone_number` | object | Yes | Phone number object |
| `address` | string | Yes | Max 500 characters |
| `locale` | string | No | BCP-47 code: `de-DE`, `en-IE`, `es-ES`, `fr-FR`, `it-IT` |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "manufacturer_id": "string"
  }
}
```

## 6. Error Codes
| Code | Message |
| :--- | :--- |
| 38023025 | Internal error |
| 38023032 | Number of manufacturers exceeds the limit |
| 38023033 | Invalid manufacturer's name |
| 38023034 | Invalid manufacturer's address |
| 38023037 | Invalid manufacturer's registered trade name |
| 38023041 | Invalid phone number length |
| 38023042 | Invalid email format |
| 38023043 | Invalid address length |
| 38023044 | Invalid name length |
| 38023045 | Invalid registered trade name length |
| 38023046 | Invalid phone country code format |
| 38023050 | Operation is not supported for g... |

## 7. Pitfalls & Best Practices
* **Length Limits:** Validate string lengths before send. Name max 255, trade name max 200, address max 500.
* **Phone Format:** Ensure phone object contains valid country code.
* **Locale:** Use only supported BCP-47 codes.
* **Limit:** Monitor total manufacturer count. API returns error `38023032` if limit exceeded.

## 8. Code Example

```bash
curl -X POST "https://api.tiktokshop.com/product/202409/compliance/manufacturers?app_key=123456&sign=abcde12345&timestamp=1711111111" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: tts_token_val" \
  -d '{
    "name": "Example Manufacturer",
    "registered_trade_name": "Example Trade Name",
    "email": "contact@example.com",
    "phone_number": {
      "country_code": "49",
      "number": "1701234567"
    },
    "address": "123 Main St, Berlin, Germany",
    "locale": "de-DE"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202409/compliance/manufacturers`*
