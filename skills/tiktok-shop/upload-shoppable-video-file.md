# TikTok Shop API: Upload Shoppable Video File

# Guide: Upload Shoppable Video File

## Purpose
Upload video file to TikTok. Use before posting shoppable video.

## Endpoint
*   Method: `POST`
*   URL: `https://open-api.tiktokglobalshop.com/affiliate_creator/202505/videos/video_files`

## Headers & Auth
*   `content-type`: `multipart/form-data`
*   `x-tts-access-token`: Creator access token (user_type = 1).

## Parameters

### Query Parameters
*   `app_key` (string, required): Unique app key.
*   `sign` (string, required): Signature from generator algorithm.
*   `timestamp` (number, required): Unix timestamp GMT (UTC+00:00).

### Body Parameters (Multipart)
*   `data` (file, required): Video file.
    *   Formats: MP4, MOV, MKV, WMV, WEBM, AVI, 3GP, FLV, MPEG.
    *   Max size: 100 MB.
    *   Aspect ratio: 9:16 to 16:9.

## Response Structure
```json
{
  "code": 0,
  "data": {
    "video_file": {
      "id": "string",
      "md5": "string"
    }
  },
  "message": "string",
  "request_id": "string"
}
```
*   `code`: Status code (0 = success).
*   `message`: Status message.
*   `request_id`: Log ID.
*   `data.video_file.id`: Video ID.
*   `data.video_file.md5`: MD5 hash.

## Error Handling
Check `code` field. If `code` not `0`, request failed. Save `request_id` for debugging.

## Pitfalls & Best Practices
*   File size: Keep under 100 MB. Compress if too big.
*   Aspect ratio: Keep between 9:16 and 16:9. Reject invalid files early.
*   Token: Use creator token. App token fails.
*   Signature: Generate signature with correct query params.

## Example Request
```bash
curl -X POST 'https://open-api.tiktokglobalshop.com/affiliate_creator/202505/videos/video_files?app_key=38abcd&sign=5361235029d141222525e303d742f9e38aea052d10896d3197ab9d6233730b8c&timestamp=1623812664' \
  -H 'x-tts-access-token: TTP_pwSm2AAAAABmmtFz1xlyKMnwg74T2GJ5s0uQbS8jPjb_GkdFVCxPqzQXSyuyfXdQa0AqyDsea2tYFNVf4XeqgZHFfPyv0Vs659QqyLYfsGzanZ5XZAin3_ZkcIxxS0_In6u6XDeU96k' \
  -H 'content-type: multipart/form-data' \
  -F 'data=@"file"'
```

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `POST /affiliate_creator/202505/videos/video_files`*
