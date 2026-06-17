# TikTok Shop API: Get Message in the Conversation

# Guide: Get Message in Conversation

## Purpose
Get chat history. Use to sync messages or show chat log.

## Endpoint
* Method: `GET`
* Path: `https://open-api.tiktokglobalshop.com/affiliate_seller/202412/conversation/{conversation_id}/messages`

## Headers
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token. Required.

## Parameters

### Path
* `conversation_id` (string, required): Conversation identifier.

### Query
* `app_key` (string, required): Unique app key.
* `sign` (string, required): Request signature.
* `timestamp` (number, required): Unix timestamp UTC.
* `page_size` (number, required): Max 20.
* `page_token` (string, optional): Pagination offset. Empty first request.
* `shop_cipher` (string, required): Shop identifier. Required for cross-border.

## Response
Returns JSON object.

```json
{
  "code": 0,
  "message": "Success",
  "request_id": "string",
  "data": {
    "has_more": true,
    "next_page_token": "string",
    "messages": [
      {
        "conversation_index": "string",
        "message_body": {
          "id": "string",
          "conversation_id": "string",
          "type": "TEXT",
          "content": "string (escaped JSON)",
          "create_time": 1691411573,
          "sender_id": "string"
        }
      }
    ]
  }
}
```

## Error Codes
* `16032001`: Region mismatch. Check Creator and Seller parameters.
* `36009003`: Internal error. Retry request. Contact support if fail persist.

## Pitfalls & Best Practices
* `page_size` limit: Max 20. Request fail if exceed.
* `shop_cipher` check: Must pass correct cipher. Wrong cipher cause bad response.
* Double parse: `message_body.content` is escaped JSON string. Parse string to get actual text.
* Pagination: Use `next_page_token` from response in next request `page_token` query parameter.

## Example Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/affiliate_seller/202412/conversation/1234567890/messages?page_token=b2Zmc2V0PTAK&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&page_size=20' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_seller/202412/conversation/{conversation_id}/messages`*
