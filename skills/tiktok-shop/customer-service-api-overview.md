# TikTok Shop API: Customer Service API overview

# Customer Service API Implementation Guide

## 1. Overview
API manage customer service chat. Use for:
* Sync chat messages.
* Send replies to buyers.
* Manage agent settings.
* Automate chat bots.

## 2. Endpoint & HTTP Method
* **Method:** `UNKNOWN` (Refer to specific operation docs)
* **Path:** `/`

## 3. Access & Authentication
Strict access rules apply.

### Requirements
* Partner must have >= 1000 authorized sellers.
* API calls count toward 1,000,000 per day threshold.

### Exception
* Seller with 'TikTok Shop Seller' APP category (self-owned dev team) gets special approval.

### Auth
Use standard TikTok Shop API authorization headers.

## 4. Key Identifiers
| Identifier | Type | Description |
| :--- | :--- | :--- |
| `im_user_id` | String | Internal Customer Service participant ID. **Cannot** query orders. |
| `buyer_user_id` | String | Buyer user ID. Same as Order API. **Use** to query orders. |

## 5. Participant & Sender Roles
Understand roles to route messages correctly.

### Participant Roles
* `BUYER`: Customer using TikTok messaging app.
* `SHOP`: Seller business owner main account.
* `CUSTOMER_SERVICE`: Assigned support agent.

### Sender Roles
* `BUYER`: Message from buyer.
* `CUSTOMER_SERVICE`: Message from agent.
* `SHOP`: Auto-Reply / FAQ.
* `SYSTEM`: System message sent via SHOP.
* `ROBOT`: Chat Bot auto-reply from smart tools.

## 6. Business Rules & Pitfalls
Follow rules to avoid API errors.

* **Auto-Close:** Chat close automatically after 6 hours if no buyer reply.
* **Response Window:** Seller must respond within 7 days.
* **Initiate Chat:** Can only start new chat if:
  * Prior chat exist within last 30 days.
  * OR Buyer bought order within past 60 days.
  * OR Buyer has return/refund history.
* **ID Confusion:** Do not use `im_user_id` for Order API. Use `buyer_user_id`.

## 7. Operations & Webhooks
Implement these interfaces.

### Operations
* `Get Conversation Messages`
* `Get Conversations`
* `Send Message`
* `Get Agent Settings`
* `Update Agent Settings`
* `Upload Buyer Messages Image`
* `Read Message`
* `Create Conversation`

### Webhooks
Subscribe to events:
* `New Conversation`
* `New Message`

## 8. Code Example

Send message payload template:

```bash
curl -X POST "https://api.tiktokshop.com/api/v1/kem/message/send" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "conversation_id": "123456",
    "sender_role": "CUSTOMER_SERVICE",
    "message_type": "TEXT",
    "content": {
      "text": "Hello, how can I help you today?"
    }
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
