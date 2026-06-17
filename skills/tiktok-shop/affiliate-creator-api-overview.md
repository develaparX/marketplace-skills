# TikTok Shop API: Affiliate Creator API overview

# Affiliate Creator API Implementation Guide

## 1. Function & Use Cases
API connect creator to seller. Use to manage showcase, search collaboration, handle sample, track order, post video.

### Market Restrictions
*   **Blocked regions:** UK, EU. Do not call API for users in these regions.

### Creator Eligibility
*   **Age:** 18+ years.
*   **Violations:** Maximum 3.
*   **Follower limits:**
    *   US: 1K+
    *   UK: 5K+
    *   SEA: 5K+

---

## 2. Endpoints & Methods

### Showcase Management
*   `GET /docv2/page/get-creator-profile-202508`
*   `GET /docv2/page/get-showcase-products-202405`
*   `POST /docv2/page/add-showcase-products-202405`
*   `DEL /docv2/page/remove-showcase-products-202409`
*   `POST /docv2/page/top-showcase-products-202409`

### Collaboration Search
*   `POST /docv2/page/creator-search-open-collaboration-product-202405`
*   `POST /docv2/page/get-open-collaboration-product-list-by-product-ids-202509`
*   `POST /docv2/page/search-creator-target-collaborations-202405`

### Sample Management
*   `POST /docv2/page/search-creator-sample-applications-202412`
*   `POST /docv2/page/get-creator-sample-application-detail-202412`
*   `POST /docv2/page/creator-search-sample-application-fulfillments-202409`
*   `GET /docv2/page/get-creator-applicable-sample-label-202412`

### Link Generation
*   `POST /docv2/page/creator-generate-general-link-202505`
*   `POST /docv2/page/creator-generate-publisher-link-202504`

### Order Tracking
*   `POST /docv2/page/creator-search-affiliate-trace-orders-202505`
*   `POST /docv2/page/search-creator-affiliate-orders-202410`

### Shoppable Video
*   `POST /docv2/page/upload-shoppable-video-file-202505`
*   `GET /docv2/page/get-shop-products-202509`
*   `GET /docv2/page/get-shoppable-video-status-202509`
*   `POST /docv2/page/precheck-video-content-202511`
*   `GET /docv2/page/get-shoppable-video-precheck-result-202601`
*   `POST /docv2/page/post-shoppable-video-202603`

---

## 3. Headers & Authentication
Pass OAuth token in header.

```http
Authorization: Bearer <ACCESS_TOKEN>
Content-Type: application/json
```

---

## 4. Common Parameters

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `creator_id` | String | Unique ID of creator |
| `product_ids` | Array[String] | Target product IDs |
| `page_size` | Integer | Number of records per page |
| `cursor` | String | Pagination token |

---

## 5. Response Structure
Standard JSON envelope.

```json
{
  "code": 0,
  "message": "success",
  "data": {}
}
```

---

## 6. Error Handling
Handle HTTP status codes.

*   `400 Bad Request`: Invalid parameter. Check input.
*   `401 Unauthorized`: Token expired. Refresh token.
*   `403 Forbidden`: Market restricted or eligibility fail. Stop request.
*   `429 Too Many Requests`: Rate limit hit. Back off.
*   `500 Internal Error`: Server issue. Retry with backoff.

---

## 7. Pitfalls & Best Practices
*   **Geofence check:** Verify creator region before call. UK/EU users cause 403 error.
*   **Video sequence:** Follow order: Upload -> Precheck -> Get Precheck Result -> Post. Skip precheck cause post failure.
*   **Rate limits:** Cache product lists. Avoid frequent calls to `/get-showcase-products`.

---

## 8. Code Example

### Add Product to Showcase
```bash
curl -X POST "https://api.tiktok.com/docv2/page/add-showcase-products-202405" \
  -H "Authorization: Bearer clt_access_token_123" \
  -H "Content-Type: application/json" \
  -d '{
    "creator_id": "cr_9988",
    "product_ids": ["prod_5544", "prod_3322"]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
