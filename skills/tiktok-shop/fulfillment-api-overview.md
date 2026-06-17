# TikTok Shop API: Fulfillment API overview

# TikTok Shop Fulfillment API Guide

Fulfillment API process order. Print label. Track shipment. Use after customer pay.

## Fulfillment Types

*   **FULFILLMENT_BY_TIKTOK**: TikTok process order.
*   **FULFILLMENT_BY_SELLER**: Seller process order. Two shipping types:
    *   `TIKTOK` (Platform shipping): Buy label or schedule pick-up via TikTok carrier.
    *   `SELLER` (Seller shipping): Use own carrier. Upload tracking.

---

## Endpoints

| Method | Path | Name |
| :--- | :--- | :--- |
| `GET` | `/docv2/page/get-order-split-attributes-202309` | Get Order Split Attributes |
| `POST` | `/docv2/page/split-orders-202309` | Split Orders |
| `POST` | `/docv2/page/get-eligible-shipping-service-202309` | Get Eligible Shipping Service |
| `POST` | `/docv2/page/create-first-mile-bundle-202407` | Create First Mile Bundle |
| `POST` | `/docv2/page/search-package-202309` | Search Package |
| `GET` | `/docv2/page/search-combinable-packages-202309` | Search Combinable Packages |
| `POST` | `/docv2/page/combine-package-202309` | Combine Package |
| `POST` | `/docv2/page/uncombine-packages-202309` | Uncombine Packages |
| `GET` | `/docv2/page/get-package-handover-time-slots-202309` | Get Package Handover Time Slots |
| `POST` | `/docv2/page/ship-package-202309` | Ship Package |
| `POST` | `/docv2/page/batch-ship-packages-202309` | Batch Ship Packages |
| `POST` | `/docv2/page/mark-package-as-shipped-202309` | Mark Package As Shipped |
| `GET` | `/docv2/page/get-package-shipping-document-202309` | Get Package Shipping Document |
| `GET` | `/docv2/page/get-package-detail-202309` | Get Package Detail |
| `GET` | `/docv2/page/get-tracking-202309` | Get Tracking |
| `POST` | `/docv2/page/update-shipping-info-202309` | Update Shipping Info |
| `POST` | `/docv2/page/update-package-shipping-info-202309` | Update Package Shipping Info |
| `POST` | `/docv2/page/fulfillment-upload-delivery-file-202309` | Fulfillment Upload Delivery File |
| `POST` | `/docv2/page/fulfillment-upload-delivery-image-202309` | Fulfillment Upload Delivery Image |
| `POST` | `/docv2/page/update-package-delivery-status-202309` | Update Package Delivery Status |
| `POST` | `/docv2/page/upload-invoice-202502` | Upload Invoice |
| `GET` | `/docv2/page/tts-tracking-validation-202508` | TTS Tracking Validation |
| `POST` | `/docv2/page/create-first-mile-bundle-v2-202510` | Create First Mile Bundle(V2) |
| `POST` | `/docv2/page/create-packages-202512` | Create Packages |
| `POST` | `/docv2/page/redeem-info-callback-202601` | Redeem Info Callback |

---

## Headers & Authentication

Request need sign. Add headers:

*   `Content-Type`: `application/json`
*   `x-tts-access-token`: Seller access token.
*   `app_key`: App identification.
*   `timestamp`: Epoch time seconds.
*   `sign`: Request signature.

---

## Parameters

Common parameters used across endpoints:

*   `order_id` (String): Unique order identifier.
*   `package_id` (String): Unique package identifier.
*   `shipping_service_id` (String): Selected shipping service identifier.
*   `tracking_number` (String): Carrier tracking number.
*   `shipping_provider_id` (String): Carrier identifier.

---

## Response Structure

Standard API response wrapper:

```json
{
  "code": 0,
  "message": "Success",
  "request_id": "20230912123456789",
  "data": {}
}
```

---

## Error Handling

Check `code` field. If `code` not `0`, request fail.

*   `code` = `0`: Success.
*   `code` >= `40000` and < `50000`: Client error. Fix payload. Do not retry.
*   `code` >= `50000`: Server error. Retry with exponential backoff.

---

## Fulfillment Flows

### Flow 1: TikTok Shipping (US, UK, JP)
1. Call `POST /docv2/page/get-eligible-shipping-service-202309` to retrieve available shipping services (

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
