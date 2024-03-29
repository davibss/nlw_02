import React from 'react';
import { View, Text, ImageBackground } from 'react-native';

import styles from './styles';

import giveClassesBGImage from '../../assets/images/give-classes-background.png';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

function GiveClasses(){
    const {goBack} = useNavigation();

    function handleNavigateBack() {
        goBack();
    }

    return (
        <View style={styles.container}>
            <ImageBackground 
                resizeMode="contain"
                source={giveClassesBGImage} 
                style={styles.content}>
                <Text style={styles.title}>Quer ser um Proffy?</Text>
                <Text style={styles.description}>Para começar, você precisa se cadastrar 
                    como professor na plataforma web</Text>
            </ImageBackground>
            <RectButton style={styles.okButton} onPress={handleNavigateBack}>
                <Text style={styles.okButtonText}>Tudo bem</Text>
            </RectButton>
        </View>
    );
}

export default GiveClasses;