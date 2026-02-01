# reCAPTCHA v3 Verification Guide

## ✅ What to Expect

**reCAPTCHA v3 is INVISIBLE** - you will NOT see:
- ❌ No checkbox to click
- ❌ No "I'm not a robot" challenge
- ❌ No image selection puzzle

**What you WILL see:**
- ✅ Small reCAPTCHA badge in bottom-right corner (Google logo)
- ✅ "This site is protected by reCAPTCHA" text below the form
- ✅ Console logs when submitting the form

---

## 🧪 How to Verify It's Working

### Method 1: Check Browser Console (Chrome DevTools)

1. **Open Developer Console**:
   - Press `F12` or `Cmd+Option+I` (Mac) or `Ctrl+Shift+I` (Windows)
   - Go to **Console** tab

2. **Fill the form and click "Join Now"**

3. **Look for this log**:
   ```
   ✅ reCAPTCHA token received
   ```

4. **Check Network tab**:
   - Go to **Network** tab
   - Submit the form
   - Look for a request to `/login`
   - Click it → **Payload** tab
   - You should see `recaptchaToken: "03AGdBq2..."` (a long token)

### Method 2: Check the reCAPTCHA Badge

1. **Look at the bottom-right corner** of your webpage
2. You should see a small **reCAPTCHA badge** (Google logo)
3. It might say "protected by reCAPTCHA"

### Method 3: Test Rate Limiting

1. Fill the form and submit **6 times in a row**
2. On the **6th submission**, you should see:
   ```
   ⚠️ Too many registration attempts. Please try again after 1 hour.
   ```
3. This confirms the backend is receiving the token

---

## 🔍 Troubleshooting

### If you see: "Invalid site key or not loaded"

**Cause**: The reCAPTCHA site key is invalid or not configured for your domain

**Fix**:
1. Go to https://www.google.com/recaptcha/admin
2. Check your reCAPTCHA v3 site settings
3. Add these domains:
   - `localhost` (for local testing)
   - `ccpc-cuj.web.app` (your production domain)
   - `ccpccuj-mem-reg-2026.hf.space` (your backend domain)

4. Copy the **Site Key** and update `.env`:
   ```env
   REACT_APP_RECAPTCHA_SITE_KEY=your_new_site_key_here
   ```

5. Restart your app: `npm start`

### If you DON'T see the console log "✅ reCAPTCHA token received"

1. Check if the script loaded:
   - Console → Type: `window.grecaptcha`
   - Should show: `{ready: ƒ, execute: ƒ, render: ƒ}`
   - If `undefined`, the script didn't load

2. Check for errors in Console tab

3. Verify `.env` has the site key:
   ```bash
   cat .env | grep RECAPTCHA
   ```

### Current Site Key Check

Your current key: `6Ldj8FwsAAAAAONXMbisPGox55ZSag9ZiBeJ7Va1`

**Verify this key at**: https://www.google.com/recaptcha/admin

---

## 📋 Quick Test Checklist

- [ ] Form loads without errors
- [ ] Console shows "✅ reCAPTCHA token received" when submitting
- [ ] Network request includes `recaptchaToken` in payload
- [ ] reCAPTCHA badge visible in bottom-right corner
- [ ] 6th submission shows rate limit error
- [ ] No "Invalid site key" errors

---

## 🎯 Expected User Experience

**For Normal Users:**
1. Fill the form normally
2. Click "Join Now"
3. See success message immediately (if valid)
4. **No CAPTCHA challenges or interruptions**

**For Bots/Suspicious Behavior:**
1. Backend detects low reCAPTCHA score
2. User sees: "❌ Bot detection triggered. Please try again."
3. Legitimate users can retry

**For Rate Limit Exceeded:**
1. After 5+ submissions in 1 hour
2. User sees: "⚠️ Too many registration attempts. Please try again after 1 hour."

---

## 🔐 Security Notes

- **Site Key** (frontend): Safe to expose in code - it's public
- **Secret Key** (backend): Must be kept secret in backend `.env`
- reCAPTCHA v3 scores range from 0.0 (bot) to 1.0 (human)
- Backend threshold is typically 0.5 (adjust in backend if needed)
