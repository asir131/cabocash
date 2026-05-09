# Cabocash-style MVP

Android-first React Native fintech MVP inspired by the provided Cabocash-style reference. This project is a polished frontend prototype with local dummy data and simulated transactions only.

## Tech stack

- React Native with Expo
- TypeScript
- React Navigation
- AsyncStorage for local transaction persistence
- Expo vector icons
- Expo Linear Gradient

## Included screens

- Home
- Send Money
- Request Money
- Transactions
- Contacts
- Profile / Settings
- Simple language selector: Kriolu, Português, English

## Install dependencies

```bash
npm install
```

## Run on Android

```bash
npm run android
```

Or start Expo manually:

```bash
npm start
```

Then press `a` in the Expo terminal to open Android.

## Build Android APK

This project includes an EAS build script:

```bash
npm run build:android
```

You may need to configure EAS first:

```bash
npx eas login
npx eas build:configure
```

## MVP scope

This phase includes no backend, no authentication, no signup/login, and no real payment integration. Send and request actions create local simulated transactions and persist them on the device with AsyncStorage.
