# TikTok Shop API: Search Products

# Search Products API Guide

## 1. Overview
API searches products. Returns key properties. Use to sync inventory, filter status, find SKUs.

## 2. Endpoint
* **Method**: `POST`
* **Path**: `/product/202502/products/search`

## 3. Headers & Auth
* **Scope**: `seller.product.basic`

| Header | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `content-type` | string | Yes | Must be `application/json` |
| `x-tts-access-token` | string | Yes | Seller access token |

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Signature from gen algorithm |
| `timestamp` | int | Yes | Unix timestamp GMT (UTC+00:00) |
| `page_size` | int | Yes | Results per page. Range: [1-100] |
| `page_token` | string | No | Token for next page |
| `shop_cipher` | string | Yes | Shop info cipher |

### Body Parameters (JSON)
| Parameter | Type | Required | Default | Allowed Values / Description |
| :--- | :--- | :--- | :--- | :--- |
| `status` | string | No | `ALL` | `ALL`, `DRAFT`, `PENDING`, `FAILED`, `ACTIVATE`, `SELLER_DEACTIVATED`, `PLATFORM_DEACTIVATED`, `FREEZE`, `DELETED` |
| `seller_skus` | array[string] | No | - | Filter by SKU codes |
| `create_time_ge` | int | No | - | Created on/after timestamp |
| `create_time_le` | int | No | - | Created on/before timestamp |
| `update_time_ge` | int | No | - | Updated on/after timestamp |
| `update_time_le` | int | No | - | Updated on/before timestamp |
| `category_version` | string | No | `Return all` | `v1` (Other), `v2` (US) |
| `listing_quality_tiers` | array[string] | No | `Returns all` | `POOR`, `FAIR`, `GOOD` (US only) |
| `listing_platforms` | array[string] | No | `Return all` | `TOKOPEDIA`, `TIKTOK_SHOP` (Tokopedia migrated only) |

## 5. Response Structure
Returns paginated product list.

```json
{
  "code": 0,
  "message": "success",
  "data": {
    "products": [
      {
        "id": "123456",
        "status": "ACTIVATE",
        "seller_skus": ["SKU-001"]
      }
    ],
    "next_page_token": "token_string",
    "total_count": 1
  }
}
```

## 6. Error Handling
* `400 Bad Request`: Invalid parameters (e.g., `page_size` > 100).
* `401 Unauthorized`: Bad token or signature.
* `403 Forbidden`: Missing scope `seller.product.basic`.

## 7. Pitfalls & Best Practices
* **US Market**: Set `category_version` to `v2`. Use `listing_quality_tiers`.
* **Tokopedia Sellers**: Use `listing_platforms` to split Tokopedia and TikTok Shop.
* **Pagination**: Use `next_page_token` from response in next request `page_token` query param. Do not hardcode page limits.
* **Time Filters**: Use Unix timestamps. Ensure correct range (`_ge` <= `_le`).

## 8. Code Example (cURL)

```bash
curl -X POST "https://api.example.com/product/202502/products/search?

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
