---
name: tiktok-shop-api
description: >
  Use when building TikTok Shop integrations, implementing TikTok Shop API calls,
  troubleshooting TikTok Shop API errors, or asking about TikTok Shop endpoints.
  Provides complete API reference for products, orders, fulfillment, finance,
  affiliate, customer service, and more.
---

# TikTok Shop API Reference

## How to Use

When user asks about a specific TikTok Shop API:
1. Find the relevant API in the index below
2. Read the corresponding file from `apis/` directory
3. Provide endpoint, parameters, and implementation details

File path pattern: `apis/<api-slug>.md`

Example: "How to create a product?" → read `apis/create-product.md`

## Available APIs

### Products & Listing
- [Listing quality diagnosis](apis/listing-quality-diagnosis.md)
- [Common mistakes](apis/common-mistakes.md)
- [Check Product Listing](apis/check-product-listing.md)
- [Upload Product Image](apis/upload-product-image.md) - Upload product image to system
- [Upload Product File](apis/upload-product-file.md) - Upload non-image files (PDF, video)
- [Search Size Charts](apis/search-size-charts.md) - Retrieve size charts that a seller has created
- [Create Product](apis/create-product.md)
- [Activate Product](apis/activate-product.md) - Activate hidden products
- [Deactivate Products](apis/deactivate-products.md) - Deactivate and hide from buyers
- [Delete Products](apis/delete-products.md) - Delete non-frozen products
- [Recover Products](apis/recover-products.md) - Recover deleted products
- [Get Product](apis/get-product.md) - Retrieve all properties of a product
- [Search Products](apis/search-products.md)
- [Update Price](apis/update-price.md)
- [Update Inventory](apis/update-inventory.md)
- [Inventory Search](apis/inventory-search.md) - Retrieve inventory for multiple products/SKUs
- [Diagnose and Optimize Product](apis/diagnose-and-optimize-product.md)
- [Product Information Issue Diagnosis](apis/product-information-issue-diagnosis.md)
- [Get Products SEO Words](apis/get-products-seo-words.md) - SEO suggestions for product titles
- [Get Recommended Product Title And Description](apis/get-recommended-product-title-and-description.md) - AI-optimized titles/descriptions
- [Optimized Images](apis/optimized-images.md) - Change background to white
- [Create Image Translation Tasks](apis/create-image-translation-tasks.md)
- [Get Image Translation Tasks](apis/get-image-translation-tasks.md)
- [Edit Product](apis/edit-product.md)
- [Partial Edit Product](apis/partial-edit-product.md)
- [Product Auditing Research](apis/product-auditing-research.md) - Compliance testing report
- [Get Recommended Product Package](apis/get-recommended-product-package.md) - BR and MX only
- [Upload File Init](apis/upload-file-init.md) - Initialize upload for large files

### Global Products (Cross-border)
- [Get Global Categories](apis/get-global-categories.md)
- [Recommend Global Categories](apis/recommend-global-categories.md)
- [Get Global Category Rules](apis/get-global-category-rules.md)
- [Get Global Attributes](apis/get-global-attributes.md)
- [Create Global Product](apis/create-global-product.md)
- [Publish Global Product](apis/publish-global-product.md)
- [Edit Global Product](apis/edit-global-product.md)
- [Delete Global Products](apis/delete-global-products.md)
- [Get Global Product](apis/get-global-product.md)
- [Search Global Products](apis/search-global-products.md)
- [Update Global Inventory](apis/update-global-inventory.md)
- [Partial Edit Global Product](apis/partial-edit-global-product.md)
- [Get Global Listing Rules](apis/get-global-listing-rules.md)
- [Replicate Product](apis/replicate-product.md)
- [Get Global Replicated Products](apis/get-global-replicated-products.md)
- [Create Category Upgrade Task](apis/create-category-upgrade-task.md) - 3-level to 7-level category
- [Create GPA Upgrade Task](apis/create-gpa-upgrade-task.md) - EU interconnection upgrade

