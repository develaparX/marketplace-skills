# TikTok Shop API: Get Conversation Messages

# Get Conversation Messages API Implementation Guide

## 1. Overview
API fetch messages between buyer and shop. Use to sync chat history. Read status unchanged.

## 2. Endpoint
*   **Method**: `GET`
*   **Path**: `/customer_service/202309/conversations/{conversation_id}/messages`
*   **Base URL**: `https://open-api.tiktokglobalshop.com`

## 3. Headers & Authentication
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (from Get Access Token, user_type = 0)

## 4. Parameters

### Path Parameters
*   `conversation_id` (string, required): Target conversation ID.

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp (UTC).
*   `shop_cipher` (string, required): Shop identifier.
*   `page_size` (number, required): Messages per page. Max 10.
*   `page_token` (string, optional): Pagination cursor.
*   `locale` (string, optional): Language code. Default `en`.
*   `sort_order` (string, optional): Sort direction. `DESC` (default) or `ASC`.
*   `sort_field` (string, optional): Sort property. `create_time` (default) or `index`.
*   `need_data` (boolean, optional): Return raw message data.
*   `need_plaintext` (boolean, optional): Return plaintext content.
*   `time_zone` (string, optional): Timezone for formatting. Default `UTC`.

## 5. Response Structure
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status description.
*   `request_id` (string): Request identifier.
*   `data` (object): Response payload.
    *   `next_page_token` (string): Cursor for next page.
    *   `unsupported_msg_tips` (string): Fallback text for unsupported messages.
    *   `messages` (array): List of message objects.
        *   `id` (string): Message ID.
        *   `type` (string): Message type (e.g., `TEXT`).
        *   `content` (string): JSON string of message content.
        *   `create_time` (number): Unix timestamp.
        *   `is_visible` (boolean): Visibility status.
        *   `sender` (object): Sender info.
            *   `im_user_id` (string): Sender ID.
            *   `role` (string): Sender role (`BUYER`, `SHOP`).
            *   `nickname` (string): Sender name.
            *   `avatar` (string): Avatar URL.
        *   `index` (string): Sort index.
        *   `data` (string): Raw data payload.
        *   `plaintext` (string): Plaintext representation.

## 6. Error Codes
*   `45101001`: Internal error. Retry request.
*   `45101003`: Record not found. Check parameters.
*   `45101004`: Quota limit reached (10,000 requests/day). Stop requests until tomorrow.
*   `36009003`: Internal error. Retry request.

## 7. Implementation Details & Pitfalls

### Pagination Sequence
1. Send initial request with `page_size` set to 10.
2. Extract `next_page_token` from the response data.
3. If `next_page_token` is present, send the next request with `page_token` set to this value.
4. Repeat until `next_page_token` is empty or null.

### Pitfalls
*   **Read Status**: Calling this API does not mark messages as read. Use mark-read API separately.
*   **Page Limit**: Max page size is 10. Requests exceeding 10 will fail or truncate.
*   **Rate Limit**: Daily quota is 10,000 requests. Cache message history to avoid depletion.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/customer_service/202309/conversations/7494560109732334261/messages?locale=en&sort_order=DESC&need_data=false&need_plaintext=false&time_zone=Asia/Shanghai&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&page_token=7494560109732337542&page_size=10&sort_field=create_time&app_key=38abcd&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNV

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /customer_service/202309/conversations/{conversation_id}/messages`*
