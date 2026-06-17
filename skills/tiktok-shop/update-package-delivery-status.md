# TikTok Shop API: Update Package Delivery Status

# Update Package Delivery Status API Implementation Guide

## 1. Overview
API updates package status from in-transit to DELIVERED. 
* **Use case**: Seller Own Fleet (SOF) delivery update.
* **Constraint**: SEA (Southeast Asia) region only.
* **Constraint**: SOF capability required.

## 2. Endpoint
* **HTTP Method**: `POST`
* **URL**: `https://open-api.tiktokglobalshop.com/fulfillment/202309/packages/deliver`

## 3. Headers & Authentication
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (from Get Access Token, `user_type` = 0).

## 4. Parameters

### Query Parameters
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `shop_cipher` | string | Yes | Shop identifier. |
| `app_key` | string | Yes | Unique app key. |
| `sign` | string | Yes | Request signature from gen algorithm. |
| `timestamp` | number | Yes | Unix timestamp GMT (UTC+00:00). |

### Request Body (JSON)
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `packages` | array | Yes | List of packages to update. |

**Package Object Structure:**
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `id` | string | Yes | Package ID. |
| `delivery_type` | string | Yes | Delivery status (e.g., `DELIVERY_SUCCESS`). |
| `fail_delivery_reason` | string | No | Reason if delivery failed (e.g., `INVALID_ADDRESS`). |
| `file_type` | string | No | Proof file type (e.g., `IMG`). |
| `file_url` | string | No | Proof file URL. |

## 5. Response Structure
Returns JSON object.

| Field | Type | Description |
| :--- | :--- | :--- |
| `code` | number | Success or failure status code. `0` means success. |
| `message` | string | Success or failure message. |
| `request_id` | string | Request log identifier. |
| `data` | object | Specific return information. Contains `errors` array for package-level failures. |

## 6. Error Handling
Check root `code` first. If `0`, check `data.errors` for individual package failures.

### Error Codes
* `36009003`: Internal error. Retry request.
* `21001011`: System process error. Retry later.
* `21011028`: Package not belong to shop. Check `shop_cipher`.
* `10007014`: Order not in SOF service. Verify package delivery type.

## 7. Pitfalls & Best Practices
* **Region Lock**: API fails outside SEA region. Check shop location before call.
* **SOF Only**: Standard shipping packages fail. Use only for Seller Own Fleet.
* **Signature**: Generate `sign` parameter using correct algorithm. Incorrect signature causes auth failure.

## 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fulfillment/202309/packages/deliver?shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
-H 'content-type: application/json' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-d '{
  "packages": [
    {
      "id": "11529598723402",
      "delivery_type": "DELIVERY_SUCCESS",
      "fail_delivery_reason": "INVALID_ADDRESS",
      "file_type": "IMG",
      "file_url": "https://tiktok.shopcenter.cn/file/CWvBsBZ9mhbMiHtmbZecKshon6f?table=tblTW"
    }
  ]
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fulfillment/202309/packages/deliver`*
