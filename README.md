# ع القهوة 🀫☕ — لعبة دومينو

لعبة دومينو عربية (RTL)، قابلة للتشغيل كموقع/PWA أو كتطبيق أندرويد (APK) يتبني تلقائيًا عبر GitHub Actions.

## 📁 هيكل الريبو (بعد التحديث ده)

```
ala-el2ahwa/
├── www/                         ← كل ملفات اللعبة (اللي كانت في الجذر قبل كده)
│   ├── index.html
│   ├── manifest.json
│   ├── service-worker.js
│   └── icons/
│       ├── icon-512.png
│       ├── icon-192.png
│       ├── icon-maskable-512.png
│       ├── icon-maskable-192.png
│       ├── apple-touch-icon.png
│       └── favicon.ico
├── .github/
│   └── workflows/
│       └── android-build.yml    ← الـ GitHub Action اللي بيبني الـ APK
├── package.json                 ← اعتماديات Capacitor 8
├── capacitor.config.json        ← إعدادات التطبيق (الاسم، appId، مجلد الويب)
├── icon-source.png
├── README.md
├── LICENSE
└── .gitignore
```

> ⚠️ **مهم**: لازم تتأكد إن مجلد الأيقونات اسمه `icons` (جمع) مش `icon` (مفرد)، لأن كل الكود بيدور على `icons/...`.

## 🛠️ خطوات نقل الملفات على GitHub

أسهل طريقة (يفضل من متصفح كمبيوتر عادي مش الموبايل، لأن رفع مجلدات كاملة بمساراتها بيشتغل أضمن على الديسكتوب):

1. احذف الملفات القديمة من جذر الريبو: `index.html`, `manifest.json`, `service-worker.js`, ومجلد `icon`/`icons`.
2. من **Add file → Upload files**، اسحب مجلد المشروع الجديد بالكامل (اللي جوه فيه `www/`, `package.json`, `capacitor.config.json`, `.github/`) — المتصفح هيحافظ على مسارات المجلدات تلقائيًا.
3. اعمل Commit مباشرة على `main`.

(البديل: لو عايز تعدّل من الموبايل، تقدر تفتح كل ملف وتعمل Rename للمسار بتاعه من صفحة التعديل، بس ده هياخد وقت أطول لأنك هتكرر الخطوة لكل ملف/أيقونة لوحدها).

## ⚙️ إزاي الـ Build شغال (`.github/workflows/android-build.yml`)

كل ما تعمل push على `main` (أو تشغّله يدويًا من تبويب **Actions → Build Android APK → Run workflow**)، الخطوات دي بتحصل تلقائيًا على سيرفرات GitHub:

1. تنزيل الكود.
2. تجهيز Node.js 20 و JDK 21.
3. `npm install` — بيثبت Capacitor 8 (`@capacitor/core`, `@capacitor/android`, `@capacitor/cli`).
4. `npx cap add android` — بيولّد مشروع أندرويد كامل من الصفر (مش متخزن في الريبو، بيتبني كل مرة).
5. `npx cap sync android` — بينسخ ملفات `www/` (اللعبة + الأيقونات) جوه مشروع الأندرويد.
6. `./gradlew assembleDebug` — بيبني ملف APK (نسخة Debug غير موقّعة، تجريبية للتحميل والتجربة المباشرة).
7. رفع الـ APK كـ **Artifact** يقدر أي حد يحمّله من صفحة الـ run نفسها.

### 📥 إزاي تحمّل الـ APK بعد ما الـ Build يخلص
- روح تبويب **Actions** في الريبو.
- افتح آخر run لـ "Build Android APK" (لازم يكون لونه أخضر ✅).
- تحت في قسم **Artifacts** هتلاقي `ala-el2ahwa-debug-apk` — حمّله، فكّه، وهتلاقي `app-debug.apk` جاهز للتثبيت على أي جهاز أندرويد (لازم تفعّل "تثبيت من مصادر غير معروفة" في إعدادات الجهاز).

## 📝 ملاحظات
- الـ APK الناتج **Debug** (تجريبي وغير موقّع) — مناسب للتجربة على جهازك، مش للنشر على Google Play. لو حبيت تعمل نسخة **Release موقّعة** لاحقًا، هنحتاج نضيف مفتاح توقيع (Keystore) كـ GitHub Secret ونعدّل الـ workflow يشغّل `assembleRelease` بدل `assembleDebug`.
- أي صلاحيات هتحتاجها لاحقًا (زي المايك للمحادثة الصوتية) هتتضاف داخل `android/app/src/main/AndroidManifest.xml` بعد أول build ناجح، أو تقدر تضيفها تلقائيًا بإضافة خطوة في الـ workflow قبل الـ build.

## 📜 الرخصة
راجع ملف [LICENSE](LICENSE).
