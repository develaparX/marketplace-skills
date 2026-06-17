# TikTok Shop API: Update The Blind Box Opening Results

# Blind Box Results Callback API Guide

## 1. Purpose
Send live room blind box results to platform. Call after merchant opens box. User views results in order details.

## 2. Endpoint
*   **Method**: `POST`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`
*   **Path**: `/order/202605/orders/blind_box_result/callback`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from Get Access Token, `user_type = 0`).

## 4. Parameters

### Query Parameters
*   `shop_cipher` (string, required): Shop identifier.
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from gen algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).

### Request Body (JSON)
*   `main_order_id` (string, optional): TikTok Shop order ID.
*   `blind_box_results` (array, optional): Unboxing results for line items.
    *   `order_line_id` (string): Line item ID.
    *   `blind_result_product_id` (string): Product ID.
    *   `blind_result_sku_id` (string): SKU ID.
    *   `blind_open_time` (number): Open timestamp.
*   `blind_batch_box_results` (array, optional): Batch unboxing results.
    *   `order_line_id` (string): Line item ID.
    *   `blind_box_order_line_list` (array): List of results.
        *   `blind_result_product_id` (string): Product ID.
        *   `blind_result_sku_id` (string): SKU ID.
        *   `blind_open_time` (number): Open timestamp.

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message. Failure reason here.
*   `request_id` (string): Log ID.
*   `data` (object): Return data.

## 6. Error Handling
Check `code` in response. Non-zero means error.

| Code | Description | Action |
| :--- | :--- | :--- |
| `10007002` | Current order is not a merchant blind box order. | Verify order type. |
| `10007006` | Invalid params. | Check required fields. |
| `10007008` | Order info not obtained. | Verify order ID. |
| `10007109` | Order update failed. | Contact platform. |
| `10007143` | Product info not obtained. | Sync product to TikTok Shop. |
| `10007999` | System Exception. | Contact platform. |

## 7. Pitfalls & Best Practices
*   **Sync products first**: Error `10007143` occurs if product not synced to TikTok Shop before callback.
*   **Verify order type**: Error `10007002` occurs if order is standard order, not blind box.
*   **Signature generation**: Include all query parameters in signature calculation.

## 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/order/202605/orders/blind_box_result/callback?shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "main_order_id": "576461413038785752",
  "blind_box_results": [
    {
      "order_line_id": "577086512123755123",
      "blind_result_product_id": "1732042550463074704",
      "blind_result_sku_id": "1732042694638604688",
      "blind_open_time": 1762782183118
    }
  ],
  "blind_batch_box_results": [
    {
      "order_line_id": "577086512123755123",
      "blind_box_order_line_list": [
        {
          "blind_result_product_id": "1732042550463074704",
          "blind_result_sku_id": "17320426946

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /order/202605/orders/blind_box_result/callback`*
