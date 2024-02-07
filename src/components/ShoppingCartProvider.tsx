import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ProductDto } from '@/src/api/products';
import { MainButton } from '@twa-dev/sdk/dist/react';
import { useService } from '@artsiombarouski/rn-services';
import { BotService } from '@/src/services/BotService';
import { useUserInfo } from '@/src/services/hooks/useUserInfo';
import { useTelegram } from '@/src/services/hooks';

type CartItem = {
  product: ProductDto;
  quantity: number;
};

type ShoppingCartContextType = {
  cart: CartItem[];
  addToCart: (product: ProductDto, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearFromCart: (productId: string) => void;
  clearCart: () => void;
};

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(
  undefined,
);

type ShoppingCartProviderProps = {
  children: ReactNode;
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const { tg } = useTelegram();
  const botService = useService(BotService);
  const user = useUserInfo();
  const addToCart = (product: ProductDto, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === product.id,
      );

      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      } else {
        return [...prevCart, { product, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (item) => item.product.id === productId,
      );
      if (existingItem && existingItem.quantity > 1) {
        // Decrease quantity if more than 1
        return prevCart.map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        );
      } else if (existingItem && existingItem.quantity === 1) {
        // Remove from cart if quantity is 1
        return prevCart.filter((item) => item.product.id !== productId);
      } else {
        // If item not in cart, return previous cart
        return prevCart;
      }
    });
  };

  const clearFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product.id !== productId),
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalCost = cart.reduce(
    (acc, currentItem) =>
      acc + (currentItem.product.basePrice ?? 0) * currentItem.quantity,
    0,
  );

  //TODO:
  // 1. multiple products [{product, quantity}, {product, quantity}]
  // 2. move to controller
  const getInvoiceLink = async () => {
    const cartItems = cart.map((item) => ({
      productId: item.product.id,
      quantity: item.quantity,
      productType: 'product',
    }));
    await botService
      .generateInvoiceLink(cartItems, user?.id!)
      .then((response) => {
        if (response.error) {
          console.log('error: ', response.error);
          return;
        }

        const { invoiceLink } = response.data;
        if (invoiceLink) {
          tg.showPopup(
            {
              title: 'Purchase', //todo: change title, message
              message: 'Do you want to buy it?',
              buttons: [
                {
                  id: '1',
                  type: 'ok',
                },
                {
                  id: '2',
                  type: 'cancel',
                },
              ],
            },
            (buttonId) => {
              if (buttonId === '1') {
                tg.openInvoice(invoiceLink, async (status) => {
                  if (status === 'paid') {
                    console.log('Successfully paid');
                    tg.showPopup({
                      message: 'You have succesfully paid!',
                    });
                    clearCart();
                    //todo: add update user (UserUpdater)
                  }
                });
              }
            },
          );
        }
      });
  };

  return (
    <ShoppingCartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearFromCart, clearCart }}
    >
      {children}
      {cart.length > 0 && (
        <MainButton text={`PAY ${totalCost}$`} onClick={getInvoiceLink} />
      )}
    </ShoppingCartContext.Provider>
  );
};

export const useShoppingCart = (): ShoppingCartContextType => {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error(
      'useShoppingCart must be used within a ShoppingCartProvider',
    );
  }
  return context;
};
