# TikTok Shop API: Product Auditing Research

# Product Auditing Research API Implementation Guide

## 1. Purpose & Use Case
Compliant vendor rescan product info. Issue compliance testing report. Use when vendor need fresh product data for audit.

## 2. Endpoint & Method
*   **Method:** `POST`
*   **Path:** `/product/202601/compliance/auditing/research`

## 3. Headers & Auth
*   **Scope:** `seller.product.basic`

| Header | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `content-type` | string | Yes | Must be `application/json` |
| `x-tts-access-token` | string | Yes | Access token for authentication |

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Signature from gen algorithm |
| `timestamp` | integer | Yes | Unix timestamp GMT (UTC+00:00) |
| `page_size` | integer | Yes | Results per page. Range: `[1-50]` |
| `shop_cipher` | string | No | Shop cipher info |
| `category_asset_cipher` | string | No | Category asset cipher info |
| `page_token` | string | No | Token from previous page. First page empty |

### Request Body (JSON)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `product_title` | string | No | Product title |
| `product_ids` | array of strings | No | TikTok Shop product IDs. Max 20 |
| `seller_id` | string | No | Shop identity ID |
| `category_ids` | array of strings | No | Category IDs of source product in bundle |
| `brand_ids` | array of strings | No | Brand IDs |
| `seller_name` | string | No | Shop name |

## 5. Response Structure
| Field | Type | Description |
| :--- | :--- | :--- |
| `code` | integer | Status code. `0` means success |
| `message` | string | Status message |
| `request_id` | string | Request log ID |
| `data` | object | Return payload |

## 6. Error Handling
*   Check `code` field.
*   If `code` not `0`, request failed.
*   Log `request_id` for support.

## 7. Pitfalls & Best Practices
*   **Limit product IDs:** `product_ids` array max size 20. Larger array cause error.
*   **Page size limit:** Keep `page_size` between 1 and 50.
*   **Pagination:** Use `page_token` from response for next page request.
*   **Signature:** Generate `sign` using correct algorithm before request.

## 8. Code Example

```bash
curl -X POST "https://api.tiktokshop.com/product/202601/compliance/auditing/research?app_key=test_app&sign=test_sign&timestamp=1700000000&page_size=20" \
  -H "content-type: application/json" \
  -H "x-tts-access-token: test_token" \
  -d '{
    "product_ids": ["123456789", "987654321"],
    "seller_id": "seller_123"
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202601/compliance/auditing/research`*
