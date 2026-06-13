import React, { useRef, useState } from "react";
import { Animated, View, ViewStyle } from "react-native";

interface Props {
  children: React.ReactNode;
  delay?: number;
  style?: ViewStyle;
  fromBottom?: boolean;
}

/**
 * Scroll-reveal wrapper — fades + translates in when it enters the viewport.
 * Uses onLayout + a simple mount animation (no IntersectionObserver on RN).
 */
export default function AnimatedSection({
  children,
  delay = 0,
  style,
  fromBottom = true,
}: Props) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(fromBottom ? 32 : -16)).current;
  const [animated, setAnimated] = useState(false);

  const triggerAnimation = () => {
    if (animated) return;
    setAnimated(true);
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 560,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 560,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <Animated.View
      style={[style, { opacity, transform: [{ translateY }] }]}
      onLayout={triggerAnimation}
    >
      {children}
    </Animated.View>
  );
}
