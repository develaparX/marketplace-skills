# TikTok Shop API: Update Target Collaboration

# Update Target Collaboration API Guide

## 1. Purpose
Update standard target collaboration. Use to modify existing affiliate target collaboration settings.

## 2. Endpoint
* **Method:** `PUT`
* **Path:** `/affiliate_seller/202508/target_collaborations/{target_collaboration_id}`

## 3. Authentication & Headers
* **Scope:** `seller.affiliate_collaboration.write`
* **Headers:**
  * `Authorization: Bearer <ACCESS_TOKEN>`
  * `Content-Type: application/json`

## 4. Parameters
### Path Parameters
* `target_collaboration_id` (string, required): ID of target collaboration to update.

### Body Parameters
* None.

## 5. Response Structure
Returns JSON object:
* `code` (int): Status code.
* `message` (string): Status message.
* `request_id` (string): Request log ID.
* `data` (object): Return data.

## 6. Error Handling
* `400 Bad Request`: Invalid payload.
* `401 Unauthorized`: Missing or invalid token.
* `403 Forbidden`: Missing scope `seller.affiliate_collaboration.write`.
* `404 Not Found`: `target_collaboration_id` not found.

## 7. Pitfalls & Best Practices
* Verify `target_collaboration_id` exists before call.
* Ensure token has write scope.
* Store `request_id` for debugging.

## 8. Code Example
```bash
curl -X PUT "https://api-gateway.domain/affiliate_seller/202508/target_collaborations/COLLAB_ID_123" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Content-Type: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `PUT /affiliate_seller/202508/target_collaborations/{target_collaboration_id}`*
