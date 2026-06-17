# TikTok Shop API: Post-sales Solutions for Customer Services

# Post-Sales Solutions API Implementation Guide

## 1. Overview
API manages post-sales lifecycle. Use to handle customer returns, refunds, cancellations, and chat message cards.

### Scenarios
* Refund-only request (no return)
* Return & refund request
* Order cancellation before shipment
* Partial or returnless refund

---

## 2. Endpoints

| Method | Path | Description |
| :--- | :--- | :--- |
| `POST` | `/customer_service/202309/conversations/{conversation_id}/messages` | Send message card to conversation |
| `GET` | `/return_refund/.../aftersale_eligibility` | Check eligibility for return/refund |
| `POST` | `/return_refund/202309/returns` | Create return request |
| `POST` | `/return_refund/202309/cancellations` | Create cancellation request |

---

## 3. Headers and Authentication

```http
Authorization: Bearer <ACCESS_TOKEN>
Content-Type: application/json
```

---

## 4. Parameters

### POST `/customer_service/202309/conversations/{conversation_id}/messages`

#### Path Parameters
* `conversation_id` (string, required): Target conversation identifier.

#### Body Parameters
* `type` (string, required): Card type. Value: `RETURN_REFUND_CARD`.
* `content` (object, required): Card payload.
  * `order_id` (string, required): Target order identifier.
  * `sku_id` (string, required): Target SKU identifier.

---

## 5. Response Structure

### Success Response (`200 OK` / `201 Created`)
```json
{
  "success": true,
  "message_id": "msg_987654321"
}
```

---

## 6. Error Handling

API uses standard HTTP status codes.

| Code | Cause | Action |
| :--- | :--- | :--- |
| `400` | Invalid payload / missing fields | Verify parameters |
| `401` | Token expired / invalid | Refresh access token |
| `403` | No permission for resource | Check scope access |
| `404` | Conversation or Order not found | Verify IDs |

---

## 7. Best Practices & Pitfalls

* **Check Eligibility First**: Always call `GET /return_refund/.../aftersale_eligibility` before initiating returns or cancellations.
* **Webhook Integration**: Subscribe to `RETURN_STATUS_CHANGED` and `CANCELLATION_STATUS_CHANGED` webhooks. Do not poll status endpoints.
* **Card Types**: Match card type (`RETURN_REFUND_CARD`, `ORDER_CARD`, `LOGISTICS_CARD`) to correct payload structure.

---

## 8. Code Example

### Send Return/Refund Card

```bash
curl -X POST "https://api.example.com/customer_service/202309/conversations/conv_12345/messages" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "type": "RETURN_REFUND_CARD",
    "content": {
      "order_id": "order_998877",
      "sku_id": "sku_554433"
    }
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
