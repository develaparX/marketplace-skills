# TikTok Shop API: Search CAP Affiliate Orders

# CAP Affiliate Orders Search Implementation

API search affiliate orders. Use for MCN/CAP tracking.

## Endpoint

*   **Method**: `POST`
*   **URL**: `https://open-api.tiktokglobalshop.com/affiliate_partner/202603/cap_order/search`

## Headers & Auth

*   `content-type`: `application/json`
*   `x-tts-access-token`: Partner access token (user_type = 3).
*   `app_key`: Query param. App identifier.
*   `sign`: Query param. Request signature.
*   `timestamp`: Query param. Unix epoch seconds (UTC).

## Parameters

### Query Parameters

| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | App key. |
| `sign` | string | Yes | Signature. |
| `timestamp` | number | Yes | Unix timestamp. |
| `category_asset_cipher` | string | Yes | Partner ID from Get Authorized Category Assets API. |
| `page_token` | string | No | Next page token. |
| `page_size` | number | Yes | Size 1-100. Default 20. |

### Body Parameters (JSON)

| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `order_id` | string | No | Main order ID. |
| `product_id` | string | No | Product ID. |
| `settle_status` | number | No | Status code. 1=CUSTOMER UNPAID, 2=PENDING, 3=SETTLED, 4=INELIGIBLE, 5=FROZEN. |
| `create_time_ge` | number | No | Start Unix timestamp. Max 3 months range. Use with `create_time_lt`. |
| `create_time_lt` | number | No | End Unix timestamp. Use with `create_time_ge`. |

## Response Structure

*   `code` (number): Status code. 0 is success.
*   `message` (string): Error details.
*   `request_id` (string): Debug log ID.
*   `data` (object): Payload.
    *   `sku_orders` (array): List of orders.
        *   `id` (string): Order ID.
        *   `tags` (string): Order tag.
        *   `create_time` (number): Creation Unix timestamp.
        *   `delivery_time` (number): Delivery Unix timestamp.
        *   `settle_status` (string): Settlement status string (e.g., "SETTLED").
        *   `sku_id` (string): SKU ID.
        *   `open_collaboration_id` (string): Open collab ID.
        *   `target_collaboration_id` (string): Target collab ID.
        *   `creator_username` (

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_partner/202603/cap_order/search`*
