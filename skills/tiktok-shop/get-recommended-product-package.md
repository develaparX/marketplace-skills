# TikTok Shop API: Get Recommended Product Package

# API Implementation Guide: Get Recommended Product Package

## 1. Overview
Retrieve recommended product packages. Use only for Brazil (BR) and Mexico (MX) markets. Do not use for other regions.

## 2. Endpoint
*   **Method**: `POST`
*   **Path**: `/product/202602/packages/recommend`

## 3. Headers & Authentication
Pass authentication in headers:
*   `Content-Type`: `application/json`
*   `x-tts-access-token`: Seller access token.

## 4. Parameters

### Query Parameters
Common API protocol parameters:
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Request signature from generator algorithm.
*   `timestamp` (number, required): Unix timestamp in seconds (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier.

### Request Body (JSON)
*   `page_size` (number, required): Results per page. Range: `[1-100]`.
*   `page_token` (string, optional): Token for next page.
*   `product_ids` (array of strings, optional): Target product IDs for recommendations.

## 5. Response Structure
Returns JSON object:
*   `code` (number): Status code. `0` indicates success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier for debugging.
*   `data` (object): Package recommendation details.

```json
{
  "code": 0,
  "message": "success",
  "request_id": "202602251200000102030405",
  "data": {}
}
```

## 6. Error Handling
*   Check `code` in response body. Non-zero means failure.
*   Log `request_id` for API support troubleshooting.
*   Retry request on network timeout. Do not retry on client errors (4xx).

## 7. Pitfalls & Best Practices
*   **Region Lock**: API fails if shop is outside BR or MX. Check shop region before call.
*   **Pagination**: Use `page_token` from previous response to fetch next page. Do not hardcode page limits.
*   **Timestamp**: Sync server clock. Expired timestamp causes signature failure.

## 8. Code Example (cURL)

```bash
curl -X POST "https://api-gateway.domain/product/202602/packages/recommend?app_key=mock_key&sign=mock_sign&timestamp=1700000000&shop_cipher=mock_cipher" \
  -H "Content-Type: application/json" \
  -H "x-tts-access-token: mock_token" \
  -d '{
    "page_size": 20,
    "product_ids": ["prod_123", "prod_456"]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202602/packages/recommend`*
