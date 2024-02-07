import React from 'react';
import { useService } from '@artsiombarouski/rn-services';
import { ProductResource } from '@/src/api/products/ProductResource';
import { useResourceList } from '@artsiombarouski/rn-resources';
import { ProductModel } from '@/src/api/products/ProductModel';
import {
  Box,
  Column,
  Image,
  Text,
  FlatList,
  Button,
  Badge,
  IconButton,
  MinusIcon,
  AddIcon,
  Center,
} from 'native-base';
import { observer } from 'mobx-react-lite';
import { useShoppingCart } from '@/src/components/ShoppingCartProvider';
import { ProductDto } from '@/src/api/products';
import { StyleSheet } from 'react-native';

//todo: refactor (separate product component, ...)
const Products = observer(() => {
  const resource = useService(ProductResource);
  const list = useResourceList<ProductModel>(resource); //todo: add isVisible query
  const { cart, addToCart, removeFromCart } = useShoppingCart();

  const getProductQuantityInCart = (productId: string) => {
    const cartItem = cart.find((item) => item.product.id === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  if (list.isLoadingOrInitialLoading) {
    return (
      <Center flex={1}>
        <Text>Loading...</Text>
      </Center>
    );
  }

  return (
    <FlatList
      data={list.data.slice()}
      renderItem={({ item }) => {
        const productQuantityInCart = getProductQuantityInCart(item.id);
        const isProductInCart = productQuantityInCart > 0;

        return (
          <Box style={styles.itemContainer}>
            <Column p={2} pb={6}>
              {isProductInCart && (
                <Badge
                  bgColor={'primary.600'}
                  _text={{ color: 'white' }}
                  borderRadius={'50%'}
                  position="absolute"
                  right={0}
                  top={0}
                >
                  {productQuantityInCart}
                </Badge>
              )}
              <Box px={4} pb={2}>
                <Image
                  source={{ uri: item.assets?.cover }}
                  style={styles.image}
                />
              </Box>
              <Text textAlign={'center'} fontWeight={'500'}>
                {item.title}
              </Text>
              <Text
                fontWeight={'semibold'}
                textAlign={'center'}
              >{`${item.basePrice}$`}</Text>
              {isProductInCart ? (
                <Button.Group mt={2} justifyContent={'center'} space={'md'}>
                  <IconButton
                    onPress={() => {
                      removeFromCart(item.id);
                    }}
                    icon={<MinusIcon />}
                  />
                  <IconButton
                    onPress={() => {
                      addToCart(item as ProductDto, 1);
                    }}
                    icon={<AddIcon />}
                  />
                </Button.Group>
              ) : (
                <Button
                  mt={2}
                  onPress={() => {
                    addToCart(item as ProductDto, 1);
                  }}
                >
                  ADD
                </Button>
              )}
            </Column>
          </Box>
        );
      }}
      style={styles.productsList}
      ItemSeparatorComponent={() => <Box h={4} />}
      numColumns={2}
      keyExtractor={(e) => e.id}
    />
  );
});

export default Products;

const styles = StyleSheet.create({
  productsList: {
    flex: 1,
    padding: 16,
  },
  itemContainer: {
    aspectRatio: 3 / 4,
    flex: 1,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
  },
});
