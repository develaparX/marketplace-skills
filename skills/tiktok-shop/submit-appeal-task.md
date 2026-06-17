# TikTok Shop API: Submit Appeal Task

# Submit Appeal Task API

### 1. Purpose
Submit appeal for rejected product size chart. Use when system flags size chart incorrectly.

### 2. Endpoint
*   **Method:** `POST`
*   **Path:** `/`

### 3. Headers
*   `Authorization: Bearer <TOKEN>`
*   `Content-Type: application/json`

### 4. Payload Parameters
JSON body:
*   `product_id` (Integer): Target product identifier.
*   `appeal_message` (Object): Appeal details.
    *   `field_name` (String): Target field. Value: `APPEAL_MESSAGE_FIELD_SIZE_CHART`.
    *   `indicator_details` (Array): Validation indicators.
        *   `indicator_type` (String): Violation type. Example: `CONTAINS_ALL_SALE_PROPERTY`.
    *   `size_chart_id` (String): Size chart identifier.
    *   `size_chart_image_uri` (String): Image path in storage.

### 5. Response
Returns task status.
```json
{
  "task_id": "string",
  "status": "SUBMITTED"
}
```

### 6. Errors
*   `400 Bad Request`: Invalid image URI or missing product ID.
*   `401 Unauthorized`: Token expired or missing.
*   `404 Not Found`: Product ID does not exist.

### 7. Pitfalls & Best Practices
*   Upload image to storage first. Get URI before calling API.
*   Check `product_id` exists. Avoid failed tasks.

### 8. Example (cURL)
```bash
curl -X POST https://api.example.com/ \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "product_id": 1729532326804361700,
    "appeal_message": {
      "field_name": "APPEAL_MESSAGE_FIELD_SIZE_CHART",
      "indicator_details": [
        {
          "indicator_type": "CONTAINS_ALL_SALE_PROPERTY"
        }
      ],
      "size_chart_id": "7597302357391361806",
      "size_chart_image_uri": "tos-alisg-i-aphluv4xwc-sg/ebf6d1b2204a4aa883abb0befb6fee50"
    }
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
