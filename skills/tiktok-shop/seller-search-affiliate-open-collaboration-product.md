# TikTok Shop API: Seller Search Affiliate Open Collaboration Product

# Seller Search Affiliate Open Collaboration Product

## 1. Overview
Search open collaboration products. Use to find affiliate items by category, commission, keyword.

## 2. Endpoint
* **Method:** `POST`
* **Path:** `/affiliate_seller/202405/open_collaborations/products/search`

## 3. Headers & Auth
* `Authorization`: `Bearer <ACCESS_TOKEN>`
* `Content-Type`: `application/json`
* **Required Scope:** `seller.affiliate_collaboration.read`

## 4. Parameters
Request body (JSON):

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `category_ids` | array[int] | No | Filter by category IDs |
| `min_commission_rate` | float | No | Minimum commission rate |
| `max_commission_rate` | float | No | Maximum commission rate |
| `keyword` | string | No | Search query for product name |
| `page_size` | int | No | Number of items per page |
| `page_token` | string | No | Token for next page |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "success",
  "request_id": "20240501120000888888",
  "data": {
    "products": []
  }
}
```

* `code` (int): Status code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Unique log ID for debugging.
* `data` (object): Search results payload.

## 6. Error Handling
Check `code` field in response. Non-zero means error.

* `400`: Invalid parameters. Check types.
* `401`: Token expired or missing. Refresh token.
* `403`: Missing scope `seller.affiliate_collaboration.read`.

## 7. Pitfalls & Best Practices
* **Rate Limits:** Cache search results. Do not spam API.
* **Pagination:** Use `page_token` from response data for next page. Do not hardcode page offsets.
* **Scope:** Verify token has correct scope before call.

## 8. Code Example (cURL)
```bash
curl -X POST "https://api.example.com/affiliate_seller/202405/open_collaborations/products/search" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "keyword": "shoes",
    "min_commission_rate": 0.10,
    "page_size": 20
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_seller/202405/open_collaborations/products/search`*
