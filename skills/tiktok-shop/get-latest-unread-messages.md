# TikTok Shop API: Get Latest Unread Messages

# Get Latest Unread Messages API Implementation Guide

## 1. Overview
API fetch unread messages from last 60 seconds. Use for real-time chat updates.

## 2. Endpoint
*   Method: `GET`
*   URL: `https://open-api.tiktokglobalshop.com/affiliate_seller/202412/conversations/messages/list/newest`

## 3. Headers & Auth
*   `content-type`: `application/json`
*   `x-tts-access-token`: Seller access token. Get from auth flow (user_type = 0).

## 4. Query Parameters
*   `app_key` (string, required): Unique app key.
*   `timestamp` (number, required):

---
*Auto-generated from TikTok Shop Partner Center documentation*
*Endpoint: `GET /affiliate_seller/202412/conversations/messages/list/newest`*
