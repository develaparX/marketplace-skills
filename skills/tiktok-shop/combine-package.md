# TikTok Shop API: Combine Package

# Combine Package API Implementation Guide

## 1. Purpose & Use Case
API merge multiple packages into one fulfillment package. Use when seller combine multiple shipments to save cost.

## 2. Endpoint & Method
* **Method**: `POST`
* **Path**: `/fulfillment/202309/packages/combine`
* **Sandbox Base URL**: `https://api-sandbox.tiktokshop.com`

## 3. Headers & Auth
* `Content-Type`: `application/json`
* `x-tts-access-token`: Seller access token (from auth flow, `user_type = 0`).

## 4. Parameters

### Query Parameters
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |
| `shop_cipher` | string | Yes | Shop identifier. |

### Request Body (JSON)
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `combinable_packages` | array | Yes | List of packages to merge. |

#### `combinable_packages` Object Structure
| Name | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `package_id` | string | Yes | ID of package to combine. |

## 5. Response Structure
Returns JSON object.

### Root Fields
* `code` (number): Status code. `0` means API call success.
* `message` (string): Status message.
* `request_id` (string): Log identifier.
* `data` (object): Result payload.

### `data` Object Fields
* `packages` (array): Successfully combined packages.
  * `id` (string): New combined package ID.
  * `order_ids` (array of strings): Orders in package.
* `errors` (array): Failed package merges.
  * `code` (number): Error code.
  * `message` (string): Error reason.
  * `detail` (object): Contains failed `package_id`.

## 6. Error Handling
Check root `code` and `data.errors` array.

### Common Error Codes
* `21011028`: Package not belong to shop. Action: Check package ID and shop cipher.
* `21011031`: Order not belong to pre_pkg. Action: Check order ID.
* `36009003`: Internal error. Action: Retry. Contact support if fail.
* `10007014` (in `data.errors`): Combine not allowed. Action: Check package status.

## 7. Pitfalls & Best Practices
* **Check Partial Success**: API return HTTP 200 even if packages fail to combine. Always check `data.errors` array.
* **Signature Generation**: Generate signature correct. Wrong signature cause auth failure.
* **Token Expiry**: Refresh token before call.

## 8. Code Example

```bash
curl -X POST "https://api-sandbox.tiktokshop.com/fulfillment/202309/packages/combine?app_key=example_app_key&sign=example_sign&timestamp=1600000000&shop_cipher=example_cipher" \
  -H "Content-Type: application/json" \
  -H "x-tts-access-token: example_token" \
  -d '{
    "combinable_packages": [
      {
        "package_id": "123456"
      }
    ]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fulfillment/202309/packages/combine`*
