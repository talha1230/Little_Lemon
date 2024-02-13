import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default function Footer() {
    return (
        <View style={styles.footerContainer}>
            <Text style={styles.footerText}>All rights reserved by Little Lemon, 2024</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        backgroundColor: '#a4c3bb', // Lemon color
        padding: 10,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        borderRadius: 10,
        alignItems: 'center', // center items vertically
        justifyContent: 'center', // center items horizontally
        position: 'absolute', // position footer at the bottom
        left: 0,
        right: 0,
        bottom: 0,
    },
    footerText: {
        color: '#fff', // White color
        fontSize: 16,
        textAlign: 'center',
    },
});