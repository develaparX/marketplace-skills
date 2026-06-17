# TikTok Shop API: Common mistakes

# Sales Attributes Validation API

## 1. Purpose
API validates SKU sales attributes. Use during product creation or update. Prevents duplicate attributes in SKU. Prevents duplicate attribute combinations across SKUs.

## 2. Endpoint
*   **Method**: `POST`
*   **Path**: `/`

## 3. Headers
*   `Content-Type: application/json`
*   `Authorization: Bearer <token>`

## 4. Parameters
Request body JSON:

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `skus` | Array | List of SKUs to validate. |
| `skus[].sales_attributes` | Array | List of attributes for SKU. |
| `skus[].sales_attributes[].name` | String | Attribute name (e.g., "Color"). |
| `skus[].sales_attributes[].value_name` | String | Attribute value (e.g., "Red"). |

## 5. Response
*   **Success**: `200 OK`
```json
{
  "status": "success"
}
```

## 6. Error Handling
*   **Validation Failure**: `400 Bad Request`
```json
{
  "error": "VALIDATION_FAILED",
  "message": "Duplicate attributes detected."
}
```

## 7. Pitfalls & Best Practices

### Pitfall 1: Duplicate attributes in one SKU
SKU contains same attribute name multiple times.
*   **Bad**: SKU has `Color: Red` and `Color: Blue`.
*   **Fix**: Split to separate SKUs, or use unique names (e.g., `Outer Color`, `Inner Color`).

### Pitfall 2: Duplicate attribute values across SKUs
Multiple SKUs have identical attribute combinations.
*   **Bad**: SKU 1 has `Color: Red`, SKU 2 has `Color: Red`.
*   **Fix**: Ensure unique combination per SKU.

## 8. Code Example

```bash
curl -X POST https://api.example.com/ \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer API_KEY" \
  -d '{
    "skus": [
      {
        "sales_attributes": [
          {
            "name": "Color",
            "value_name": "Red"
          }
        ]
      },
      {
        "sales_attributes": [
          {
            "name": "Color",
            "value_name": "Blue"
          }
        ]
      }
    ]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
