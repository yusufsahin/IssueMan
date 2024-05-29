// screens/ProjectsList.js
import React, { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet, ScrollView } from "react-native";
import { Button, Text, ListItem } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjects,setCurrentProject } from "../store/reducers/projectsActions";
import { SafeAreaView } from "react-native-safe-area-context";

const ProjectsList = () => {
    const dispatch = useDispatch();
    const { projects, status, error } = useSelector(state => state.projects);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProjects());
        }
    }, [dispatch, status]);

    const handleSelectProject = (project) => {
        dispatch(setCurrentProject(project));
   
    };

    return (
        <SafeAreaView style={styles.container}>
            {status === 'loading' && <ActivityIndicator size="large" color="#0000ff" />}
            {status === 'failed' && <Text style={styles.errorText}>Error: {error}</Text>}
            <ScrollView contentContainerStyle={styles.scrollView}>
                {projects.map((project, index) => (
                    <ListItem
                        key={project.id}
                        bottomDivider
                        containerStyle={[styles.listItem, { backgroundColor: index % 2 === 0 ? '#ffebcd' : '#ffe4e1' }]}
                        onPress={() => handleSelectProject(project)}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{project.name}</ListItem.Title>
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listItem: {
        width: '100%',
        marginVertical: 4,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
    },
});

export default ProjectsList;
