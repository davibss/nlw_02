import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import AsyncStorage from '@react-native-community/async-storage';
import { useFocusEffect } from '@react-navigation/native';

function Favorites(){
    const [favorites, setFavorites] = useState<Teacher[]>([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites') 
            .then(response => {
                if (response) {
                    const favoritedTeachers = JSON.parse(response);
                    setFavorites(favoritedTeachers);
                }
            })
    }

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites();
        }, [])
    );

    //loadFavorites();

    return(
        <View style={styles.container}>
            <PageHeader title="Meus Proffys favoritos"/>
            <ScrollView
                style={styles.teacherList} 
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {favorites.map(teacher => {
                    console.log('passandoaqui');
                    return <TeacherItem key={teacher.id} teacher={teacher} favorited={true}/>
                })}
                {/* <TeacherItem /> */}
                {/* <TeacherItem /> */}
                {/* <TeacherItem /> */}
                {/* <TeacherItem /> */}
            </ScrollView>
        </View>
    );
}

export default Favorites;