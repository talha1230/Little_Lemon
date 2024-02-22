// MenuItems.js
import React, { useState, useEffect } from 'react'; // Importing necessary modules from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Animated, Modal } from 'react-native'; // Importing necessary modules from 'react-native'

const menuItemsToDisplay = [ // Array of menu items to display
  { name: 'Hummus', price: '$5.00', id: '1A' }, // Menu item 1
  { name: 'Moutabal', price: '$5.00', id: '2B' }, // Menu item 2
  { name: 'Falafel', price: '$7.50', id: '3C' }, // Menu item 3
  { name: 'Marinated Olives', price: '$5.00', id: '4D' }, // Menu item 4
  { name: 'Kofta', price: '$5.00', id: '5E' }, // Menu item 5
  { name: 'Eggplant Salad', price: '$8.50', id: '6F' }, // Menu item 6
  { name: 'Lentil Burger', price: '$10.00', id: '7G' }, // Menu item 7
  { name: 'Smoked Salmon', price: '$14.00', id: '8H' }, // Menu item 8
  { name: 'Kofta Burger', price: '$11.00', id: '9I' }, // Menu item 9
  { name: 'Turkish Kebab', price: '$15.50', id: '10J' }, // Menu item 10
  { name: 'Fries', price: '$3.00', id: '11K' }, // Menu item 11
  { name: 'Buttered Rice', price: '$3.00', id: '12L' }, // Menu item 12
  { name: 'Bread Sticks', price: '$3.00', id: '13M' }, // Menu item 13
  { name: 'Pita Pocket', price: '$3.00', id: '14N' }, // Menu item 14
  { name: 'Lentil Soup', price: '$3.75', id: '15O' }, // Menu item 15
  { name: 'Greek Salad', price: '$6.00', id: '16Q' }, // Menu item 16
  { name: 'Rice Pilaf', price: '$4.00', id: '17R' }, // Menu item 17
  { name: 'Baklava', price: '$3.00', id: '18S' }, // Menu item 18
  { name: 'Tartufo', price: '$3.00', id: '19T' }, // Menu item 19
  { name: 'Tiramisu', price: '$5.00', id: '20U' }, // Menu item 20
  { name: 'Panna Cotta', price: '$5.00', id: '21V' }, // Menu item 21
];

// Rest of your code remains the same

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

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => handleItemClick(index)}>
      <View style={styles.menuItemContainer}>
        <Text style={styles.menuItem}>{item.name}</Text>
        {selectedItemIndex === index && (
          <Animated.Text style={[styles.menuItemPrice, { transform: [{ scale: scaleAnim }] }]}>
            {item.price}
          </Animated.Text>
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.menuTitle}>View Menu</Text>
      <FlatList
        data={menuItemsToDisplay}
        renderItem={renderItem}
        keyExtractor={(item) => item.id} 
        contentContainerStyle={styles.scrollViewContent}
      />
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

// Styles remain the same

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