### Manufacturers & Responsible Persons
- [Create Manufacturer](apis/create-manufacturer.md) - Auto-translated to EU languages
- [Partial Edit Manufacturer](apis/partial-edit-manufacturer.md)
- [Search Manufacturers](apis/search-manufacturers.md)
- [Create Responsible Person](apis/create-responsible-person.md)
- [Partial Edit Responsible Person](apis/partial-edit-responsible-person.md)
- [Search Responsible Persons](apis/search-responsible-persons.md)

### Opportunities & SKPP
- [Get Opportunity Detail](apis/get-opportunity-detail.md) - Market trend data and recommendations
- [List Opportunity](apis/list-opportunity.md)
- [Submit Product via Opportunity](apis/submit-product-via-opportunity.md)
- [Get Submission Records](apis/get-submission-records.md)
- [Update Stock Operation Settings](apis/update-stock-operation-settings.md) - Auto-replenishment
- [Submit Appeal Task](apis/submit-appeal-task.md)
- [List Products SKPP Status](apis/list-products-skpp-status.md)
- [Get Product SKPP Detail](apis/get-product-skpp-detail.md)
- [Get Shop SKPP Summary](apis/get-shop-skpp-summary.md)

### Promotions & Coupons
- [Promotion API overview](apis/promotion-api-overview.md) - Product Discount, Flash Deal, Coupon
- [Shipping discount supported areas](apis/shipping-discount-supported-areas.md)
- [Create Activity](apis/create-activity.md) - Product discount or flash deal
- [Update Activity](apis/update-activity.md)
- [Deactivate Activity](apis/deactivate-activity.md)
- [Get Activity](apis/get-activity.md)
- [Search Activities](apis/search-activities.md)
- [Update Activity Product](apis/update-activity-product.md)
- [Remove Activity Product](apis/remove-activity-product.md)
- [Get Coupon](apis/get-coupon.md)
- [Search Coupons](apis/search-coupons.md)

### Orders
- [Order API overview](apis/order-api-overview.md)
- [Get Order List](apis/get-order-list.md) - With filtering criteria
- [Get Order Detail](apis/get-order-detail.md) - Full order info including status, shipping, payment
- [Get Price Detail](apis/get-price-detail.md) - Pricing calculation with vouchers, tax
- [Add External Order References](apis/add-external-order-references.md) - Sync OMS data
- [Get External Order References](apis/get-external-order-references.md)
- [Search Order By External Order Reference](apis/search-order-by-external-order-reference.md)
- [Update The Blind Box Opening Results](apis/update-the-blind-box-opening-results.md)
- [Get Order Split Attributes](apis/get-order-split-attributes.md)
- [Split Orders](apis/split-orders.md)

### Fulfillment & Shipping
- [Fulfillment API overview](apis/fulfillment-api-overview.md)
- [Get Eligible Shipping Service](apis/get-eligible-shipping-service.md)
- [Create First Mile Bundle](apis/create-first-mile-bundle.md)
- [Create First Mile Bundle(V2)](apis/create-first-mile-bundle-v2.md)
- [Create Packages](apis/create-packages.md) - Ship orders (US and JP only)
- [Search Package](apis/search-package.md)
- [Search Combinable Packages](apis/search-combinable-packages.md)
- [Combine Package](apis/combine-package.md)
- [Uncombine Packages](apis/uncombine-packages.md)
- [Get Package Handover Time Slots](apis/get-package-handover-time-slots.md)
- [Ship Package](apis/ship-package.md)
- [Batch Ship Packages](apis/batch-ship-packages.md)
- [Mark Package As Shipped](apis/mark-package-as-shipped.md)
- [Confirm Package Shipment](apis/confirm-package-shipment.md) - Warehouse service provider
- [Get Package Shipping Document](apis/get-package-shipping-document.md) - Labels and packing slips
- [Get Package Detail](apis/get-package-detail.md) - Handover, tracking, shipping provider
- [Print Label](apis/print-label.md) - Async LRO pattern
- [Get Tracking](apis/get-tracking.md)
- [Get Logistics Tracking](apis/get-logistics-tracking.md) - More detailed than Get Tracking
- [TTS Tracking Validation](apis/tts-tracking-validation.md) - US market only
- [Update Shipping Info](apis/update-shipping-info.md)
- [Update Package Shipping Info](apis/update-package-shipping-info.md)
- [Update Package Delivery Status](apis/update-package-delivery-status.md) - SOF only, SEA region
- [Fulfillment Upload Delivery File](apis/fulfillment-upload-delivery-file.md) - Proof of delivery
- [Fulfillment Upload Delivery Image](apis/fulfillment-upload-delivery-image.md)
- [Upload Invoice](apis/upload-invoice.md) - Brazil market only
- [Upload Shipping Document And Tracking Info](apis/upload-shipping-document-and-tracking-info.md) - Returns
- [Redeem Info Callback](apis/redeem-info-callback.md) - Complete fulfillment

