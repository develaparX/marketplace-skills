# TikTok Shop API: Create Goods

# Implement Create Goods API (FBT)

### 1. Purpose
Create goods in Fulfilled by TikTok (FBT) warehouse. Use to register new inventory items.

### 2. Endpoint
* **Method:** `POST`
* **URL:** `https://open-api.tiktokglobalshop.com/fbt/202603/goods/create_goods`

### 3. Headers & Auth
#### Headers
* `content-type`: `application/json`
* `x-tts-access-token`: Seller access token (user_type = 0).

#### Query Parameters
* `app_key` (string, required): Unique developer app key.
* `sign` (string, required): Request signature. Generate via TTS algorithm.
* `timestamp` (number, required): Unix timestamp (UTC).
* `shop_cipher` (string, required): Shop identifier. Get via Get Authorization Shop API.

### 4. Parameters
#### Request Body (JSON)
* `create_goods_dto_list` (array, required): List of goods to create.
  * `tts_sku_id` (string, required): TikTok Shop SKU ID.
  * `create_goods_type` (string, required): Action type. Example: `CREATE_AND_BIND`.
  * `goods_name` (string, required): Name of goods.
  * `goods_image_url` (string, required): Image URL.
  * `reference_code` (string, required): Seller SKU reference.
  * `barcode_infos` (array, required): Barcode details.
    * `barcode_type` (string, required): Code type. Example: `UPC`.
    * `barcode_value` (string, required): Barcode number.
  * `return_handling_method` (string, required): Return policy. Example: `COLLECT_RETURN_UNITS`.
  * `dimension_and_weight_base_info` (object, required): Package size and weight.
    * `weight_value` (string, required): Weight.
    * `length_value` (string, required): Length.

### 5. Response Structure
* `code` (number): Status code. `0` means API call succeeded.
* `message` (string): Error or success message.
* `request_id` (string): Log identifier.
* `data` (object): Result payload.
  * `create_result_info` (object): Container.
    * `create_result_list` (array): Results per item.
      * `tts_sku_id` (string): SKU ID.
      * `is_success` (boolean): Creation status.
      * `tts_goods_id` (string): Created goods ID.
      * `fail_reason` (string): Error details if failed.

### 6. Error Handling
* Check `code` first. Non-zero means API call failed. Read `message` for details.
* Check `is_success` in `create_result_list`. Individual items can fail. Read `fail_reason` if `is_success` is false.

### 7. Pitfalls & Best Practices
* **Shop Cipher:** Cross-border shops require correct `shop_cipher`. Wrong cipher causes incorrect response.
* **Signature:** Generate signature (`sign`) correctly. Match TTS algorithm.
* **Timestamp:** Use UTC timestamp. Out-of-sync clock rejects request.

### 8. Code Example
```bash
curl -X POST \
  'https://open-api.tiktokglobalshop.com/fbt/202603/goods/create_goods?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664&shop_cipher=GCP_XF90igAAAABh00qsWgtvOiGFNqyubMt3' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: application/json' \
  -d '{
    "create_goods_dto_list": [
      {
        "tts_sku_id": "723456789012345678",
        "create_goods_type": "CREATE_AND_BIND",
        "goods_name": "ABC",
        "goods_image_url": "https://img0.baidu.com/it/u=3591665277,2616537962&fm=253&app=138&f=JPEG?w=800&h=1333",
        "reference_code": "ABDK999d",
        "barcode_infos": [
          {
            "barcode_type": "UPC",
            "barcode_value": "698888200121"
          }
        ],
        "return_handling_method": "COLLECT_RETURN_UNITS",
        "

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /fbt/202603/goods/create_goods`*
