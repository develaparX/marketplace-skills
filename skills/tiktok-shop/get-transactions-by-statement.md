# TikTok Shop API: Get Transactions by Statement

# Get Transactions by Statement API Implementation Guide

Get statement details, transactions. Use for finance reconciliation.

## Endpoint

*   **Method**: `GET`
*   **Path**: `/finance/202501/statements/{statement_id}/statement_transactions`

## Headers

*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token.

## Parameters

### Path Parameters
*   `statement_id` (string, required): Statement ID.

### Query Parameters
*   `app_key` (string, required): App key.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix UTC timestamp.
*   `shop_cipher` (string, required): Shop cipher.
*   `sort_field` (string, required): Sort field. Only `order_create_time` supported.
*   `sort_order` (string, optional): `ASC` or `DESC`. Default `ASC`.
*   `page_size` (number, optional): 1 to 100. Default 20.
*   `page_token` (string, optional): Token for next page.

## Response Structure

*   `code` (number): Status code. `0` is success.
*   `message` (string): Error details.
*   `request_id` (string): Log ID.
*   `data` (object): Statement payload.
    *   `next_page_token` (string): Token for next page.
    *   `id` (string): Statement ID.
    *   `create_time` (number): Creation timestamp.
    *   `status` (string): Settlement status.
    *   `currency` (string): Currency code.
    *   `payable_amount` (string): Payable amount.
    *   `total_reserve_amount` (string): Reserve amount.
    *   `total_settlement_amount` (string): Settlement amount.
    *   `total_settlement_breakdown` (object): Breakdown of revenue, shipping, tax, adjustments.
    *   `total_count` (number): Total transaction count.
    *   `transactions` (array): List of transaction objects.

## Pagination Flow

To retrieve all transactions, follow these steps:

1. Send the initial request without the `page_token` parameter.
2. Extract the `next_page_token` from the response `data` object.
3. If `next_page_token` is present and not empty, send a new request with the `page_token` query parameter set to this value.
4. Repeat steps 2 and 3 until `next_page_token` is no longer returned.

## Error Handling

*   `36009003`: Internal error. Retry request. Contact support if error persists.

## Pitfalls & Best Practices

*   **Wrong Cipher**: Incorrect `shop_cipher` returns bad data for cross-border shops. Verify cipher before call.
*   **Sort Restriction**: `sort_field` only supports `order_create_time`. Other values cause validation failure.
*   **Signature**: Generate signature using exact query parameters. Mismatched parameters cause auth failure.

## Example Request

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/finance/202501/statements/7238804564097517339/statement_transactions?timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&sort_field=order_create_time&page_size=20&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&page_token=6AsPQsUMvH3RkchNUPPh22NROHkE0D8pmq/N5M1kHYcZmtRyv9aVrNv65W7Q6tFA+7D1ud64MPNz5OaT&sort_order=DESC&app_key=38abcd' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /finance/202501/statements/{statement_id}/statement_transactions`*
