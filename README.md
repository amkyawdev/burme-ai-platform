# Burme AI Platform

## Features

- 🎯 **SRT ဘာသာပြန်ဆိုခြင်း** - YouTube ဗီဒီယိုများ၏ subtitle များကို မြန်မာလို SRT ဖိုင်အဖြစ် ပြောင်းလဲခြင်း
- 🔊 **Burmese TTS** - မြန်မာစာသားများကို အသံအဖြစ် ပြောင်းလဲခြင်း
- 📄 **SRT Explore** - YouTube လင့်တစ်ခုပေးရုံဖြင့် SRT ဖိုင်ရယူခြင်း

## API Keys Required

1. **ElevenLabs API Key** - TTS အတွက်
2. **YouTube API Key** - YouTube data ရယူရန်
3. **Gemini API Key** - ဘာသာပြန်ဆိုရန်

## Setup

```bash
npm install
npm run dev
```

## Deploy to Vercel

```bash
npm run build
vercel --prod
```