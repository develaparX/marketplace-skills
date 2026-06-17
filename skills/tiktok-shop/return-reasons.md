# TikTok Shop API: Return reasons

# Return Reasons API Implementation Guide

## 1. Purpose and Usage
API fetches valid return and refund reasons. Use when:
* Buyer requests return or refund.
* Seller rejects return request.
* Seller initiates return.

Filters reasons by market, order status, and user role.

## 2. Endpoint and Method
* **Method:** `GET`
* **Path:** `/api/v1/returns/reasons`

## 3. Headers and Authentication
* `Authorization: Bearer <token>` (Required. JWT token for user session)
* `Accept: application/json` (Required)

## 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `market` | String | No | Filter by market. Values: `us_market`, `uk_market`, `id_market`. |
| `role` | String | No | Filter by actor. Values: `buyer`, `seller`. |
| `status` | String | No | Filter by order status. Values: `AWAITING_COLLECTION`, `IN_TRANSIT`, `DELIVERED`. |

## 5. Response Structure
Returns JSON object containing market configurations.

```json
{
  "us_market": {
    "buyer_initiates": [
      {
        "order_statuses": ["AWAITING_COLLECTION", "IN_TRANSIT"],
        "reason_text": "No longer needed",
        "reason_name": "ecom_order_delivered_refund_and_return_reason_no_need"
      }
    ],
    "seller_reject": {
      "1st_review": [
        {
          "reason_text": "Product delivery is on schedule",
          "reason_name": "reverse_reject_request_reason_4"
        }
      ],
      "2nd_review": []
    },
    "seller_initiates": []
  }
}
```

## 6. Error Handling
* `400 Bad Request`: Invalid query parameter value.
* `401 Unauthorized`: Token missing or expired.
* `500 Internal Server Error`: Database or system failure.

Response format for errors:
```json
{
  "error_code": "INVALID_PARAMETER",
  "message": "Market parameter value not supported"
}
```

## 7. Pitfalls and Best Practices
* **Do not hardcode text:** UI must display `reason_text` from API. Text differs by market.
* **Use keys for logic:** Use `reason_name` for backend processing. Do not use `reason_text`.
* **Handle null values:** UK market contains `null` for `reason_name` in reject reasons. Code must handle nulls safely.
* **Cache responses:** Data changes rarely. Cache response for 24 hours to reduce load.
* **Market structure variation:** US uses `1st_review`/`2nd_review`. UK uses `reject_request`/`reject_receive_package`. ID has no seller reject reasons. Parse dynamically.

## 8. Code Example

### cURL Request
```bash
curl -X GET "https://api.example.com/api/v1/returns/reasons?market=us_market" \
  -H "Authorization: Bearer mock_token_123" \
  -H "Accept: application/json"
```

### Pseudocode Implementation
```python
function getReturnReasons(market, status, role):
    headers = {
        "Authorization": "Bearer " + getAuthToken(),
        "Accept": "application/json"
    }
    params = {
        "market": market,
        "status": status,
        "role": role
    }
    
    response = httpClient.get("/api/v1/returns/reasons", headers, params)
    
    if response.statusCode == 200:
        return parseJson(response.body)
    else if response.statusCode == 401:
        triggerLoginFlow()
    else:
        showErrorMessage("Failed to load return reasons")
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
