import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TextInput } from 'react-native';

import { Feather } from '@expo/vector-icons';

import styles from './styles';
import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import { RectButton, BorderlessButton } from 'react-native-gesture-handler';
import api from '../../services/api';

import AsyncStorage from '@react-native-community/async-storage';
import Favorites from '../Favorites';
import { useFocusEffect } from '@react-navigation/native';

function TeacherList(){
    const [filtersVisible, setFiltersVisible] = useState(false);

    const [favorites, setFavorites] = useState<number[]>([]);

    const [subject, setSubject] = useState('');
    const [weekDay, setWeekDay] = useState('');
    const [time, setTime] = useState('');

    const [teachers, setTeachers] = useState<Teacher[]>([]);

    function loadFavorites() {
        AsyncStorage.getItem('favorites') 
            .then(response => {
                if (response) {
                    const favoritedTeachersID = JSON.parse(response).
                        map((teacher:Teacher) => {
                            return teacher.id;
                        });
                    setFavorites(favoritedTeachersID);
                }
            })
    }

    // useEffect(() => { 
        // loadFavorites();
    // }, [])

    function handleFilterButton(){
        setFiltersVisible(!filtersVisible);
    }

    function handleFilterSubmit(){
        loadFavorites();
        setFiltersVisible(!filtersVisible);
        api.get('/classes', {
            params: {
                subject,
                week_day: weekDay,
                time
            }
        }).then(response => {
            setTeachers(response.data);
            console.log(teachers);
        });
    }

    useFocusEffect(
        React.useCallback(() => {
            loadFavorites();
        }, [])
    )

    return(
        <View style={styles.container}>
            <PageHeader 
                title="Proffys disponíveis" 
                headerRight={(
                    <BorderlessButton onPress={handleFilterButton}>
                        <Feather name="filter" size={20} color="#FFF" style={{padding: 16}} />
                    </BorderlessButton>
                )}>
                { filtersVisible && (
                <View style={styles.searchForm}>
                    <Text style={styles.label}>Matéria</Text>
                    <TextInput
                        style={styles.input}
                        value={subject}
                        onChangeText={setSubject}
                        placeholder="Qual a matéria?"
                        placeholderTextColor="#c1bccc"/>
                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Dia da Semana</Text>
                            <TextInput
                                style={styles.input}
                                value={weekDay}
                                onChangeText={setWeekDay}
                                placeholder="Qual o dia?"
                                placeholderTextColor="#c1bccc"/>
                        </View>
                        <View style={styles.inputBlock}>
                            <Text style={styles.label}>Horário</Text>
                            <TextInput
                                style={styles.input}
                                value={time}
                                onChangeText={setTime}
                                placeholder="Qual horário?"
                                placeholderTextColor="#c1bccc"/>
                        </View>
                    </View>
                    <RectButton style={styles.submitButton} onPress={handleFilterSubmit}>
                        <Text style={styles.submitButtonText}>Filtrar</Text>
                    </RectButton>
                </View>)}
            </PageHeader>
            <ScrollView
                style={styles.teacherList} 
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16
                }}
            >
                {teachers.map((teacher, index) => {
                    return (
                        <TeacherItem 
                            key={teacher.id} 
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}/>
                    );
                })}
                {/* <TeacherItem />
                <TeacherItem />
                <TeacherItem />
                <TeacherItem /> */}
            </ScrollView>
        </View>
    );
}

export default TeacherList;