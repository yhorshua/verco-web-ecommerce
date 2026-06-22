import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import Navbar from './app/components/Navbar.web';
import CartDrawer from './app/components/CartDrawer.web';
import Footer from './app/components/Footer.web';
import VirtualTryOnModal from './app/components/VirtualTryOnModal.web';

import HomeScreen from './app/screens/HomeScreen.web';
import ProductScreen from './app/screens/ProductScreen.web';

import { products } from './app/data/products';
import { Product, CartItem } from './app/types';

export default function AppWeb() {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedBrand, setSelectedBrand] = useState('Todas');
  const [selectedGender, setSelectedGender] = useState('Todos');
  const [searchQuery, setSearchQuery] = useState('');

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [tryOnProductId, setTryOnProductId] = useState<string | null>(null);
  const [cartOpen, setCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    if (typeof window === 'undefined') return [];

    try {
      const saved = localStorage.getItem('apex_sport_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [userEmail, setUserEmail] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('apex_user_email');
  });

  useEffect(() => {
    localStorage.setItem('apex_sport_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleSelectProductById = (productId: string) => {
    const found = products.find((p) => p.id === productId);
    if (!found) return;

    setActiveProduct(found);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCartDirect = (
    product: Product,
    size: string,
    color: any,
  ) => {
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor?.name === color?.name,
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += 1;
      setCartItems(updated);
    } else {
      setCartItems([
        ...cartItems,
        {
          product,
          quantity: 1,
          selectedSize: size,
          selectedColor: color,
        },
      ]);
    }

    Swal.fire({
      toast: true,
      position: 'top-end',
      icon: 'success',
      title: `¡Talla ${size} agregada!`,
      text: `${product.name} se sumó al carrito.`,
      showConfirmButton: false,
      timer: 2500,
      background: '#faf9f6',
      color: '#1a3e6a',
    });
  };

  const handleAddToCart = (
    product: Product,
    quantity: number,
    size: string,
    color: any,
  ) => {
    const existingIndex = cartItems.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedSize === size &&
        item.selectedColor?.name === color?.name,
    );

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += quantity;
      setCartItems(updated);
    } else {
      setCartItems([
        ...cartItems,
        {
          product,
          quantity,
          selectedSize: size,
          selectedColor: color,
        },
      ]);
    }

    setActiveProduct(null);

    Swal.fire({
      title: '¡Añadido con éxito!',
      text: `${product.name} fue agregado al carrito.`,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'VER MI BOLSA',
      cancelButtonText: 'SEGUIR NAVEGANDO',
      confirmButtonColor: '#1a3e6a',
    }).then((result) => {
      if (result.isConfirmed) {
        setCartOpen(true);
      }
    });
  };

  const handleBuyNow = (
    product: Product,
    quantity: number,
    size: string,
    color: any,
  ) => {
    const finalItems = [
      ...cartItems,
      {
        product,
        quantity,
        selectedSize: size,
        selectedColor: color,
      },
    ];

    setCartItems(finalItems);
    setActiveProduct(null);
    setCartOpen(true);
  };

  const handleUpdateQuantity = (idx: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(idx);
      return;
    }

    const updated = [...cartItems];
    updated[idx].quantity = quantity;
    setCartItems(updated);
  };

  const handleRemoveItem = (idx: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleCheckout = (
    subtotal: number,
    shipping: number,
    total: number,
  ) => {
    Swal.fire({
      title: 'Checkout',
      text: `Total a pagar: $${total.toFixed(2)} USD`,
      icon: 'info',
      confirmButtonColor: '#1a3e6a',
    });
  };

  const handleOpenLogin = async () => {
    const { value } = await Swal.fire({
      title: 'Iniciar sesión',
      input: 'email',
      inputPlaceholder: 'correo@ejemplo.com',
      confirmButtonText: 'Entrar',
      confirmButtonColor: '#1a3e6a',
      showCancelButton: true,
    });

    if (value) {
      setUserEmail(value);
      localStorage.setItem('apex_user_email', value);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#faf9f6] text-stone-800">
      <Navbar
        selectedCategory={selectedCategory}
        setSelectedCategory={(cat) => {
          setSelectedCategory(cat);
          setActiveProduct(null);
        }}
        selectedBrand={selectedBrand}
        setSelectedBrand={(brand) => {
          setSelectedBrand(brand);
          setActiveProduct(null);
        }}
        selectedGender={selectedGender}
        setSelectedGender={(gender) => {
          setSelectedGender(gender);
          setActiveProduct(null);
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenCart={() => setCartOpen(true)}
        onOpenLogin={handleOpenLogin}
      />

      <main className="flex-1 w-full">
        {activeProduct ? (
          <ProductScreen
            product={activeProduct}
            onClose={() => setActiveProduct(null)}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onOpenVirtualTryOn={(productId) => setTryOnProductId(productId)}
          />
        ) : (
          <HomeScreen
            products={products}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
            selectedGender={selectedGender}
            setSelectedGender={setSelectedGender}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            userEmail={userEmail}
            onSelectProductById={handleSelectProductById}
            onAddToCartDirect={handleAddToCartDirect}
            onOpenVirtualTryOn={(productId) => setTryOnProductId(productId)}
          />
        )}
      </main>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      <VirtualTryOnModal
        product={products.find((p) => p.id === tryOnProductId) || null}
        isOpen={!!tryOnProductId}
        onClose={() => setTryOnProductId(null)}
      />

      <Footer />
    </div>
  );
}