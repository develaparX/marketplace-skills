# TikTok Shop API: Get Payments

# Get Payments API Implementation Guide

## Purpose
API retrieves automated payment records. Use to sync financial data. Reconcile payouts.

## Endpoint
*   **Method**: `GET`
*   **Path**: `/finance/202605/payments`

## Headers
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token

## Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | App identifier |
| `sign` | string | Yes | Request signature |
| `timestamp` | number | Yes | Unix timestamp (UTC) |
| `shop_cipher` | string | Yes | Shop identifier |
| `sort_field` | string | Yes | Must be `create_time` |
| `create_time_ge` | number | No | Start time (Unix timestamp) |
| `create_time_lt` | number | No | End time (Unix timestamp) |
| `page_size` | number | No | Results per page (1-100, default 20) |
| `page_token` | string | No | Pagination token |
| `sort_order` | string | No | `ASC` or `DESC` |

## Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Log ID.
*   `data` (object):
    *   `next_page_token` (string): Token for next page. Empty if last page.
    *   `payments` (array): Payment records.
        *   `id` (string): Payment ID.
        *   `status` (string): Payment status.
        *   `create_time` (number): Payment creation time (Unix timestamp).
        *   `amount` (object): Value and currency.
        *   `settlement_amount` (object): Value and currency.
        *   `payment_amount_before_exchange` (object): Value and currency.
        *   `exchange_rate` (string): Exchange rate.

## Error Handling
*   Error `36009003` occurs. Retry request.

## Pitfalls & Best Practices
*   Sort field restricted. Use `create_time`. Other values fail.
*   Pagination required. Pass `next_page_token` to `page_token`. Fetch next page.
*   Time filters required. Use Unix timestamps. Ensure UTC timezone.

## Example Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/finance/202605/payments?create_time_lt=1687266376&page_size=20&create_time_ge=1687266376&timestamp=162381

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /finance/202605/payments`*
