import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useImperativeHandle } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { styles } from './styles';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 250;

type BottomSheetProps = {
    children?: React.ReactNode;
};

export type BottomSheetRefProps = {
    scrollTo: (destination: number) => void;
    isActive: () => boolean;
};

const BottomSheet = React.forwardRef<BottomSheetRefProps, BottomSheetProps>(
    ({ children }, ref) => {
        const translateY = useSharedValue(0);
        const active = useSharedValue(false);

        const scrollTo = useCallback((destination: number) => {
            'worklet';
            active.value = destination !== 0;

            translateY.value = withSpring(destination, { damping: 50 });
        }, []);

        const isActive = useCallback(() => {
            return active.value;
        }, []);

        useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
            scrollTo,
            isActive,
        ]);

        const context = useSharedValue({ y: 0 });
        const gesture = Gesture.Pan()
            .onStart(() => {
                context.value = { y: translateY.value };
            })
            .onUpdate((event) => {
                translateY.value = event.translationY + context.value.y;
                translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
            })
            .onEnd(() => {
                if (translateY.value > -SCREEN_HEIGHT / 3) {
                    Platform.OS == "ios" ? (
                        scrollTo(-150)
                    ) : (
                        scrollTo(-100)
                    )
                } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
                    scrollTo(MAX_TRANSLATE_Y);
                }
            });

        const rBottomSheetStyle = useAnimatedStyle(() => {
            const borderRadius = interpolate(
                translateY.value,
                [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
                [25, 5],
                Extrapolate.CLAMP
            );

            return {
                borderRadius,
                transform: [{ translateY: translateY.value }],
            };
        });

        return (
            <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
                <GestureDetector gesture={gesture}>
                    <View style={styles.lineWrapper}>
                        <View style={styles.line} />
                    </View>
                </GestureDetector>
                {children}
            </Animated.View>
        );
    }
);

export default BottomSheet;