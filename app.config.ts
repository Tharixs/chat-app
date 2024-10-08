import { ConfigContext, ExpoConfig } from 'expo/config'

export default ({ config }: ConfigContext): ExpoConfig => {
    return {
        ...config,
        name: 'chat-app',
        slug: 'chat-app',
        version: '1.0.2',
        orientation: 'portrait',
        icon: './assets/images/icon.png',
        scheme: 'myapp',
        userInterfaceStyle: 'automatic',
        splash: {
            image: './assets/images/splash.png',
            resizeMode: 'contain',
            backgroundColor: '#ffffff',
        },
        ios: {
            supportsTablet: true,
            googleServicesFile: './GoogleService-Info.plist',
            bundleIdentifier: 'com.chatapp',
        },
        android: {
            adaptiveIcon: {
                foregroundImage: './assets/images/adaptive-icon.png',
                backgroundColor: '#ffffff',
            },
            googleServicesFile: './google-services.json',
            package: 'com.chatapp',
        },
        web: {
            bundler: 'metro',
            output: 'static',
            favicon: './assets/images/favicon.png',
        },
        plugins: [
            'expo-router',
            '@react-native-firebase/app',
            'expo-font',
            [
                'expo-build-properties',
                {
                    android: {
                        compileSdkVersion: 34,
                        targetSdkVersion: 34,
                        buildToolsVersion: '34.0.0',
                    },
                    ios: {
                        deploymentTarget: '13.4',
                        useFrameworks: 'static',
                    },
                },
            ],
            [
                'expo-image-picker',
                {
                    photosPermission:
                        'Allow $(PRODUCT_NAME) to access your photos',
                    cameraPermission:
                        'Allow $(PRODUCT_NAME) to access your camera so you can take pictures',
                },
            ],
        ],
        experiments: {
            typedRoutes: true,
        },
        extra: {
            router: {
                origin: false,
            },
            eas: {
                projectId: 'af684aee-6c87-4f74-be8a-336ae19b86da',
            },
        },
        runtimeVersion: '1.0.0',
        updates: {
            url: 'https://u.expo.dev/af684aee-6c87-4f74-be8a-336ae19b86da',
        },
        owner: 'tharixs-elmer-colab',
    }
}