### Logistics & Warehouses
- [Logistic API overview](apis/logistic-api-overview.md)
- [Get Warehouse List](apis/get-warehouse-list.md)
- [Get Global Seller Warehouse](apis/get-global-seller-warehouse.md)
- [Get Warehouse Delivery Options](apis/get-warehouse-delivery-options.md)
- [Get Shipping Providers](apis/get-shipping-providers.md)
- [Get Available Shipping Template](apis/get-available-shipping-template.md)

### FBT (Fulfillment by TikTok)
- [FBT Inbound API — Overview Guide](apis/fbt-inbound-api-overview-guide.md)
- [Get FBT Merchant Onboarded Regions](apis/get-fbt-merchant-onboarded-regions.md)
- [Get FBT Warehouse List](apis/get-fbt-warehouse-list.md)
- [Search FBT Inventory](apis/search-fbt-inventory.md)
- [Search FBT Inventory Record](apis/search-fbt-inventory-record.md)
- [Search Goods Info](apis/search-goods-info.md)
- [Get FBF MCF Order Status](apis/get-fbf-mcf-order-status.md)
- [Cancel FBT MCF Order](apis/cancel-fbt-mcf-order.md)
- [Create FBT MCF Order](apis/create-fbt-mcf-order.md) - Multi-Channel Fulfillment
- [Query Goods Inventory For MCF](apis/query-goods-inventory-for-mcf.md)
- [Get FBT Merchant MCF Status](apis/get-fbt-merchant-mcf-status.md)
- [Create Update Inbound Plan](apis/create-update-inbound-plan.md)
- [List Available Inbound Method](apis/list-available-inbound-method.md)
- [Get Inbound Method Detail](apis/get-inbound-method-detail.md)
- [Update Tracking](apis/update-tracking.md) - Carton-level tracking for inbound
- [Cancel Inbound Order](apis/cancel-inbound-order.md)
- [Get Inbound Order](apis/get-inbound-order.md)
- [Confirm Inbound Method](apis/confirm-inbound-method.md)
- [Ship Inbound Order](apis/ship-inbound-order.md)
- [Update Goods Sku Relation](apis/update-goods-sku-relation.md) - Bind/unbind goods-SKU
- [Create Goods](apis/create-goods.md) - FBT goods
- [Get Hazmat And Expiration Info](apis/get-hazmat-and-expiration-info.md)
- [Update Goods](apis/update-goods.md)

### Returns, Refunds & Cancellations
- [Return, refund, and cancel API overview](apis/return-refund-and-cancel-api-overview.md)
- [Return reasons](apis/return-reasons.md)
- [Refund reasons](apis/refund-reasons.md)
- [Cancel reasons](apis/cancel-reasons.md)
- [Get Reject Reasons](apis/get-reject-reasons.md)
- [Approve Return](apis/approve-return.md)
- [Reject Return](apis/reject-return.md)
- [Get Return Records](apis/get-return-records.md)
- [Approve Cancellation](apis/approve-cancellation.md)
- [Reject Cancellation](apis/reject-cancellation.md)
- [Get Decision Eligibility](apis/get-decision-eligibility.md)
- [Calculate Refund](apis/calculate-refund.md)
- [Cancel Order](apis/cancel-order.md) - Supports partial cancellation in US/UK
- [Create Return](apis/create-return.md) - Seller-initiated
- [Search Cancellations](apis/search-cancellations.md)
- [Search Returns](apis/search-returns.md)
- [Get Aftersale Eligibility](apis/get-aftersale-eligibility.md)
- [Search Aftersales Request](apis/search-aftersales-request.md)
- [Review Aftersales](apis/review-aftersales.md) - Approve/reject/offer alternatives
- [Search Return Merchandise Authorization](apis/search-return-merchandise-authorization.md)

