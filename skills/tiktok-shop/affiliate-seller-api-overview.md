# TikTok Shop API: Affiliate Seller API overview

# Affiliate Seller API Implementation Guide

## 1. Purpose & Use Cases
API connects sellers with creators to promote products. 
* Use **Open Collaboration** to make products visible to all qualified creators.
* Use **Target Collaboration** to invite specific creators.
* Use **IM Messaging** to negotiate terms.
* Use **Sample Management** to approve and track free product samples.
* Use **Compass Tasks** to export performance reports.

## 2. Market & Eligibility Rules
* **Blocked Regions:** UK, EU. Do not call API for these markets.
* **Creator Requirements:**
  * Age: >= 18 years.
  * Violations: <= 3.
  * Followers: US >= 1K, UK >= 5K, SEA >= 5K.

## 3. Endpoints

### Creator Search
* `POST /docv2/page/seller-search-creator-on-marketplace-202508`
* `POST /docv2/page/get-seller-search-creator-marketplace-advanced-filters-202601`
* `GET /docv2/page/get-marketplace-creator-performance-202508`

### Open Collaboration
* `GET /docv2/page/get-open-collaboration-settings-202409`
* `POST /docv2/page/edit-open-collaboration-settings-202405`
* `GET /docv2/page/get-open-collaboration-sample-rules-202410`
* `POST /docv2/page/edit-open-collaboration-sample-rule-202410`
* `POST /docv2/page/create-open-collaboration-202412`
* `POST /docv2/page/search-open-collaboration-202412`
* `DEL /docv2/page/remove-open-collaboration-202409`
* `GET /docv2/page/get-open-collaboration-creator-content-detail-202508`
* `POST /docv2/page/seller-search-affiliate-open-collaboration-product-202405`
* `POST /docv2/page/remove-creator-from-open-collaboration-202508`

### Target Collaboration
* `POST /docv2/page/create-target

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
