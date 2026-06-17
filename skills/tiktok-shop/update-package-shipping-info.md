# TikTok Shop API: Update Package Shipping Info

# Update Package Shipping Info API

## 1. Purpose
Update tracking number and carrier for shipped package. Use when seller must correct shipping details after dispatch.

## 2. Endpoint
* **Method:** `POST`
* **Path:** `/fulfillment/202309/packages/{package_id}/shipping_info/update`

## 3. Headers & Authentication
* **Headers:**
  * `content-type`: `application/json`
  * `x-tts-access-token`: Seller access token.
* **Query Parameters:**
  * `app_key`: App identifier.
  * `sign`: Request signature.
  * `timestamp`: Unix timestamp (UTC).
  * `shop_cipher`: Shop identifier.

## 4. Parameters

### Path Parameters
* `package_id` (string, required): TikTok Shop package ID.

### Request Body (JSON)
* `tracking_number` (string, required): New tracking number from carrier.
* `shipping_provider_id` (string, required): Carrier identifier.

## 5. Response Structure
JSON object containing:
* `code` (number): Status code. `0` means success.
* `message` (string): Status message.
* `request_id` (string): Log identifier.
* `data` (object): Empty on success.

## 6. Error Handling
Handle these specific error codes:
* `21011043`: Package not shipped yet. Ship package first.
* `21011004`: Package not shipped by seller. API only supports seller-shipped packages.
* `21011007`: Active after-sale request. Process after-sale request first.
* `21011022`: Invalid tracking number or provider ID. Verify carrier details.
* `21011030`: Package already delivered. Cannot update delivered packages.
* `21011050` / `21011051` / `21011052`: Update limit reached or time window expired.

## 7. Pitfalls & Best Practices
* **Check status:** Verify package status is "Shipped" but not "Delivered" before call.
* **Verify carrier:** Validate `shipping_provider_id` against carrier list. Invalid ID causes error `21011022`.
* **Act fast:** Update tracking quickly. Platform limits update count and time window.
* **Check disputes:** Ensure no active return or cancellation requests exist.

## 8. Code Example

```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/fulfillment/202309/packages/5433567853345/shipping_info/update?sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3&app_key=38abcd' \
-H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
-H 'content-type: application/json' \
-d '{
  "tracking_number": "576460868968549926",
  "shipping_provider_id": "6965352555291346690"
}'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fulfillment/202309/packages/{package_id}/shipping_info/update`*