### Finance & Payments
- [Finance API overview](apis/finance-api-overview.md)
- [Get Statements](apis/get-statements.md)
- [Get Withdrawals](apis/get-withdrawals.md)
- [Get Transactions by Order](apis/get-transactions-by-order.md) - SKU-level details
- [Get Transactions by Statement](apis/get-transactions-by-statement.md)
- [Get Unsettled Transactions](apis/get-unsettled-transactions.md)
- [Get Payments](apis/get-payments.md) - Automated payment records

### Analytics & Performance
- [Get Video Performances](apis/get-video-performances.md) - US creator only
- [Get Shop Performance Per Hour](apis/get-shop-performance-per-hour.md)
- [Get Shop LIVE Performance Per Minutes](apis/get-shop-live-performance-per-minutes.md)
- [Get Shop LIVE Products Performance List](apis/get-shop-live-products-performance-list.md)
- [Get Shop Performance](apis/get-shop-performance.md)
- [Get Shop Product Performance Detail](apis/get-shop-product-performance-detail.md)
- [Get Shop SKU Performance](apis/get-shop-sku-performance.md)
- [Get Shop SKU Performance List](apis/get-shop-sku-performance-list.md)
- [Get Shop Video Performance Overview](apis/get-shop-video-performance-overview.md)
- [Get Shop Video Performance Details](apis/get-shop-video-performance-details.md)
- [Get Shop Video Product Performance List](apis/get-shop-video-product-performance-list.md)
- [Get Shop LIVE Performance List](apis/get-shop-live-performance-list.md)
- [Get Shop LIVE Performance Overview](apis/get-shop-live-performance-overview.md)
- [Get View Trend Performances](apis/get-view-trend-performances.md) - Live room viewer trends
- [Get Traffic Performances](apis/get-traffic-performances.md) - Live streaming traffic
- [Get User Portraits](apis/get-user-portraits.md) - Live room user portrait
- [Get Product Stats](apis/get-product-stats.md) - Live room product list
- [Get Interactive Trend Performances](apis/get-interactive-trend-performances.md)
- [Get GMV Trend Performances](apis/get-gmv-trend-performances.md)
- [Get Live Core Stats](apis/get-live-core-stats.md) - GMV and core stats
- [Get Bestselling Products](apis/get-bestselling-products.md) - Top 100
- [Get Bestselling Creators](apis/get-bestselling-creators.md) - Top 100
- [Get Bestselling Videos](apis/get-bestselling-videos.md) - Top 100
- [Get Bestselling LIVEs](apis/get-bestselling-lives.md) - Top 100
- [Get Shop Video Performance List](apis/get-shop-video-performance-list.md)
- [Get Shop Product Performance List](apis/get-shop-product-performance-list.md)
- [Create Compass Offline Export Task](apis/create-compass-offline-export-task.md) - Async export
- [Get Compass Task List](apis/get-compass-task-list.md)
- [Download Compass Task File](apis/download-compass-task-file.md)

