# TikTok Shop API: Get User Portraits

# Get User Portraits API Guide

## 1. Overview
Get viewer demographics for live room. Use to analyze audience age, gender, follower status.

## 2. Endpoint
* **Method**: `GET`
* **URL**: `https://open-api.tiktokglobalshop.com/analytics/202502/live_rooms/{live_room_id}/user_portraits`

## 3. Headers & Auth
* `content-type`: `application/json`
* `x-tts-access-token`: Creator access token (from Get Access Token, user_type = 1).

## 4. Parameters

### Path Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `live_room_id` | string | Yes | Live stream room ID |

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key |
| `sign` | string | Yes | Signature from gen algorithm |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00) |

## 5. Response Structure
* `code` (number): Status code. `0` means success.
* `message` (string): Error details.
* `request_id` (string): Log ID for debug.
* `data` (object): Portrait metrics.
  * `all_ads_gender_indicators` (array): Gender distribution.
  * `all_fan_indicators` (array): Follower status.
  * `all_ads_age_indicators` (array): Age distribution.

## 6. Error Handling
* `66009302`: Invalid param. Check room ID.
* `66009315`: No permission. Check token scope.

## 7. Pitfalls & Best Practices
* **Sign calculation**: Include all query parameters in signature hash.
* **Token expiry**: Refresh creator token before call.
* **Timestamp**: Must use UTC. Clock drift causes auth failure.

## 8. Code Example

```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/analytics/202502/live_rooms/123/user_portraits?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
  -H 'content-type: application/json' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /analytics/202502/live_rooms/{live_room_id}/user_portraits`*
