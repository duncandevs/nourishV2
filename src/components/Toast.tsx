import React, { useState, useEffect } from 'react';
import { Animated, Text, StyleSheet, View } from 'react-native';
import { Colors } from '../theme';

export const Toast = ({ visible, message, duration = 1500, onDismiss }) => {
  const [fadeAnim] = useState(new Animated.Value(0)); // Initial value for opacity: 0

  useEffect(() => {
    if (visible) {
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }
      ).start();

      const timer = setTimeout(() => {
        Animated.timing(
          fadeAnim,
          {
            toValue: 0,
            duration,
            useNativeDriver: true,
          }
        ).start(() => {
            // Optional callback to notify parent component
            if (onDismiss) {
                onDismiss();
            };
        });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, fadeAnim, duration, onDismiss]);

  return visible ? (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.content}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute', 
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: Colors.success,
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
  },
  text: {
    color: 'white',
  },
});

export default Toast;
