# TikTok Shop API: Get Shop LIVE Performance List

# Shop LIVE Performance API Guide

## 1. Overview
API fetch LIVE stream session metrics. Use to track sales performance for official creator accounts.

## 2. Endpoint
*   **Method**: `GET`
*   **Path**: `https://open-api.tiktokglobalshop.com/analytics/202509/shop_lives/performance`

## 3. Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (user_type = 0).

## 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. |
| `start_date_ge` | string | Yes | Start date (YYYY-MM-DD) in shop timezone. Inclusive. |
| `end_date_lt` | string | Yes | End date (YYYY-MM-DD) in shop timezone. Exclusive. |
| `page_size` | number | No | Max 100. Default 10. |
| `sort_field` | string | No | Sort key. Values: `gmv`, `products_added`, `different_products_sold`, `sku_orders`, `items_sold`, `customers`, `24h_live_gmv`. Default: `gmv`. |
| `sort_order` | string | No | `ASC` or `DESC`. Default: `DESC`. |
| `currency` | string | No | `USD` or `LOCAL`. Default: `LOCAL`. |
| `page_token` | string | No | Token for next page. |
| `account_type` | string | No | Creator account type. Values: `ALL`, `OFFICIAL_ACCOUNTS`, `MARKETING_ACCOUNTS`, `AFFILIATE_ACCOUNTS`. Default: `ALL`. |

## 5. Response Structure
Success response returns code `0`.

```json
{
  "code": 0,
  "message": "success",
  "request_id": "string",
  "data": {
    "live_stream_sessions": [
      {
        "id": "string",
        "title": "string",
        "username": "string",
        "start_time": "string",
        "end_time": "string",
        "sales_performance": {
          "gmv": {
            "amount": "string",
            "currency": "string"
          },
          "products_added": 0,
          "different_products_sold": 0,


---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202509/shop_lives/performance`*
