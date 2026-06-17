# TikTok Shop API: Get Submission Records

# Get Submission Records API Implementation Guide

## 1. Overview
API fetches submission records. Use to track product submission status and performance.

## 2. Endpoint
*   **Method:** `GET`
*   **Path:** `/product/202604/opportunities/submissions`

## 3. Headers & Authentication
*   **Required Scope:** `seller.product.basic`

| Header | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `content-type` | string | Yes | Must be `application/json` |
| `x-tts-access-token` | string | Yes | Seller access token |

## 4. Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Request signature |
| `timestamp` | int | Yes | Unix timestamp (UTC seconds) |
| `shop_cipher` | string | Yes | Shop identifier |
| `page_size` | int | Yes | Results per page. Max: 100. Default: 20 |
| `status` | string | No | Filter: `PENDING_REVIEW`, `APPROVED`, `REJECTED` |
| `opportunity_id` | string | No | Filter by opportunity ID |
| `product_id` | string | No | Filter by product ID |
| `submit_time_ge` | int | No | Filter start time (Unix timestamp seconds) |
| `submit_time_lt` | int | No | Filter end time (Unix timestamp seconds) |
| `page_token` | string | No | Token for next page |

## 5. Response Structure

```json
{
  "code": 0,
  "message": "Success",
  "request_id": "20260401...",
  "data": {
    "data": {
      "submissions": [
        {
          "id": "sub_123",
          "opportunity_id": "opp_456",
          "opportunity_title": "Sample Opportunity",
          "status": "APPROVED",
          "product_id": "prod_789",
          "product_name": "Sample Product",
          "submit_time": 1711929600,
          "review_time": 1711933200,
          "rejection_reason": "",
          "product_orders": 10,
          "product_pv": 100
        }
      ],
      "next_page_token": "next_token_xyz",
      "total_count": 1
    }
  }
}
```

## 6. Error Handling
*   Check `code` field. Non-zero value indicates error.
*   Log `request_id` for troubleshooting.

## 7. Pitfalls & Best Practices
*   **Timestamp:** Use Unix epoch time in seconds. Milliseconds cause signature failure.
*   **Pagination:** Use `next_page_token` from response. Pass into `page_token` for next page. Do not hardcode offsets.
*   **Signature:** Generate `sign` parameter last. Include all query parameters in signature calculation.

## 8. Code Example

```bash
curl -X GET "https://api.example.com/product/202604/opportunities/submissions?\
app_key=your_app_key\
&sign=generated_signature\
&timestamp=1711929600\
&shop_cipher=shop_123\
&page_size=20\
&status=APPROVED" \
-H "content-type: application/json" \
-H "x-tts-access-token: your_access_token"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202604/opportunities/submissions`*
