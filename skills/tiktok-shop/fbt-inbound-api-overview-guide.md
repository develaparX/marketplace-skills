# TikTok Shop API: FBT Inbound API — Overview Guide

# FBT Inbound API Implementation Guide

## 1. Purpose & Use Cases
Use this API to prepare inventory for Fulfillment by TikTok (FBT). 
*   **When to use**: Registering new goods, linking goods to TikTok Shop SKUs, routing inventory to warehouses.
*   **Supported Workflows**: Carton Splitting, Unit Splitting.

---

## 2. Endpoints & Sequence
API uses sequence of POST requests. 

| Step | Action | Method | Path (Relative) | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| 1 | Get Hazmat & Expiration Info | `POST` | `/hazmat/check` | Check hazmat/expiry rules |
| 2 | Create Goods | `POST` | `/goods/create` | Create FBT goods, bind to SKU |
| 3 | Update Goods | `POST` | `/goods/update` | Edit goods record |
| 4 | Update Goods SKU Relation | `POST` | `/goods/sku/relation` | Bind/unbind FBT goods to Shop SKU |

---

## 3. Headers & Authentication
OAuth scope required: `seller.fbt.inbound`

```http
Content-Type: application/json
x-tts-access-token: <seller_access_token>
```

---

## 4. Parameters

### Key Fields
*   `tt_sku_id` (string, required): TikTok Shop SKU ID.
*   `tts_goods_id` (string, required for updates): FBT Goods ID.
*   `create_goods_type` (string): Set to `CREATE_AND_BIND`.
*   `operation_type` (string): Set to `BIND` or `UN_BIND`.

### Special Handling Fields
*   **Hazmat**: If `is_hazmat` is `true`, must provide `hazmat_info`.
*   **Battery**: If item contains battery, must provide:
    *   Battery type
    *   Capacity
    *   Packaging type
    *   UN code

---

## 5. Warehouse Routing Rules
Route inventory based on destination warehouse type:
*   **HUB**: Inbound processing and sorting only. No order fulfillment.
*   **FC (Fulfillment Center)**: Receives inventory and fulfills customer orders.

---

## 6. Response Structures

### Step 1: Hazmat & Expiration Check Response
```json
{
  "is_hazmat": true,
  "shelf_life_rules": {
    "min_remaining_days": 90
  }
}
```

### Step 2: Create Goods Response
```json
{
  "tts_goods_id": "goods_123456"
}
```

### Step 3 & 4: Update / Relation Response
```json
{
  "status": "success"
}
```

---

## 7. Pitfalls & Best Practices
*   **Battery Details**: Missing UN code or capacity blocks goods creation.
*   **Warehouse Mixup**: Do not send fulfillment orders to HUB warehouses. HUB only accepts inbound sorting.
*   **Binding**: Always set `create_goods_type` to `CREATE_AND_BIND` during creation to link SKU immediately.

---

## 8. Code Example (cURL)

### Step 1: Check Hazmat
```bash
curl -X POST https://api.tiktokshop.com/hazmat/check \
  -H "Content-Type: application/json" \
  -H "x-tts-access-token: YOUR_ACCESS_TOKEN" \
  -d '{
    "tt_sku_id": "sku_998877"
  }'
```

### Step 2: Create and Bind Goods
```bash
curl -X POST https://api.tiktokshop.com/goods/create \
  -H "Content-Type: application/json" \
  -H "x-tts-access-token: YOUR_ACCESS_TOKEN" \
  -d '{
    "tt_sku_id": "sku_998877",
    "create_goods_type": "CREATE_AND_BIND",
    "is_hazmat": false
  }'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
