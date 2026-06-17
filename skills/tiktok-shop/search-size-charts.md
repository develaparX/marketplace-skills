# TikTok Shop API: Search Size Charts

# Search Size Charts API

## 1. Purpose
Retrieve seller size charts. Use to list, filter, or find specific size chart templates.

## 2. Endpoint
*   **Method:** `POST`
*   **Path:** `/product/202407/sizecharts/search`

## 3. Headers & Auth
*   `content-type`: `application/json` (Required)
*   `x-tts-access-token`: Seller access token (Required)

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Signature from gen algorithm |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00) |
| `page_size` | number | Yes | Results per page. Range: `[1-100]` |
| `page_token` | string | No | Token for next page |
| `locales` | array | No | BCP-47 locale codes |

### Body Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `ids` | array | No | Filter by template IDs. Max 50 |
| `keyword` | string | No | Filter by template name |

## 5. Response Structure
API data lacks response fields. Standard paginated list structure:

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "size_charts": [
      {
        "id": "string",
        "name": "string",
        "locale": "string"
      }
    ],
    "next_page_token": "string"
  }
}
```

## 6. Error Handling
*   Check signature failure: Regenerate `sign` query param.
*   Token expired: Refresh `x-tts-access-token`.
*   Rate limit: Implement backoff.

## 7. Pitfalls & Best Practices
*   **Mixed Params:** Send query params in URL, body params in JSON body. Do not mix.
*   **ID Limit:** Keep `ids` array under 50 items. Request fails if exceeded.
*   **Page Size:** Keep `page_size` between 1 and 100.

## 8. Code Example (cURL)

```bash
curl -X POST "https://api-gateway.domain/product/202407/sizecharts/search?app_key=test_app&sign=test_sign&timestamp=1719830400&page_size=10" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: test_token" \
  -d '{
    "ids": ["12345"],
    "keyword": "T-Shirt"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202407/sizecharts/search`*
