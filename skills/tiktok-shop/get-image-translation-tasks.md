# TikTok Shop API: Get Image Translation Tasks

# Image Translation Task Status API

## 1. Purpose
Check status of image translation. Get translated image URLs. Use after submit translation job.

## 2. Endpoint
*   **Method**: `GET`
*   **Path**: `/product/202506/images/translation_tasks`

## 3. Auth & Headers
*   `Authorization`: `Bearer <token>` (Required. API key.)
*   `Accept`: `application/json`

## 4. Parameters
Query parameters:
*   `task_ids` (string, required): Comma-separated list of task IDs. Max 50 IDs.

## 5. Response
Status `200 OK` JSON:
```json
{
  "tasks": [
    {
      "task_id": "task_123",
      "status": "COMPLETED",
      "original_image_url": "https://example.com/orig.jpg",
      "translated_image_url": "https://example.com/trans.jpg",
      "error": null
    }
  ]
}
```
Status values: `PENDING`, `PROCESSING`, `COMPLETED`, `FAILED`.

## 6. Errors
*   `400 Bad Request`: Missing `task_ids` or too many IDs.
*   `401 Unauthorized`: Bad token.
*   `404 Not Found`: Task ID not exist.

## 7. Pitfalls & Best Practices
*   **Rate limit**: Do not poll fast. Wait 2 seconds between checks. Use exponential backoff.
*   **Batching**: Query multiple IDs in one call. Do not call API for each ID.

## 8. Code Example
```bash
curl -X GET "https://api.example.com/product/202506/images/translation_tasks?task_ids=task_123,task_456" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /product/202506/images/translation_tasks`*
