# TikTok Shop API: Create Conversation

# Create Conversation API Guide

## 1. Function & Usage
API creates or reopens conversation with buyer. 
* **No prior chat**: Creates new conversation.
* **Prior chat exists**: Reopens old conversation. Returns same `conversation_id`.
* **Use case**: Initiate chat with buyer regarding order.

## 2. Endpoint
* **HTTP Method**: `POST`
* **Base URL**: `https://open-api.tiktokglobalshop.com`
* **Path**: `/customer_service/202309/conversations`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (`user_type = 0`).

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp (UTC). |
| `shop_cipher` | string | Yes | Shop identifier. Get via Get Authorization Shop API. |

### Body Parameters (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `buyer_user_id` | string | Yes | Buyer ID. Match `data.orders.user_id` from Get Order Detail API. |

## 5. Response Structure
```json
{
  "code": 0,
  "message": "Success",
  "request_id": "202203070749000101890810281E8C70B7",
  "data": {
    "conversation_id": "7106888323922608389"
  }
}
```

## 6. Error Handling
| Code | Description | Action |
| :--- | :--- | :--- |
| `45101001` | Internal error. | Retry request later. |
| `36009003` | Internal error. | Retry request. Contact support if fails. |
| `45109003` | Criteria not met. | Check Customer Service API overview rules. |

## 7. Pitfalls & Best Practices
* **Idempotency**: Reopening active/closed chat returns same `conversation_id`. Do not expect new ID.
* **Cross-border shops**: Must pass correct `shop_cipher`. Wrong cipher causes failure.
* **Buyer ID**: Must fetch `buyer_user_id` from order details first.

## 8. Code Examples

### cURL
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/customer_service/202309/conversations?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{"buyer_user_id": "7494560109732338459"}'
```

### Pseudocode
```python
# Setup request
url = "https://open-api.tiktokglobalshop.com/customer_service/202309/conversations"
query_params = {
    "app_key": APP_KEY,
    "timestamp": get_utc_timestamp(),
    "shop_cipher": SHOP_CIPHER,
    "sign": generate_signature()
}
headers = {
    "content-type": "application/json",
    "x-tts-access-token": ACCESS_TOKEN
}
body = {
    "buyer_user_id": "7494560109732338459"
}

# Execute
response = http.post(url, params=query_params, headers=headers, json=body)
if response.code == 0:
    conversation_id = response.data.conversation_id
else:
    handle_error(response.code, response.message)
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /customer_service/202309/conversations`*
