# TikTok Shop API: Get Open Collaboration Sample Rules

# API Guide: Get Open Collaboration Sample Rules

## 1. Purpose
Get status, details of sample rules for open collaboration products. Use to check creator requirements, remaining quota, active rules.

## 2. Endpoint
*   **Method:** `GET`
*   **URL:** `https://open-api.tiktokglobalshop.com/affiliate_seller/202410/open_collaborations/sample_rules`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from "Get Access Token" where `user_type = 0`.

## 4. Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. |
| `product_ids` | array | Yes | Target product IDs. |

## 5. Response Fields
*   `code` (number): Status code. `0` is success.
*   `message` (string): Status message.
*   `request_id` (string): Request log ID.
*   `data` (object): Rule details container.
    *   `sample_rules` (array):
        *   `product_id` (string): Product ID.
        *   `sample_quota` (number): Total quota.
        *   `is_sample_time_unlimited` (boolean): Time limit flag.
        *   `status` (string): Rule status (e.g., `ONGOING`).
        *   `available_quantity` (number): Remaining samples.
        *   `start_time` (number): Start epoch.
        *   `end_time` (number): End epoch.
        *   `thresholds` (object): Creator requirements.
            *   `minimum_follower_count` (number): Min followers.
            *   `minimum_gmv` (number): Min GMV.
            *   `avg_ec_video_views` (number): Min average video views.
            *   `category_ids` (array of strings): Allowed categories.
            *   `predicted_fulfillment_rank` (string): Fulfillment rank requirement.

## 6. Error Codes
*   `36009003`: Internal error. Retry request. Contact support if fail persist.

## 7. Pitfalls & Best Practices
*   **Query Array Format:** Pass `product_ids` as comma-separated values in URL query string.
*   **Signature Calculation:** Include all query parameters in signature calculation.
*   **Token Type:** Use seller token (`user_type = 0`). Wrong token type cause auth failure.

## 8. Examples

### Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/affiliate_seller/202410/open_collaborations/sample_rules?timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&product_ids=172979,848746&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json'
```

### Response
```json
{
  "code": 0,
  "data": {
    "sample_rules": [
      {
        "product_id": "123456",
        "sample_quota": 100,
        "is_sample_time_unlimited": true,
        "status": "ONGOING",
        "available_quantity": 50,
        "start_time": 1728546888,
        "end_time": 1728546888,
        "thresholds": {
          "minimum_follower_count": 200,
          "minimum_gmv": 1000,
          "avg_ec_video_views": 5,
          "category_ids": [
            "601152"
          ],
          "predicted_fulfillment_rank": "ALL"
        }
      }
    ]
  }
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_seller/202410/open_collaborations/sample_rules`*
