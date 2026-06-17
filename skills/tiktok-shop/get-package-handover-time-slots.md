# TikTok Shop API: Get Package Handover Time Slots

# Package Handover Time Slots API

## 1. Purpose
Fetch available time slots for package handover. Use during checkout or scheduling flow.

## 2. Endpoint
*   **Method:** `GET`
*   **Path:** `/`

## 3. Headers & Authentication
*   `Authorization: Bearer <token>` (Required)
*   `Accept: application/json`

## 4. Query Parameters
*   `date` (String, Required): Format `YYYY-MM-DD`. Target day for slots.
*   `location_id` (String, Required): UUID of handover location.
*   `timezone` (String, Optional): IANA timezone (e.g., `America/New_York`). Default `UTC`.

## 5. Response Structure
Returns JSON array of slot objects.

```json
[
  {
    "slot_id": "slot_98234",
    "start_time": "2023-10-27T09:00:00Z",
    "end_time": "2023-10-27T10:00:00Z",
    "available": true
  }
]
```

## 6. Error Handling
*   `400 Bad Request`: Invalid date format or missing location.
*   `401 Unauthorized`: Invalid token.
*   `422 Unprocessable Entity`: Location closed on target date.

## 7. Pitfalls & Best Practices
*   **Race conditions:** Slot status changes fast. Hold slot temporarily when user selects.
*   **Timezones:** Always return ISO 8601 UTC times. Convert on client side.
*   **Caching:** Cache list for 1-5 minutes. Reduce DB load.

## 8. Code Example
```bash
curl -X GET "https://api.example.com/v1/handover-slots?date=2023-10-27&location_id=loc_123" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Accept: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /`*