### Customer Service
- [Customer Service API overview](apis/customer-service-api-overview.md)
- [Message Types](apis/message-types.md)
- [Post-sales Solutions for Customer Services](apis/post-sales-solutions-for-customer-services.md)
- [Create Conversation](apis/create-conversation.md) - Create/reopen with buyer
- [Get Conversations](apis/get-conversations.md)
- [Get Conversation](apis/get-conversation.md)
- [Get Conversation Messages](apis/get-conversation-messages.md)
- [Upload Buyer Messages Image](apis/upload-buyer-messages-image.md)
- [Read Message](apis/read-message.md) - Mark buyer messages as read
- [Get Agent Settings](apis/get-agent-settings.md)
- [Update Agent Settings](apis/update-agent-settings.md)
- [Get Customer Service Performance](apis/get-customer-service-performance.md)
- [Search Sessions](apis/search-sessions.md)
- [End Session](apis/end-session.md)
- [Send Message](apis/send-message.md)

### Customer Engagement
- [Customer engagement API overview](apis/customer-engagement-api-overview.md) - CRM integration
- [Get Message Templates](apis/get-message-templates.md) - Predefined templates
- [Create Engagement Task](apis/create-engagement-task.md)
- [Send Engagement Message](apis/send-engagement-message.md)
- [Get Task Performances](apis/get-task-performances.md)
- [Create Custom Engagement Task](apis/create-custom-engagement-task.md)
- [Get Feature Permissions](apis/get-feature-permissions.md)

### Affiliate - Creator
- [Affiliate Creator API overview](apis/affiliate-creator-api-overview.md)
- [Get Creator Profile](apis/get-creator-profile.md)
- [Get Showcase Products](apis/get-showcase-products.md) - Up to 2000 products
- [Add Showcase Products](apis/add-showcase-products.md)
- [Remove Showcase Products](apis/remove-showcase-products.md)
- [Top Showcase Products](apis/top-showcase-products.md)
- [Creator Search Open Collaboration Product](apis/creator-search-open-collaboration-product.md)
- [Get Open Collaboration Product List By Product Ids](apis/get-open-collaboration-product-list-by-product-ids.md)
- [Search Creator Target Collaborations](apis/search-creator-target-collaborations.md)
- [Search Creator Sample Applications](apis/search-creator-sample-applications.md)
- [Get Creator Sample Application Detail](apis/get-creator-sample-application-detail.md)
- [Creator Search Sample Application Fulfillments](apis/creator-search-sample-application-fulfillments.md)
- [Creator Generate General Link](apis/creator-generate-general-link.md) - Material sharing links
- [Creator Generate Publisher Link](apis/creator-generate-publisher-link.md)
- [Creator Search Affiliate Trace Orders](apis/creator-search-affiliate-trace-orders.md)
- [Search Creator Affiliate Orders](apis/search-creator-affiliate-orders.md)
- [Get Creator Applicable Sample Label](apis/get-creator-applicable-sample-label.md)
- [Upload Shoppable Video File](apis/upload-shoppable-video-file.md)
- [Get Shop Products](apis/get-shop-products.md) - Creator-bound shop products
- [Get Shoppable Video Status](apis/get-shoppable-video-status.md)
- [Precheck Video Content](apis/precheck-video-content.md) - Violation check
- [Get Shoppable Video Precheck Result](apis/get-shoppable-video-precheck-result.md)
- [Post Shoppable Video](apis/post-shoppable-video.md)

### Affiliate - Partner
- [Affiliate Partner API overview](apis/affiliate-partner-api-overview.md)
- [Create Affiliate Partner Campaign](apis/create-affiliate-partner-campaign.md)
- [Edit Affiliate Partner Campaign](apis/edit-affiliate-partner-campaign.md)
- [Publish Affiliate Partner Campaign](apis/publish-affiliate-partner-campaign.md)
- [Review Affiliate Partner Campaign Product](apis/review-affiliate-partner-campaign-product.md)
- [Generate Affiliate Partner Campaign Product Link](apis/generate-affiliate-partner-campaign-product-link.md)
- [Get Affiliate Partner Campaign Detail](apis/get-affiliate-partner-campaign-detail.md)
- [Get Affiliate Partner Campaign List](apis/get-affiliate-partner-campaign-list.md)
- [Get Affiliate Partner Campaign Product List](apis/get-affiliate-partner-campaign-product-list.md)
- [Get Affiliate Campaign Creator Fulfillment Status List](apis/get-affiliate-campaign-creator-fulfillment-status-list.md)
- [Partner Generate Multi Affiliate Campaign Product Link](apis/partner-generate-multi-affiliate-campaign-product-link.md)
- [Get Affiliate Campaign Creator Fulfillment Status Info](apis/get-affiliate-campaign-creator-fulfillment-status-info.md)
- [Get Affiliate Campaign Creator Product Content Statistics](apis/get-affiliate-campaign-creator-product-content-statistics.md)
- [Get Affiliate Campaign Creator Product Sample Status](apis/get-affiliate-campaign-creator-product-sample-status.md)
- [Search CAP Affiliate Orders](apis/search-cap-affiliate-orders.md) - MCN/CAP orders
- [Search Tap Affiliate Orders](apis/search-tap-affiliate-orders.md)

