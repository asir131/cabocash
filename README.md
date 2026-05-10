# Cabocash-style MVP

Android-first React Native fintech MVP built with Expo, TypeScript, React Navigation, AsyncStorage, and local simulated transactions.

This project is a frontend prototype only. It does not include a backend, real authentication, signup/login, or real payment integration.

## Requirements

Install these before running the project:

- Git
- Node.js 18 or newer
- npm
- Android Studio
- Android SDK
- Android Emulator, or a physical Android phone with USB debugging enabled

For Android development, make sure these environment variables are configured:

```bash
ANDROID_HOME=C:\Android\Sdk
ANDROID_SDK_ROOT=C:\Android\Sdk
```

Also make sure Android SDK `platform-tools` is available in your `PATH`, so `adb` works from the terminal.

## 1. Clone the project

```bash
git clone https://github.com/asir131/cabocash.git
cd cabocash
```

## 2. Install dependencies

```bash
npm i
```

This installs Expo, React Native, TypeScript, navigation packages, AsyncStorage, icons, and all other project dependencies from `package.json`.

## 3. Prepare an Android device

Use one of these options.

### Option A: Android Emulator

1. Open Android Studio.
2. Open Device Manager.
3. Create or start an Android Virtual Device.
4. Keep the emulator running.

### Option B: Physical Android Phone

1. Enable Developer Options on the phone.
2. Enable USB Debugging.
3. Connect the phone with USB.
4. Allow the USB debugging prompt on the phone.
5. Check that the device is detected:

```bash
adb devices
```

You should see your emulator or phone listed.

## 4. Run the app on Android

Recommended command:

```bash
npm run android
```

This runs the script from `package.json`:

```bash
expo run:android
```

You can also run Expo directly:

```bash
npx expo run:android
```

Expo will build and install the Android app on the connected emulator or device.

## Alternative: Start Expo manually

If you want to start the Expo dev server first:

```bash
npm start
```

Then press:

```bash
a
```

This opens the app on Android.

## Useful scripts

```bash
npm start
```

Starts the Expo development server.

```bash
npm run android
```

Builds and runs the app on Android.

```bash
npm run ios
```

Builds and runs the app on iOS. This requires macOS and Xcode.

```bash
npm run typecheck
```

Runs the TypeScript checker.

```bash
npm run build:android
```

Runs an EAS Android preview build.

## Android APK build with EAS

The project includes this script:

```bash
npm run build:android
```

If EAS is not configured yet, run:

```bash
npx eas login
npx eas build:configure
```

Then build again:

```bash
npm run build:android
```

## Troubleshooting

If Android cannot find a device:

```bash
adb devices
```

Start an emulator or reconnect your phone, then run:

```bash
npm run android
```

If dependencies are broken or outdated:

```bash
npm i
```

If Expo cache causes issues:

```bash
npx expo start --clear
```

If Android build files are stale:

```bash
npx expo prebuild --clean
npx expo run:android
```

## App scope

Included screens:

- Home
- Send Money
- Request Money
- Transactions
- Contacts
- Profile / Settings
- Language selector: Kriolu, Portuguese, English

Send and request actions create local simulated transactions and persist them on the device with AsyncStorage.
