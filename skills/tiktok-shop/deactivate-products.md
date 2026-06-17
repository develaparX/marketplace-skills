# TikTok Shop API: Deactivate Products

# Deactivate Products API Guide

## 1. Overview
API deactivate active products. Hide items from buyers. Status change to `Seller_deactivated`. Use to pause sales.

## 2. Endpoint
* **Method:** `POST`
* **Path:** `/product/202309/products/deactivate`

## 3. Auth & Headers
* **Scope:** `seller.product.basic`
* **Headers:**
  * `Authorization: Bearer <token>`
  * `Content-Type: application/json`

## 4. Request Parameters
API schema list no parameters. Error codes imply body require product IDs.
* **Body (JSON):**
  * `product_ids` (array of strings): Product IDs to deactivate.

## 5. Response Structure
JSON object:
* `code` (int): Success/failure code.
* `message` (string): Status message.
* `request_id` (string): Log ID.
* `data` (object): Return details.

## 6. Error Codes
* `12019120`: Too many product IDs.
* `12052032`: Product not exist.
* `12052048`: No permission / wrong shop.
* `12052330`: Platform not supported.
* `12052332`: Seller center locked.
* `12052371`: Auction bidding active.
* `12052700`: Seller inactive.
* `12052703`: Invalid tax number.
* `12052901`: Invalid product status.
* `36009003`: Internal error. Retry.

## 7. Pitfalls & Best Practices
* **Status check:** Only deactivate `Activate` products. Other status trigger error `12052901`.
* **Batch limit:** Keep product list small. Avoid error `12019120`.
* **Shop lock:** Do not call during integration lock. Only price/stock edits allowed then.

## 8. Code Example
```bash
curl -X POST "https://api.example.com/product/202309/products/deactivate" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product_ids": ["12345", "67890"]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /product/202309/products/deactivate`*
