import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  ShoppingCart,
  Star,
  Eye,
  Tag,
  Sparkles,
} from 'lucide-react-native';

import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (productId: string) => void;
  onAddToCartDirect: (
    product: Product,
    size: string,
    color: any,
  ) => void;
  style?: ViewStyle;
}

const COLOR_MAP: Record<string, string> = {
  black: '#111827',
  white: '#ffffff',
  red: '#dc2626',
  rose: '#e11d48',
  pink: '#ec4899',
  blue: '#2563eb',
  sky: '#0ea5e9',
  cobalt: '#1a3e6a',
  green: '#16a34a',
  emerald: '#059669',
  yellow: '#facc15',
  amber: '#f59e0b',
  orange: '#ea580c',
  purple: '#9333ea',
  violet: '#7c3aed',
  gray: '#6b7280',
  grey: '#6b7280',
  stone: '#78716c',
  beige: '#d6c7a1',
  brown: '#92400e',
  navy: '#1e3a8a',
};

function getColorHex(colorObj: any): string {
  if (!colorObj) return '#666666';

  if (colorObj.hex) return colorObj.hex;
  if (colorObj.color) return colorObj.color;
  if (colorObj.value) return colorObj.value;

  const raw = `${colorObj.name || ''} ${colorObj.class || ''} ${
    colorObj.className || ''
  }`.toLowerCase();

  const hexMatch = raw.match(/#([0-9a-f]{3,8})/i);

  if (hexMatch) {
    return `#${hexMatch[1]}`;
  }

  const found = Object.keys(COLOR_MAP).find((key) =>
    raw.includes(key),
  );

  return found ? COLOR_MAP[found] : '#666666';
}

export default function ProductCard({
  product,
  onSelectProduct,
  onAddToCartDirect,
  style,
}: ProductCardProps) {
  const defaultSize = product.sizes?.[0] || 'M';

  const defaultColor =
    product.colors?.[0] || {
      name: 'Único',
      class: 'bg-stone-500',
      hex: '#666666',
    };

  const colorHex = getColorHex(defaultColor);

  return (
    <View style={[styles.card, style]}>
      {/* Badges superiores */}
      <View style={styles.topBadges}>
        {product.isNew && (
          <View style={styles.newBadge}>
            <Sparkles size={12}/>
            <Text style={styles.newBadgeText}>NUEVO</Text>
          </View>
        )}

        {!!product.discount && (
          <View style={styles.discountBadge}>
            <Tag size={12} />
            <Text style={styles.discountBadgeText}>
              -{product.discount}% OFF
            </Text>
          </View>
        )}
      </View>

      {/* Marca */}
      <View style={styles.brandBadge}>
        <Text style={styles.brandBadgeText}>{product.brand}</Text>
      </View>

      {/* Imagen */}
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={() => onSelectProduct(product.id)}
        style={styles.imageArea}
      >
        <View style={styles.shadowRing} />

        <Image
          source={{ uri: product.image }}
          resizeMode="contain"
          style={styles.productImage}
        />

        <View style={styles.viewDetailsBadge}>
          <Eye size={15}/>
          <Text style={styles.viewDetailsText}>VER</Text>
        </View>
      </TouchableOpacity>

      {/* Información */}
      <View style={styles.infoBox}>
        <View>
          <Text style={styles.categoryText}>
            {product.category} • {product.gender}
          </Text>

          <TouchableOpacity
            onPress={() => onSelectProduct(product.id)}
            activeOpacity={0.85}
          >
            <Text style={styles.productName} numberOfLines={1}>
              {product.name}
            </Text>
          </TouchableOpacity>

          <View style={styles.ratingRow}>
            <View style={styles.ratingPill}>
              <Star
                size={12}
                
              />
              <Text style={styles.ratingText}>
                {product.rating.toFixed(1)}
              </Text>
            </View>

            <Text style={styles.reviewText}>
              ({product.reviewsCount} opiniones)
            </Text>
          </View>
        </View>

        {/* Precio y botón */}
        <View style={styles.bottomRow}>
          <View style={styles.priceBox}>
            {!!product.originalPrice && (
              <Text style={styles.originalPrice}>
                ${product.originalPrice.toFixed(2)}
              </Text>
            )}

            <Text style={styles.price}>
              ${product.price.toFixed(2)}
            </Text>
          </View>

          <TouchableOpacity
            activeOpacity={0.85}
            onPress={() =>
              onAddToCartDirect(
                product,
                defaultSize,
                defaultColor,
              )
            }
            style={styles.buyButton}
          >
            <ShoppingCart size={15}/>
            <Text style={styles.buyButtonText}>COMPRAR</Text>
          </TouchableOpacity>
        </View>

        {/* Selección rápida visual */}
        <View style={styles.quickSelectionRow}>
          <View style={styles.quickBadge}>
            <Text style={styles.quickBadgeText}>
              TALLA: {defaultSize}
            </Text>
          </View>

          <View style={styles.quickBadge}>
            <Text style={styles.quickBadgeText}>COLOR:</Text>
            <View
              style={[
                styles.colorDot,
                {
                  backgroundColor: colorHex,
                  borderColor:
                    colorHex === '#ffffff'
                      ? '#d6d3d1'
                      : colorHex,
                },
              ]}
            />
            <Text style={styles.quickBadgeText}>
              {defaultColor.name}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    position: 'relative',
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e7e5e4',
    borderRadius: 32,
    overflow: 'hidden',
    marginBottom: 18,
  },

  topBadges: {
    position: 'absolute',
    top: 14,
    left: 14,
    zIndex: 20,
    gap: 7,
  },

  newBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#1a3e6a',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  newBadgeText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  discountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0f4f8',
    borderWidth: 1,
    borderColor: '#dbeafe',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  discountBadgeText: {
    color: '#1a3e6a',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  brandBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    zIndex: 20,
    backgroundColor: 'rgba(250,249,246,0.94)',
    borderWidth: 1,
    borderColor: '#e7e5e4',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },

  brandBadgeText: {
    color: '#1a3e6a',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
  },

  imageArea: {
    width: '92%',
    aspectRatio: 1,
    alignSelf: 'center',
    marginTop: 14,
    borderRadius: 24,
    backgroundColor: '#faf9f6',
    borderWidth: 1,
    borderColor: '#f5f5f4',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    overflow: 'hidden',
  },

  shadowRing: {
    position: 'absolute',
    bottom: 24,
    width: '78%',
    height: 22,
    borderRadius: 999,
    backgroundColor: 'rgba(168,162,158,0.28)',
    transform: [{ scaleY: 0.35 }],
  },

  productImage: {
    width: '82%',
    height: '82%',
  },

  viewDetailsBadge: {
    position: 'absolute',
    bottom: 14,
    right: 14,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e7e5e4',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 7,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  viewDetailsText: {
    color: '#1a3e6a',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.7,
  },

  infoBox: {
    padding: 18,
    gap: 14,
  },

  categoryText: {
    color: '#a8a29e',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },

  productName: {
    color: '#1c1917',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: -0.2,
    textTransform: 'uppercase',
  },

  ratingRow: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  ratingPill: {
    backgroundColor: '#faf9f6',
    borderWidth: 1,
    borderColor: '#e7e5e4',
    borderRadius: 999,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  ratingText: {
    color: '#1a3e6a',
    fontSize: 10,
    fontWeight: '900',
  },

  reviewText: {
    color: '#78716c',
    fontSize: 10,
  },

  bottomRow: {
    borderTopWidth: 1,
    borderTopColor: '#f5f5f4',
    paddingTop: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },

  priceBox: {
    flex: 1,
  },

  originalPrice: {
    color: '#a8a29e',
    fontSize: 10,
    fontWeight: '700',
    textDecorationLine: 'line-through',
    marginBottom: 2,
  },

  price: {
    color: '#1a3e6a',
    fontSize: 17,
    fontWeight: '900',
  },

  buyButton: {
    backgroundColor: '#faf9f6',
    borderWidth: 1,
    borderColor: 'rgba(26,62,106,0.22)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 11,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  buyButtonText: {
    color: '#1a3e6a',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
  },

  quickSelectionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },

  quickBadge: {
    backgroundColor: '#faf9f6',
    borderWidth: 1,
    borderColor: '#e7e5e4',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  quickBadgeText: {
    color: '#57534e',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  },

  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    borderWidth: 1,
  },
});