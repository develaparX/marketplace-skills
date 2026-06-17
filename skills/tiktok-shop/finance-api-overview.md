# TikTok Shop API: Finance API overview

# Financial Reconciliation API Implementation Guide

## 1. Purpose
API syncs financial data. Use to reconcile bank deposits, track order fees, audit statements.

*   **Statements**: Daily settlement records.
*   **Payments**: Bank transfer status.
*   **Transactions**: Order-level and SKU-level fee details.
*   **Unsettled**: Real-time pending fees.

---

## 2. Endpoints

| Method | Path | Description |
| :--- | :--- | :--- |
| `GET` | `/docv2/page/get-statements-202309` | Get daily statements by date range. |
| `GET` | `/docv2/page/get-payments-202309` | Get payments for bank reconciliation. |
| `GET` | `/docv2/page/get-transactions-by-statement-202501` | Get orders in statement. |
| `GET` | `/docv2/page/get-transactions-by-order-202501` | Get SKU-level details for order. |
| `GET` | `/docv2/page/get-unsettled-transactions-202507` | Get pending fees for orders/adjustments. |

---

## 3. Authentication & Headers
All requests require headers:

```http
Authorization: Bearer <ACCESS_TOKEN>
Accept: application/json
```

---

## 4. Parameters

### Get Statements
*   `start_date` (string, ISO 8601 YYYY-MM-DD, Required): Start range.
*   `end_date` (string, ISO 8601 YYYY-MM-DD, Required): End range.
*   `payment_status` (string, Optional): Filter by status (e.g., `PAID`, `UNPAID`).

### Get Payments
*   `start_date` (string, ISO 8601 YYYY-MM-DD, Required): Start range.
*   `end_date` (string, ISO 8601 YYYY-MM-DD, Required): End range.

### Get Transactions by Statement
*   `statement_id` (string, Required): Target statement identifier.
*   `page_token` (string, Optional): Pagination token.

### Get Transactions by Order
*   `order_id` (string, Required): Target order identifier.

### Get Unsettled Transactions
*   `order_ids` (array of strings, Optional): Filter by order IDs.
*   `adjustment_ids` (array of strings, Optional): Filter by adjustment IDs.

---

## 5. Response Structure

### Statement Response
```json
{
  "statements": [
    {
      "statement_id": "ST-99281",
      "date": "2023-09-15",
      "amount": 1250.50,
      "currency": "USD",
      "payment_status": "PAID"
    }
  ]
}
```

### SKU Transaction Response
```json
{
  "order_id": "ORD-4412",
  "transactions": [
    {
      "sku": "SKU-ITEM-A",
      "transaction_type": "PRINCIPAL",
      "amount": 29.99,
      "fee": -4.50
    }
  ]
}
```

---

## 6. Error Handling

Standard HTTP status codes return on failure. Follow this sequence to handle errors:

1. **400 Bad Request**: Validate parameter formats (e.g., ISO 8601 date format).
2. **401 Unauthorized**: Refresh access token. Check authorization header format.
3. **403 Forbidden**: Verify API client permissions for financial data.
4. **429 Too Many Requests**: Read `Retry-After` header. Pause requests, then retry with exponential backoff.
5. **500/503 Server Error**: Wait 5 seconds. Retry request.

---

## 7. Pitfalls & Best Practices
*   **Timezones**: API uses UTC. Convert local time to UTC before query to avoid missing data.
*   **Unsettled Data**: Unsettled transactions change until statement closes. Do not cache unsettled data permanently.
*   **Pagination**: Statement transaction lists can be large. Always check for `next_page_token` in response.

---

## 8. Code Examples

### Get Statements
```bash
curl -X GET "https://api.service.com/docv2/page/get-statements-202309?start_date=2023-09-01&end_date=2023-09-30" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Accept: application/json"
```

### Get Transactions by Order
```bash
curl -X GET "https://api.service.com/docv2/page/get-transactions-by-order-202501?order_id=ORD-100293" \
  -H "Authorization: Bearer ACCESS_TOKEN" \
  -H "Accept: application/json"
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `UNKNOWN /`*
