import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends TouchableOpacityProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;

  /**
   * Solo para mantener compatibilidad si algún componente todavía manda className.
   * En React Native no se usa className, por eso aquí se ignora.
   */
  className?: string;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  style,
  textStyle,
  disabled,
  activeOpacity = 0.85,
  className,
  ...props
}: ButtonProps) {
  const renderChildren = () => {
    return React.Children.map(children, (child) => {
      if (typeof child === 'string' || typeof child === 'number') {
        return (
          <Text
            style={[
              styles.text,
              textVariants[variant],
              textSizes[size],
              textStyle,
              disabled && styles.textDisabled,
            ]}
          >
            {child}
          </Text>
        );
      }

      return child;
    });
  };

  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      disabled={disabled}
      style={[
        styles.base,
        buttonVariants[variant],
        buttonSizes[size],
        disabled && styles.disabled,
        style,
      ]}
      {...props}
    >
      {renderChildren()}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
  },

  text: {
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },

  disabled: {
    opacity: 0.55,
  },

  textDisabled: {
    opacity: 0.85,
  },
});

const buttonVariants: Record<ButtonVariant, ViewStyle> = {
  primary: {
    backgroundColor: '#1a3e6a',
    borderColor: '#1a3e6a',
  },

  secondary: {
    backgroundColor: '#faf9f6',
    borderColor: 'rgba(26, 62, 106, 0.22)',
  },

  outline: {
    backgroundColor: 'transparent',
    borderColor: '#1a3e6a',
  },

  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },

  danger: {
    backgroundColor: '#e11d48',
    borderColor: '#e11d48',
  },
};

const textVariants: Record<ButtonVariant, TextStyle> = {
  primary: {
    color: '#ffffff',
  },

  secondary: {
    color: '#1a3e6a',
  },

  outline: {
    color: '#1a3e6a',
  },

  ghost: {
    color: '#1a3e6a',
  },

  danger: {
    color: '#ffffff',
  },
};

const buttonSizes: Record<ButtonSize, ViewStyle> = {
  sm: {
    minHeight: 38,
    paddingHorizontal: 16,
    paddingVertical: 9,
  },

  md: {
    minHeight: 48,
    paddingHorizontal: 20,
    paddingVertical: 13,
  },

  lg: {
    minHeight: 58,
    paddingHorizontal: 30,
    paddingVertical: 17,
  },
};

const textSizes: Record<ButtonSize, TextStyle> = {
  sm: {
    fontSize: 10,
  },

  md: {
    fontSize: 11,
  },

  lg: {
    fontSize: 12,
  },
};