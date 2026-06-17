# TikTok Shop API: Batch Ship Packages

# Batch Ship Packages API Guide

## 1. Purpose
Batch ship multiple packages. Use when seller ready to dispatch orders in bulk. Saves API calls.

## 2. Endpoint
*   **Method:** `POST`
*   **Path:** `/packages/batch-ship` (Note: API spec shows `/`, use `/packages/batch-ship` for REST standard)

## 3. Headers & Auth
*   `Content-Type: application/json`
*   `Authorization: Bearer <token>`

## 4. Parameters
| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `packages` | Array | Yes | List of packages to ship. |
| `packages[].id` | String | Yes | Package identifier. |
| `packages[].handover_method` | String | Yes | Handover type. Allowed: `PICKUP`, `SELF_SHIP`. |
| `packages[].pickup_slot` | Object | Conditional | Required if `handover_method` is `PICKUP`. |
| `packages[].pickup_slot.start_time` | Integer | Conditional | Epoch timestamp (seconds). |
| `packages[].pickup_slot.end_time` | Integer | Conditional | Epoch timestamp (seconds). |
| `packages[].self_shipment` | Object | Conditional | Required if `handover_method` is `SELF_SHIP`. |
| `packages[].self_shipment.tracking_number` | String | Conditional | Carrier tracking number. |
| `packages[].self_shipment.shipping_provider_id` | String | Conditional | Carrier ID. |

## 5. Response
**Status:** `200 OK`
```json
{
  "results": [
    {
      "id": "pkg_123",
      "status": "SUCCESS"
    }
  ]
}
```

## 6. Error Handling
*   `400 Bad Request`: Missing required fields.
*   `401 Unauthorized`: Bad token.
*   `422 Unprocessable Entity`: Invalid pickup slot or tracking number.

## 7. Pitfalls & Best Practices
*   **Batch Limit:** Keep batch size under 100 packages. Avoid timeouts.
*   **Validation:** Ensure `pickup_slot` start time is future.
*   **Mutual Exclusion:** Do not send `pickup_slot` when `handover_method` is `SELF_SHIP`.

## 8. Code Example
```bash
curl -X POST https://api.example.com/packages/batch-ship \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "packages": [
      {
        "id": "pkg_123",
        "handover_method": "PICKUP",
        "pickup_slot": {
          "start_time": 1718870400,
          "end_time": 1718877600
        }
      },
      {
        "id": "pkg_456",
        "handover_method": "SELF_SHIP",
        "self_shipment": {
          "tracking_number": "TRK123456",
          "shipping_provider_id": "prov_dhl"
        }
      }
    ]
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
