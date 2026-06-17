# TikTok Shop API: Get Conversation

# Implement Get Conversation API

## 1. Purpose
API gets conversation details. Use to sync chat state, check unread count, get participant roles.

## 2. Endpoint
* **Method**: `GET`
* **URL**: `https://open-api.tiktokglobalshop.com/customer_service/202601/conversations/{conversation_id}`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, when `user_type = 0`).

## 4. Parameters
### Path Parameters
* `conversation_id` (string, required): Target conversation ID.

### Query Parameters
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Signature from generation algorithm.
* `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
* `shop_cipher` (string, required): Shop identifier.
* `need_session_id` (boolean, optional):

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /customer_service/202601/conversations/{conversation_id}`*
