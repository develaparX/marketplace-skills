# TikTok Shop API: Get Decision Eligibility

# Get Decision Eligibility API Implementation Guide

## 1. Purpose
API check seller decisions. Use before action. Prevent error.

## 2. Endpoint
*   **Method:** `GET`
*   **URL:** `https://open-api.tiktokglobalshop.com/return_refund/202601/decision_eligibility`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token (`user_type = 0`).

## 4. Parameters
All parameters pass in query string.

| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop cipher. Required for cross-border shops. |
| `return_or_cancel_id` | string | Yes | Aftersales request ID. Do not use order ID. |
| `check_decisions` | array (comma-separated) | No | Decisions to evaluate. Values: `APPROVE_REQUEST_CANCEL`, `APPROVE_REFUND`, `APPROVE_RETURN`, `APPROVE_RECEIVED_PACKAGE`, `APPROVE_REPLACEMENT`, `ISSUE_REPLACEMENT_REFUND`, `DIRECT_REFUND`, `REJECT_REQUEST_CANCEL`, `REJECT_REFUND`, `REJECT_RETURN`, `REJECT_RECEIVED_PACKAGE`, `REJECT_REPLACEMENT`. |
| `locale` | string | No | BCP-47 locale code. Default: `en-US`. |

## 5. Response Structure
Response return JSON object.

*   `code` (number): Status code. `0` mean success.
*   `message` (string): Status message.
*   `request_id` (string): Log identifier.
*   `data` (object): Return payload.
    *   `decisions` (array): List of decision status.
        *   `decision` (string): Evaluated decision name.
        *   `eligible` (boolean): Decision allowed status.
        *   `ineligible_code` (number): Reason code if `eligible` false.
        *   `ineligible_reason` (string): Reason text if `eligible` false.
        *   `available_reject_reasons` (array): Allowed rejection reasons.
            *   `name` (string): Reason code name.
            *   `text` (string): Display text.

## 6. Error Handling
*   Check `code` field.
*   If `code` not `0`, read `message` for error detail.
*   If `eligible` false, block action in UI. Show `ineligible_reason` to user.

## 7. Pitfalls & Best Practices
*   **Wrong ID:** Do not send order ID to `return_or_cancel_id`. Use aftersales ID.
*   **Shop Cipher:** Cross-border shops fail without correct `shop_cipher`. Always pass correct cipher.
*   **UI Sync:** Call API before render action buttons. Hide disabled actions.

## 8. Code Example

### cURL
```bash
curl -X GET 'https://open-api.tiktokglobalshop.com/return_refund/202601/decision_eligibility?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&return_or_cancel_id=4035319218955782461&check_decisions=APPROVE_REFUND,REJECT_RETURN&locale=en-US' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json'
```

### Pseudocode
```python
# Check eligibility before action
params = {
    "app_key": APP_KEY,
    "sign": generate_signature(),
    "timestamp": get_utc_timestamp(),
    "shop_cipher": shop.cipher,
    "return_or_cancel_id": aftersales_id,
    "check_decisions": "APPROVE_REFUND"
}

headers = {
    "x-tts-access-token": access_token,
    "content-type": "application/json"
}

response = http.get("/return_refund/202601/decision_eligibility", params=params, headers=headers)

if response.code == 0:
    decision = response.data.decisions[0]
    if decision.eligible:
        show_approve_button()
    else:
        disable_approve_button(reason=decision.ineligible_reason)
else:
    log_error(response.message)
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /return_refund/202601/decision_eligibility`*