### Affiliate - Seller
- [Affiliate Seller API overview](apis/affiliate-seller-api-overview.md)
- [Seller Search Creator on Marketplace](apis/seller-search-creator-on-marketplace.md)
- [Get Marketplace Creator Performance](apis/get-marketplace-creator-performance.md) - Last 30 days
- [Get Open Collaboration Settings](apis/get-open-collaboration-settings.md)
- [Edit Open Collaboration Settings](apis/edit-open-collaboration-settings.md)
- [Get Open Collaboration Sample Rules](apis/get-open-collaboration-sample-rules.md)
- [Edit Open Collaboration Sample Rule](apis/edit-open-collaboration-sample-rule.md)
- [Create Open Collaboration](apis/create-open-collaboration.md)
- [Search Open Collaboration](apis/search-open-collaboration.md)
- [Remove Open Collaboration](apis/remove-open-collaboration.md)
- [Get Open Collaboration Creator Content Detail](apis/get-open-collaboration-creator-content-detail.md)
- [Seller Search Affiliate Open Collaboration Product](apis/seller-search-affiliate-open-collaboration-product.md)
- [Remove Creator From Open Collaboration](apis/remove-creator-from-open-collaboration.md)
- [Create Target Collaboration](apis/create-target-collaboration.md)
- [Search Target Collaborations](apis/search-target-collaborations.md)
- [Update Target Collaboration](apis/update-target-collaboration.md)
- [Remove Target Collaboration](apis/remove-target-collaboration.md)
- [Query Target Collaboration Detail](apis/query-target-collaboration-detail.md)
- [Check Target Collaboration Conflicts](apis/check-target-collaboration-conflicts.md)
- [Cancel Target Collaboration Conflicts](apis/cancel-target-collaboration-conflicts.md)
- [Generate Target Collaboration Link](apis/generate-target-collaboration-link.md)
- [Generate Affiliate Product Promotion Link](apis/generate-affiliate-product-promotion-link.md)
- [Seller Get Sample Request Deeplink](apis/seller-get-sample-request-deeplink.md)
- [Search Seller Affiliate Orders](apis/search-seller-affiliate-orders.md)
- [Get Seller Search Creator Marketplace Advanced Filters](apis/get-seller-search-creator-marketplace-advanced-filters.md)

### Seller Messaging (IM)
- [Get Conversation List](apis/get-conversation-list.md) - Seller-creator conversations
- [Get Message in the Conversation](apis/get-message-in-the-conversation.md)
- [Get Latest Unread Messages](apis/get-latest-unread-messages.md)
- [Create Conversation with creator](apis/create-conversation-with-creator.md)
- [Upload Message Image](apis/upload-message-image.md)
- [Send IM Message](apis/send-im-message.md)
- [Mark Conversation Read](apis/mark-conversation-read.md)

### Sample Management
- [Seller Search Sample Applications](apis/seller-search-sample-applications.md)
- [Seller Review Sample Applications](apis/seller-review-sample-applications.md) - Approve/reject
- [Seller Search Sample Applications Fulfillments](apis/seller-search-sample-applications-fulfillments.md)
