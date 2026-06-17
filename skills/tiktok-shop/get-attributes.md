# TikTok Shop API: Get Attributes

# Get Attributes API Implementation Guide

## 1. Overview
API fetch product attributes. Use before list product. Need leaf category ID.

## 2. Endpoint
*   **Method:** `GET`
*   **Path:** `/product/202309/categories/{category_id}/attributes`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from auth flow (user_type = 0).

## 4. Parameters
### Path Parameters
*   `category_id` (string, required): Leaf category ID.

### Query Parameters
*   `app_key` (string, required): App developer key.
*   `sign` (string, required): Request signature.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).
*   `shop_cipher` (string, required): Shop identifier.
*   `locale` (string, optional): BCP-47 locale code.
*   `category_version` (string, optional): Category tree version.

## 5. Response Structure
Response return JSON. Key fields:
*   `code` (number): Status code. `0` mean success.
*   `message` (string): Status message.
*   `request_id` (string): Log ID.
*   `data` (object): Contain `attributes` array.
    *   `id` (string): Attribute ID.
    *   `name` (string): Attribute name.
    *   `type` (string): Attribute type (e.g., `PRODUCT_PROPERTY`).
    *   `is_requried` (boolean): Required flag. Note spelling: `is_requried`.
    *   `values` (array): Predefined values.
    *   `value_data_format` (string): Format constraint.
    *   `is_customizable` (boolean): Allow custom value.
    *   `requirement_conditions` (array): Condition rules.

## 6. Error Handling
Handle these API error codes:
*   `12052023`: Category not exist. Check ID.
*   `12052024`:

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202309/categories/{category_id}/attributes`*
