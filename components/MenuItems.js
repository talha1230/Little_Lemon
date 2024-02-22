import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Animated, Modal, Image } from 'react-native';


const menuItemsToDisplay = [
  { name: 'Hummus', price: '$7', photo: require('C:/Users/Talha PC/FirstProject/assets/hero.jpg'), recipe: 'Delicious hummus recipe details...' },
  { name: 'Moutabal', price: '$8', photo: require('C:/Users/Talha PC/FirstProject/assets/hero.jpg'), recipe: 'Tasty moutabal recipe details...' },
  { name: 'Falafel', price: '$6', photo: require('C:/Users/Talha PC/FirstProject/assets/hero.jpg'), recipe: 'Yummy falafel recipe details...' },
  // Add more menu items as needed
];

const MenuItems = () => {
    const [selectedItemIndex, setSelectedItemIndex] = useState(null);
    const [scaleAnim] = useState(new Animated.Value(1));
    const [modalVisible, setModalVisible] = useState(false);
  
    useEffect(() => {
      if (selectedItemIndex !== null) {
        // Start the scale animation
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.2,
            duration: 200,
            useNativeDriver: true,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
          }),
        ]).start();
      }
    }, [selectedItemIndex]);
  
    const handleItemClick = (index) => {
      setSelectedItemIndex(index);
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setSelectedItemIndex(null);
      setModalVisible(false);
    };
  
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.menuTitle}>View Menu</Text>
          {menuItemsToDisplay.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleItemClick(index)}>
              <View style={styles.menuItemContainer}>
                <Text style={styles.menuItem}>{item.name}</Text>
                {selectedItemIndex === index && (
                  <Animated.Text style={[styles.menuItemPrice, { transform: [{ scale: scaleAnim }] }]}>
                    {item.price}
                  </Animated.Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            {selectedItemIndex !== null && (
              <View style={styles.modalContent}>
                <Image source={menuItemsToDisplay[selectedItemIndex].photo} style={styles.modalImage} />
                <Text style={styles.modalPrice}>{menuItemsToDisplay[selectedItemIndex].price}</Text>
                <Text style={styles.modalRecipe}>{menuItemsToDisplay[selectedItemIndex].recipe}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </Modal>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#a4c3bb', // Dark background color
    },
    scrollViewContent: {
      paddingHorizontal: 40,
      paddingVertical: 40,
    },
    menuTitle: {
      color: '#F4CE14', // Yellow text color
      fontSize: 40,
      marginBottom: 20,
      textAlign: 'center',
    },
    menuItemContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
      padding: 10,
      backgroundColor: '#333', // Dark gray background color
      borderRadius: 10,
    },
    menuItem: {
      color: 'white', // White text color
      fontSize: 20,
    },
    menuItemPrice: {
      color: '#F4CE14', // Yellow text color
      fontSize: 20,
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    modalImage: {
      width: 200,
      height: 200,
      borderRadius: 10,
      marginBottom: 10,
    },
    modalPrice: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalRecipe: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },
    closeButton: {
      backgroundColor: '#F4CE14',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
    },
    closeButtonText: {
      color: '#333',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  
  export default MenuItems;