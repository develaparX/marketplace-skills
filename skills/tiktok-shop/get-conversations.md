# TikTok Shop API: Get Conversations

# Get Conversations API Implementation Guide

## 1. Purpose
API get shop-buyer chat. Use for chat sync, custom helpdesk, check unread message.

## 2. Endpoint
*   **Method**: `GET`
*   **URL**: `https://open-api.tiktokglobalshop.com/customer_service/202309/conversations`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (user_type = 0).

## 4. Query Parameters

| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app identifier. |
| `sign` | string | Yes | Request signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp UTC. |
| `shop_cipher` | string | Yes | Shop identifier. |
| `page_size` | number | Yes | Conversations per page. Max 20. |
| `page_token` | string | No | Cursor for next page. |
| `locale` | string | No | System message language. |
| `need_session_id` | boolean | No | True if need session ID. |
| `need_session_info` | boolean | No | True if need session info. |

## 5. Response Structure

```json
{
  "code": 0,
  "message": "success",
  "request_id": "202309...",
  "data": {
    "next_page_token": "1612353423",
    "conversations": [
      {
        "id": "7494560109732334261",
        "participant_count": 3,
        "can_send_message": true,
        "unread_count": 0,
        "create_time": 1691411573,
        "participants": [
          {
            "im_user_id": "7494560109732334261",
            "avatar": "https://...",
            "user_id": "7494560109732334262",
            "role": "BUYER",
            "nickname": "Albert",
            "buyer_platform": "TIKTOK_SHOP"
          }
        ],
        "latest_message": {}
      }
    ]
  }
}
```

## 6. Error Codes

| Code | Description | Action |
| :--- | :--- | :--- |
| `45101001` | Internal error. | Retry later. |
| `45101003` | Record not found. | Check parameters. |
| `45101004` | Quota reached (10000/day). | Stop requests. Wait for reset. |
| `36009003` | Internal error. | Retry. Contact support if fail. |

## 7. Pitfalls & Best Practices
*   **Rate Limit**: Max 10,000 requests per day. Cache data. Do not poll constantly.
*   **Time Sync**: Server clock must sync with UTC. Request fail if `timestamp` drift big.
*   **Pagination**: Use `next_page_token` from response. Pass into `page_token` for next page. Stop when `next_page_token` empty.

## 8. Code Example

### cURL
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/customer_service/202309/conversations?page_size=10&app_key=YOUR_APP_KEY&sign=YOUR_SIGNATURE&timestamp=1623812664&shop_cipher=YOUR_SHOP_CIPHER' \
  -H 'x-tts-access-token: YOUR_ACCESS_TOKEN' \
  -H 'content-type: application/json'
```

### Pseudocode
```python
function get_conversations(page_token = null):
    url = "https://open-api.tiktokglobalshop.com/customer_service/202309/conversations"
    
    params = {
        "app_key": APP_KEY,
        "timestamp": get_utc_timestamp(),
        "shop_cipher": SHOP_CIPHER,
        "page_size": 20
    }
    if page_token:
        params["page_token"] = page_token
        
    params["sign"] = generate_signature(params, APP_SECRET)
    
    headers = {
        "x-tts-access-token": ACCESS_TOKEN,
        "content-type": "application/json"
    }
    
    response = http.get(url, params=params, headers=headers)
    return response.json()
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /customer_service/202309/conversations`*
