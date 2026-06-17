# TikTok Shop API: Get Conversation List

# API Implementation: Get Conversation List

### 1. Purpose
Fetch user chat list. Use to populate main chat screen.

### 2. Endpoint
*   **Method:** `GET`
*   **Path:** `/`

### 3. Headers & Auth
Need token.
*   `Authorization: Bearer <token>`
*   `Accept: application/json`

### 4. Parameters
None required. Recommended query params for scale:
*   `limit` (integer): Max items return. Default 20.
*   `cursor` (string): Pagination pointer.

### 5. Response Structure
Returns JSON array of conversations.

**Success (200 OK):**
```json
[
  {
    "conversation_id": "conv_123",
    "participants": ["usr_99", "usr_100"],
    "last_message": {
      "text": "Hello",
      "sent_at": "2023-10-27T10:00:00Z"
    },
    "unread_count": 2
  }
]
```

### 6. Error Handling
*   `401 Unauthorized`: Token missing or expired.
*   `500 Internal Error`: Database fail.

### 7. Pitfalls & Best Practices
*   **N+1 Query Trap:** Do not query database for each conversation participant separately. Use SQL join.
*   **No Pagination:** Large lists crash client. Use cursor pagination.

### 8. Code Example
```bash
curl -X GET "https://api.example.com/" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /`*
