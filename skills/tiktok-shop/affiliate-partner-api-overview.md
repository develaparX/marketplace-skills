# TikTok Shop API: Affiliate Partner API overview

# Affiliate Partner API Implementation Guide

## 1. Overview & Use Cases
API manages affiliate campaigns, tracks creator fulfillment, generates product links, and syncs order data. 

### Restrictions
* **Blocked Regions:** UK, EU.
* **Creator Requirements:** 
  * Age: 18+
  * Max Violations: 3
  * Followers: US 1K+, UK 5K+, SEA 5K+

---

## 2. Endpoints

### Campaign Management
* `POST /docv2/page/create-affiliate-partner-campaign-202405` (Create Campaign)
* `POST /docv2/page/edit-affiliate-partner-campaign-202405` (Edit Campaign)
* `POST /docv2/page/publish-affiliate-partner-campaign-202405` (Publish Campaign)
* `GET /docv2/page/get-affiliate-partner-campaign-detail-202405` (Get Campaign Detail)
* `GET /docv2/page/get-affiliate-partner-campaign-list-202405` (Get Campaign List)

### Product & Link Management
* `POST /docv2/page/review-affiliate-partner-campaign-product-202405` (Review Product)
* `POST /docv2/page/generate-affiliate-partner-campaign-product-link-202405` (Generate Single Link)
* `POST /docv2/page/partner-generate-multi-affiliate-campaign-product-link-202505` (Generate Multi Link)
* `GET /docv2/page/get-affiliate-partner-campaign-product-list-202405` (Get Product List)

### Creator & Performance Tracking
* `GET /docv2/page/get-affiliate-campaign-creator-fulfillment-status-list-202501` (Get Creator Status List)
* `GET /docv2/page/get-affiliate-campaign-creator-fulfillment-status-info-202508` (Get Creator Status Info)
* `GET /docv2/page/get-affiliate-campaign-creator-product-content-statistics-202508` (Get Content Stats)
* `GET /docv2/page/get-affiliate-campaign-creator-product-sample-status-202508` (Get Sample Status)

### Order Search
* `POST /docv2/page/search-cap-affiliate-orders-202603` (Search CAP Orders)
* `POST /docv2/page/search-tap-affiliate-orders-202603` (Search TAP Orders)

---

## 3. Headers & Authentication
Include headers in all requests:
* `Authorization: Bearer <ACCESS_TOKEN>`
* `Content-Type: application/json`

---

## 4. Parameters

### Create Campaign (`POST /docv2/page/create-affiliate-partner-campaign-202405`)
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `campaign_name` | string | Yes | Name of campaign |
| `collaboration_type` | string | Yes | "Open Collaboration", "Target Collaboration", or "Affiliate Partner Campaigns" |
| `start_time` | integer | Yes | Epoch timestamp (seconds) |
| `end_time` | integer | Yes | Epoch timestamp (seconds) |

### Search Orders (`POST /docv2/page/search-cap-affiliate-orders-202603`)
| Parameter | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `start_time` | integer | Yes | Epoch timestamp (seconds) |
| `end_time` | integer | Yes | Epoch timestamp (seconds) |
| `page_size` | integer | No | Default 20, max 100 |
| `cursor` | string | No | Pagination token |

---

## 5. Response Structure
All responses return standard JSON wrapper:

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

---

## 6. Error Handling
Handle standard HTTP status codes:
* `400 Bad Request`: Parameter invalid. Check types.
* `401 Unauthorized`: Token expired. Refresh token.
* `403 Forbidden`: Region blocked (UK/EU) or creator ineligible.
* `429 Too Many Requests`: Rate limit hit. Back off.

---

## 7. Pitfalls & Best Practices
* **Region Lock:** UK and EU calls fail. Check creator region before call.
* **Creator Check:** Verify follower count and violations before invite. Avoid API rejection.
* **Pagination:** Use cursor for order search. Do not offset page.

---

## 8. Code Example

### Create Campaign Request
```bash
curl -X POST "https://api.example.com/docv2/page/create-affiliate-partner-campaign-202405" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "campaign_name": "Summer Special 2024",
    "collaboration_type": "Open Collaboration",
    "start_time": 1717199999,
    "end_time": 1719791999
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
