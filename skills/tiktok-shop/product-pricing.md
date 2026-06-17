# TikTok Shop API: Product pricing

# Product Pricing API Implementation Guide

## 1. Purpose
API fetches product pricing rules, tiers, discounts. Use to show product price, calculate cart cost.

## 2. Endpoint & HTTP Method
* **Method:** `GET`
* **Path:** `/v1/products/{product_id}/pricing`

## 3. Headers & Authentication
* `Authorization: Bearer <token>` (Required. Bearer token.)
* `Accept: application/json`

## 4. Parameters
### Path Parameters
* `product_id` (string, required): Product identifier.

### Query Parameters
* `currency` (string, optional): ISO 4217 code. Default `USD`.
* `quantity` (integer, optional): Item count for tier discount. Default `1`.

## 5. Response Structure
Response body (JSON):
```json
{
  "product_id": "prod_123",
  "base_price": 99.99,
  "currency": "USD",
  "tiers": [
    {
      "min_quantity": 10,
      "price": 89.99
    }
  ],
  "discounts": [
    {
      "id": "disc_abc",
      "amount": 10.00,
      "type": "flat"
    }
  ]
}
```

## 6. Error Handling
* `401 Unauthorized`: Token invalid or expired.
* `404 Not Found`: Product ID does not exist.
* `422 Unprocessable Entity`: Invalid query parameters.

## 7. Pitfalls & Best Practices
* Cache response. Price database queries slow down page load.
* Never trust client-side price calculation. Re-verify price on backend during checkout.

## 8. Code Example
```bash
curl -X GET "https://api.example.com/v1/products/prod_123/pricing?currency=USD&quantity=5" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `null null`*
