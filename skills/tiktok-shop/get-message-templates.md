# TikTok Shop API: Get Message Templates

# Guide: Get Message Templates API

## Purpose
API fetches pre-defined TikTok Shop message templates. Use to get layouts for customer engagement.

## Endpoint
*   **Method:** `GET`
*   **URL:** `https://open-api.tiktokglobalshop.com/customer_engagement/202412/message_templates`

## Headers
*   `content-type`: `application/json` (Required)
*   `x-tts-access-token`: Seller access token. Required. Get from token API where `user_type = 0`.

## Query Parameters
*   `app_key` (string, required): Unique developer app key.
*   `sign` (string, required): Request signature. Generate via sign algorithm.
*   `timestamp` (number, required): Unix timestamp in seconds (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier cipher.
*   `locale` (string, required): BCP-47 locale codes. Delimit with commas. Default: `en-US`.

## Response Fields
*   `code` (number): Status code. `0` means success.
*   `message` (string): Status message.
*   `request_id` (string): Request log identifier.
*   `data` (object): Template data container.
    *   `message_templates` (array): List of templates.
        *   `id` (string): Template identifier.
        *   `message_title` (string): Template title.
        *   `message_body` (string): Template body text.
        *   `product_card_rules` (object): Product card limits.
            *   `min_count` (number): Minimum products allowed.
            *   `max_count` (number): Maximum products allowed.
        *   `coupon_card_rules` (object): Coupon card limits.
            *   `min_count` (number): Minimum coupons allowed.
            *   `max_count` (number): Maximum coupons allowed.
            *   `coupon_type` (array of strings): Allowed coupon types (e.g., `REGULAR_ALL`, `REGULAR_REPEAT`).

## Error Handling
*   **Error Code `68009001`**: Access denied. Shop fails CRM feature criteria.
*   **Action**: Check seller status. Verify CRM eligibility in Seller Center.

## Pitfalls & Best Practices
*   **Signature Failures**: Sort query parameters alphabetically before hashing.
*   **Timestamp Expiry**: Sync system clock with UTC. Requests fail if timestamp differs too much from server time.
*   **Locale Fallback**: Pass correct BCP-47 codes. Fallback defaults to `en-US` if unsupported.

## Implementation Example

### cURL Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/customer_engagement/202412/message_templates?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&locale=en' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json'
```

### JSON Response
```json
{
  "code": 0,
  "data": {
    "message_templates": [
      {
        "id": "8646958016719848812",
        "message_title": "Meet your next favorite thing!",
        "message_body": "We strive to create products with you in mind. Check out our newest drop to find your perfect fit that’s built for a confidence boost.",
        "product_card_rules": {
          "min_count": 0,
          "max_count": 4
        },
        "coupon_card_rules": {
          "min_count": 1,
          "max_count": 1,
          "coupon_type": [
            "REGULAR_ALL,REGULAR_REPEAT"
          ]
        }
      }
    ]
  }
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /customer_engagement/202412/message_templates`*
