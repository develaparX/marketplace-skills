# TikTok Shop API: Refund reasons

# Refund Reasons API Implementation Guide

## 1. Purpose
API fetches valid refund and rejection reasons. Use to populate dropdowns in UI when buyer or seller initiates refund or rejects request. Prevents invalid reason codes during submission.

## 2. Endpoint
*   **Method**: `GET`
*   **Path**: `/api/v1/refund-reasons`

## 3. Headers & Auth
```http
Authorization: Bearer <token>
Accept: application/json
```

## 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `market` | String | No | Filter by market. Values: `us`, `uk`, `id`. |

## 5. Response Structure
JSON payload maps reasons by market and actor.

```json
{
  "us_market": {
    "buyer_initiates": [
      {
        "order_statuses": ["AWAITING_COLLECTION", "IN_TRANSIT"],
        "reason": "Product wouldn't arrive on time",
        "reason_code": "ecom_order_shipped_refund_reason_not_arrive_on_time"
      }
    ],
    "seller_reject": [
      {
        "reason": "Product delivery is on schedule",
        "reason_code": "reverse_reject_request_reason_4"
      }
    ],
    "seller_initiates": []
  }
}
```

### Field Definitions
*   `[market]_market`: Object containing actor categories.
*   `buyer_initiates` / `seller_initiates`: Actions to start refund.
*   `seller_reject`: Actions to deny refund.
*   `order_statuses`: Array of strings. Order state required to use reason. **Note**: Omitted in `seller_reject`.
*   `reason`: Display text for UI.
*   `reason_code`: Unique string key for submission API.

## 6. Error Codes
*   `400 Bad Request`: Invalid `market` parameter.
*   `401 Unauthorized`: Token missing or expired.
*   `500 Internal Error`: Server issue.

## 7. Pitfalls & Best Practices
*   **Missing Statuses**: `seller_reject` reasons lack `order_statuses`. Do not filter reject reasons by order status.
*   **Market Drift**: UK market has unique reasons (e.g., `buyer_refund_suspected_counterfeit`). Do not hardcode reason lists. Always fetch from API.
*   **Caching**: Data changes rarely. Cache response for 24 hours to reduce latency.

## 8. Code Example

### Fetch Reasons (cURL)
```bash
curl -X GET "https://api.example.com/api/v1/refund-reasons?market=us" \
  -H "Authorization: Bearer dGVzdF90b2tlbg==" \
  -H "Accept: application/json"
```

### Filter Logic (Pseudocode)
```python
# Get reasons for UI dropdown
function get_applicable_reasons(api_response, market, actor, current_order_status):
    market_data = api_response[market + "_market"]
    actor_reasons = market_data[actor]
    
    valid_reasons = []
    for item in actor_reasons:
        # Rejections do not check status
        if actor == "seller_reject":
            valid_reasons.append(item)
            continue
            
        # Initiations must match current order status
        if current_order_status in item["order_statuses"]:
            valid_reasons.append(item)
            
    return valid_reasons
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
