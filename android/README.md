# MORPH LAB Android wrapper

This is a native Android shell around the existing Vite/Three.js game. The game assets are bundled locally in the APK; it does not depend on the hosted website to launch.

## Build locally

From the repository root:

```bash
pnpm install --frozen-lockfile
pnpm build
mkdir -p android/app/src/main/assets/www
cp -R dist/. android/app/src/main/assets/www/
cd android
gradle :app:assembleDebug
```

APK output: `android/app/build/outputs/apk/debug/app-debug.apk`.

The wrapper uses Android WebView with AndroidX WebKit's local asset loader, JavaScript, DOM storage, WebGL hardware acceleration, and the system document picker for the local image-reference input. The debug APK is unsigned for Play Store release; do not publish it as a production release.

A successful CI build verifies packaging only. Install and test on a physical Android phone before calling the app device-verified.
