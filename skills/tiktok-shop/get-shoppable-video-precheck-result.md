# TikTok Shop API: Get Shoppable Video Precheck Result

# Shoppable Video Precheck Result API Guide

## 1. Purpose
Get video precheck status. Use after video upload. Check violation and quality status.

## 2. Endpoint
* **Method**: `GET`
* **URL**: `https://open-api.tiktokglobalshop.com/affiliate_creator/202601/videos/precheck_tasks/{task_id}`

## 3. Headers
* `content-type`: `application/json`
* `x-tts-access-token`: Creator token (user_type = 1).

## 4. Parameters
### Path
* `task_id` (string, required): ID from precheck submission.

### Query
* `app_key` (string, required): App identifier.
* `sign` (string, required): Request signature.
* `timestamp` (number, required): Unix epoch time (seconds).

## 5. Response Structure
Returns JSON.

Key fields:
* `code` (number): Status code. `0` is success.
* `message` (string): Error details.
* `request_id` (string): Log ID.
* `data.precheck_task.violation_check_result`: Violation status (`PASS`/`FAIL`) and issues.
* `data.precheck_task.good_quality_check_result`: Quality status (`PASS`/`FAIL`) and issues.

## 6. Error Codes
* `36009003`: Internal error. Retry request. Contact support if fail persists.

## 7. Best Practices & Pitfalls
* **Poll rate**: Do not spam API. Wait between checks.
* **Sign calculation**: Compute signature using correct secret key.
* **Token type**: Use creator token (user_type = 1).

## 8. Example Request
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/affiliate_creator/202601/videos/precheck_tasks/7493990579714164574?timestamp=1623812664&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

## 9. Example Response
```json
{
  "code": 0,
  "data": {
    "precheck_task": {
      "id": "7493990579714164574",
      "violation_check_result": {
        "status": "FAIL",
        "issues": [
          {
            "risk": "Pirated Content",
            "suggestions": "Your video may include unoriginal content. Creating original content is essential for standing out from the crowd."
          }
        ]
      },
      "good_quality_check_result": {
        "status": "FAIL",
        "issues": [
          {
            "code": "LOW_CONTENT_PROMOTIO",
            "suggestions": "You can try to showcase the product from multiple perspectives."
          }
        ]
      }
    }
  }
}
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_creator/202601/videos/precheck_tasks/{task_id}`*
