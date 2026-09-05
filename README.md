# ع القهوة 🀫☕ — لعبة دومينو

لعبة دومينو عربية (RTL) تعمل بالكامل من ملف HTML واحد، مع خصم ذكاء اصطناعي بخمس مستويات صعوبة (سهل / متوسط / صعب / محترف / ماستر)، وقابلة للتحويل إلى تطبيق ويب مثبّت (PWA) أو تطبيق أندرويد أصلي عبر Capacitor.

## 📁 هيكل الملفات (ضعها بنفس الأسماء والأماكن دي بالظبط في الريبو)

```
ala-el2ahwa/
├── index.html                 ← اللعبة نفسها (الصفحة الرئيسية)
├── manifest.json               ← إعدادات تثبيت التطبيق (PWA)
├── service-worker.js           ← تشغيل أوفلاين + كاش
├── icons/
│   ├── icon-512.png            ← الأيقونة الأساسية 512×512
│   ├── icon-192.png            ← 192×192
│   ├── icon-maskable-512.png   ← نسخة "maskable" لأندرويد (512×512)
│   ├── icon-maskable-192.png   ← نسخة "maskable" لأندرويد (192×192)
│   ├── apple-touch-icon.png    ← لأجهزة آيفون/آيباد (180×180)
│   └── favicon.ico             ← أيقونة التبويب في المتصفح
├── icon-source.png             ← ملف المصدر (تقدر تعدّل عليه لو عايز تغيّر الأيقونة)
├── README.md
├── LICENSE
└── .gitignore
```

> ارفع الريبو باسم `ala-el2ahwa` (أو أي اسم تحبه)، وخلي `index.html` في الجذر الرئيسي عشان GitHub Pages يشتغل عليه على طول.

## 🚀 النشر على GitHub Pages (أسهل طريقة تشغّل بيها اللعبة كموقع/PWA)

1. اعمل ريبو جديد على GitHub وارفع كل الملفات اللي فوق بنفس الأماكن.
2. من إعدادات الريبو: **Settings → Pages → Branch: main → Save**.
3. هيديك لينك زي: `https://username.github.io/ala-el2ahwa/`
4. لما حد يفتح اللينك ده من الموبايل، المتصفح هيعرض خيار "إضافة إلى الشاشة الرئيسية" وهيتثبت بالأيقونة والاسم "ع القهوة".

### 🖼️ استخدام الأيقونة كأيقونة أساسية على GitHub
- ارفع `icons/icon-512.png` كـ **Social preview** من: **Settings → General → Social preview**.
- ملف `icon-source.png` موجود في حالة حبيت تعدّل التصميم وتصدّر أحجام جديدة.

## 📱 تحويلها لتطبيق أندرويد حقيقي (اختياري) — Capacitor v8

لو عايز APK يتنزل على المتجر أو يتحمّل مباشرة، استخدم **Capacitor** (أحدث إصدار حاليًا v8):

```bash
npm init -y
npm install @capacitor/core@8 @capacitor/android@8
npm install -D @capacitor/cli@8
npx cap init "ع القهوة" "com.alaelahwa.domino" --web-dir .
npx cap add android
npx cap sync android
npx cap open android   # يفتح المشروع في Android Studio
```

- خلي `webDir` في `capacitor.config.json` مشاير على مجلد فيه `index.html` (نفس الجذر هنا).
- الأيقونات: حط نفس ملفات `icons/` جوه `android/app/src/main/res/mipmap-*` بالأحجام المطابقة (Android Studio عنده أداة **Image Asset** بتولّد كل المقاسات تلقائيًا لو رفعتلها `icon-512.png`).
- **targetSdkVersion**: خليه على أحدث إصدار مطلوب من جوجل بلاي وقت الرفع (حاليًا 34 أو أحدث)، وده بيتظبط تلقائي في `android/variables.gradle` بعد `npx cap sync`.

## 🔐 الصلاحيات (Permissions) المطلوبة

### للحفظ الداخلي (الحالة الحالية بتستخدم `localStorage`)
- **مفيش صلاحية مطلوبة إطلاقًا.** الحفظ الداخلي (سواء `localStorage` في المتصفح، أو `Preferences`/`Filesystem` الخاصة بالتطبيق في Capacitor) بيتخزن في مساحة التطبيق الخاصة، ومحمي تلقائيًا من نظام أندرويد من غير أي إذن من المستخدم.
- تحتاج فقط `WRITE_EXTERNAL_STORAGE` أو `MANAGE_EXTERNAL_STORAGE` **لو** قررت لاحقًا تحفظ ملفات في مساحة مشتركة زي "التنزيلات" — مش الحالة دي حاليًا.

### للنظام الصوتي (محادثة صوتية بالمايك) — لما تضيفه
- **الويب/PWA**: مفيش حاجة تتكتب في أي ملف؛ أول ما الكود يستخدم `navigator.mediaDevices.getUserMedia({audio:true})` المتصفح هيسأل المستخدم يوافق ولا لأ تلقائيًا، وازاي ما وافق مرة هيفضل متذكرها للموقع ده.
- **تطبيق أندرويد (Capacitor)**: لازم تضيف الصلاحية دي يدويًا في:
  `android/app/src/main/AndroidManifest.xml`
  ```xml
  <uses-permission android:name="android.permission.RECORD_AUDIO" />
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
  ```
  - `RECORD_AUDIO` **إجباري** عشان يقدر يفتح المايك أصلًا.
  - `INTERNET` **إجباري** لأي محادثة صوتية حية (بترسل الصوت لسيرفر/الطرف التاني).
  - `MODIFY_AUDIO_SETTINGS` مفيد (مش إجباري 100%) لضبط مكبر الصوت/المايك أثناء المكالمة.
  - دي "runtime permissions" يعني برضه هيظهر بوب-أب للمستخدم وقت أول استخدام فعلي للمايك، حتى لو الصلاحية مكتوبة في الـ Manifest.

### الصلاحيات الحالية المستخدمة فعليًا في الكود بتاعك دلوقتي
- `navigator.vibrate(...)` (اهتزاز بسيط عند اللعب) — على أندرويد الأصلي محتاج:
  ```xml
  <uses-permission android:name="android.permission.VIBRATE" />
  ```
  دي صلاحية عادية (normal permission) مش بتحتاج موافقة المستخدم، بتتظبط تلقائي.

## 🎨 عن الأيقونة
تصميم يجمع بين قطعة دومينو وكوباية قهوة بألوان الخشب والنحاس بتاعة اللعبة نفسها، متوفرة بكل المقاسات المطلوبة لـ:
- متصفحات الويب (favicon)
- تثبيت PWA (Android/iOS/Desktop)
- أيقونات "Adaptive/Maskable" الخاصة بأندرويد

## 📝 الرخصة
راجع ملف [LICENSE](LICENSE).
