# TikTok Shop API: Get Product SKPP Detail

# SKPP Product Diagnostic Integration Guide

## 1. Purpose
Get SKPP diagnostic data for single product. Use to check compliance status, listing violations, or restriction details on TikTok Shop.

## 2. Endpoint
*   **Method:** `GET`
*   **Path:** `/product/202606/skpps/{product_id}`

## 3. Headers & Authentication
*   `Content-Type`: `application/json`
*   `x-tts-access-token`: Seller access token. Required. Obtain from token exchange where `user_type = 0`.

## 4. Parameters

### Path Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `product_id` | string | Yes | TikTok Shop product identifier. |

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique developer application key. |
| `sign` | string | Yes | Request signature. Generate via signature algorithm. |
| `timestamp` | number | Yes | Unix timestamp in seconds (UTC/GMT). |
| `shop_cipher` | string | Yes | Shop cipher for target seller shop. |
| `locale` | string | No | BCP-47 locale code for category translation. |

## 5. Response Structure
Returns JSON object:

```json
{
  "code": 0,
  "message": "Success",
  "request_id": "20230915120000xxxxxxxxxxxx",
  "data": {}
}
```

*   `code` (number): Status code. `0` means success.
*   `message` (string): Status description.
*   `request_id` (string): Log identifier for debugging.
*   `data` (object): SKPP diagnostic payload.

## 6. Error Handling
Handle specific API error codes:

| Code | Description | Action |
| :--- | :--- | :--- |
| `12081001` | Invalid request parameters. | Check path, query keys, and types. |
| `12081003` | Internal server error. | Retry request with exponential backoff. |
| `12081006` | Unauthorized for SKPP. | Verify token permissions and shop cipher mapping. |

## 7. Pitfalls & Best Practices
*   **Clock Drift:** Sync server clock. Timestamp mismatch causes signature failure.
*   **Signature Generation:** Sort all query parameters alphabetically before hashing. Include path parameter in signature base string if required by SDK.
*   **Token Scope:** Use seller token (`user_type = 0`). Partner tokens will fail.

## 8. Implementation Example

```bash
curl -X GET "https://api-sandbox.tiktok-shops.com/product/202606/skpps/1720839281092?app_key=test_app_key&sign=abc123signature&timestamp=1694779200&shop_cipher=ROW_abc123" \
  -H "Content-Type: application/json" \
  -H "x-tts-access-token: ROW_token_val"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202606/skpps/{product_id}`*
