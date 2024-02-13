import * as React from 'react';
import { Text, View, StyleSheet, ImageBackground, Dimensions, TouchableOpacity } from 'react-native';

// Get the screen's width and height
const { width, height } = Dimensions.get('window');

export default function Welcome() {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageBackground
                    source={require('C:/Users/Talha PC/FirstProject/assets/hero.jpg')}
                    style={styles.backgroundImage}
                >
                    <View style={styles.overlay}>
                        <Text style={[styles.headerText, { color: 'black' }]}>
                            Little Lemon is a charming neighborhood bistro that serves simple food and
                            classic cocktails in a lively but casual environment.
                            We would love to hear more about your experience with us!
                        </Text>
                        <Text style={styles.subHeaderText}>
                            We are open from 11:00 am to 11:00 pm every day.
                        </Text>
                        <TouchableOpacity style={styles.button} onPress={() => alert('Learn More pressed')}>
                            <Text style={styles.buttonText}>Learn More</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: '90%',
        height: '70%',
        borderRadius: 10,
        overflow: 'hidden', // Clip the content to the container's rounded borders
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
    },
    overlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.7)', // Adjust the opacity as needed
        paddingHorizontal: 20,
        paddingVertical: 40,
        textAlign: 'center',
        alignItems: 'center',
    },
    headerText: {
        color: '#000',
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subHeaderText: {
        color: '#a4c3bb', // Lemon color
        fontSize: 16,
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#FFD700', // Gold color
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    buttonText: {
        color: '#000',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
