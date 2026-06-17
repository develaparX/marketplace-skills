# TikTok Shop API: Search Responsible Persons

# EU Responsible Persons Search API Guide

## 1. Purpose
Search EU compliance responsible persons. Use for EU local seller compliance checks.

## 2. Endpoint
* **Method**: `POST`
* **Path**: `/product/202501/compliance/responsible_persons/search`
* **Scope**: `seller.product.basic`
* **Target**: EU local sellers only.

## 3. Headers
* `content-type` (string, required): `application/json`
* `x-tts-access-token` (string, required): Seller access token.

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | int | Yes | Unix timestamp UTC. |
| `page_size` | int | Yes | Results per page. Range: `[1-100]`. |
| `page_token` | string | No | Token for next page. |

### Body Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `responsible_person_ids` | []string | No | Filter by IDs. Max count: `page_size` value. |
| `keyword` | string | No | Filter by name, local_number, email. Max 200 chars. |
| `locales` | []string | No | BCP-47 codes: `de-DE`, `en-IE`, `es-ES`, `fr-FR`, `it-IT`. |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "string",
  "request_id": "string",
  "data": {
    "responsible_persons": [
      {
        "id": "string",
        "regional_profiles": [
          {
            "locale": "string",
            "name": "string",
            "email": "string",
            "phone_number": {
              "country_code": "string",
              "local_number": "string"
            },
            "address": {
              "street_address_line1": "string",
              "street_address_line2": "string",
              "district": "string",
              "city": "string",
              "postal_code": "string",
              "province": "string"
            }
          }
        ]
      }
    ]
  }
}
```

## 6. Error Codes
* `38023025`: Internal error.
* `38023047`: Invalid page size.
* `38023048`: Invalid page token.
* `38023049`: ID count larger than page size.
* `38023050`: Operation not supported for global seller.

## 7. Pitfalls & Best Practices
* **Global Seller Block**: Global seller call fail. API block global account. Use local EU account.
* **ID Limit**: ID list exceed `page_size` fail. Keep `responsible_person_ids` length less than or equal to `page_size`.
* **Locale Filter**: Locale list use invalid BCP-47 code fail. Use only `de-DE`, `en-IE`, `es-ES`, `fr-FR`, `it-IT`.

## 8. Code Example

```bash
curl -X POST "https://api.example.com/product/202501/compliance/responsible_persons/search?app_key=12345&sign=abcdef&timestamp=1700000000&page_size=10" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: token_value" \
  -d '{
    "responsible_person_ids": ["rp_9876"],
    "keyword": "John Doe",
    "locales": ["de-DE"]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
