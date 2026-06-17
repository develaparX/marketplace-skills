# TikTok Shop API: Cancel reasons

# Order Cancel Reasons API Specification

## 1. Purpose & Usage
API returns order cancel reasons. Use when buyer or seller cancels order, or seller rejects cancellation. Populate UI dropdowns with exact reasons.

## 2. Endpoint & Method
*   **Method:** `GET`
*   **Path:** `/api/v1/orders/cancel-reasons`

## 3. Headers & Auth
*   `Authorization`: `Bearer <token>` (Required. User session token)
*   `Content-Type`: `application/json`

## 4. Parameters
Query parameters:

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `market` | String | No | Filter by market. Values: `us`, `uk`. If omitted, returns all markets. |

## 5. Response Structure
JSON object containing market keys. Each market contains actor arrays:

*   `buyer_initiates`: Reasons for buyer cancellation.
*   `seller_initiates`: Reasons for seller cancellation.
*   `seller_reject`: Reasons for seller rejecting buyer cancellation.
*   `system_cancel`: Reasons for system auto-cancellation.
*   `operator_cancel`: Reasons for admin/operator cancellation.

### Response Schema
```json
{
  "us_market": {
    "buyer_initiates": [
      {
        "order_status": "UNPAID",
        "reason": "Better price available",
        "reason_name": "ecom_order_unpaid_canceled_reason_better_price"
      }
    ],
    "seller_reject": [],
    "seller_initiates": [],
    "system_cancel": [],
    "operator_cancel": []
  },
  "uk_market": {
    "buyer_initiates": [],
    "seller_reject": [],
    "seller_initiates": []
  }
}
```

## 6. Error Handling
*   `400 Bad Request`: Invalid `market` parameter.
*   `401 Unauthorized`: Token missing or expired.
*   `500 Internal Server Error`: Database connection failed.

```json
{
  "error": "INVALID_MARKET",
  "message": "Market parameter must be 'us' or 'uk'"
}
```

## 7. Pitfalls & Best Practices
*   **Do not hardcode reasons:** Reason codes change. Fetch dynamically from API.
*   **Filter by status:** Match order state (`UNPAID`, `ON_HOLD`, `AWAITING_SHIPMENT`) to `order_status` in payload. Show only matching reasons.
*   **Cache data:** Cancel reasons change rarely. Cache response for 24 hours.
*   **Handle missing keys:** UK market lacks `system_cancel` and `operator_cancel` keys. Code must handle missing keys safely.

## 8. Code Example

### Curl
```bash
curl -X GET "https://api.example.com/api/v1/orders/cancel-reasons?market=us" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json"
```

### Pseudocode
```python
# Fetch and filter reasons
function getCancelReasons(market, current_status):
    response = http.get("/api/v1/orders/cancel-reasons?market=" + market)
    if response.status_code != 200:
        log_error("Failed to fetch reasons")
        return []
        
    market_data = response.json()[market + "_market"]
    buyer_reasons = market_data["buyer_initiates"]
    
    # Filter by current order status
    valid_reasons = []
    for item in buyer_reasons:
        if item["order_status"] == current_status:
            valid_reasons.append(item)
            
    return valid_reasons
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
