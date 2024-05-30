// screens/ProjectsList.js
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet, ScrollView, Modal } from "react-native";
import { Button, Text, ListItem } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, fetchProjects, setCurrentProject } from "../store/reducers/projectsActions";
import { SafeAreaView } from "react-native-safe-area-context";

const ProjectsList = ({ navigation }) => {
    const dispatch = useDispatch();
    const { projects, status, error } = useSelector(state => state.projects);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProjects());
        }
    }, [dispatch, status]);

    const handleSelectProject = (project) => {
        dispatch(setCurrentProject(project));
        setSelectedProject(project);
       // setModalVisible(true);
       navigation.navigate('EditProject')
    };
    const handleSelectProjectView = (project) => {
        dispatch(setCurrentProject(project));
       // setSelectedProject(project);
       // setModalVisible(true);
       navigation.navigate('ProjectDetails')
    };
    const hideModal = () => {
        setModalVisible(false);
    }

    const handleDeleteProject = (projectId) => {
        dispatch(deleteProject(projectId));
    };
    return (
        <SafeAreaView style={styles.container}>
            {status === 'loading' && <ActivityIndicator size="large" color="#0000ff" />}
            {status === 'failed' && <Text style={styles.errorText}>Error: {error}</Text>}
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Button
                    title="Add Project"
                    onPress={() => navigation.navigate('AddProject')}
                />

                {projects.map((project, index) => (
                    <ListItem
                        key={project.id}
                        bottomDivider
                        containerStyle={[styles.listItem, { backgroundColor: index % 2 === 0 ? '#ffebcd' : '#ffe4e1' }]}
                       
                    >
                        <ListItem.Content>
                            <ListItem.Title>{project.name}</ListItem.Title>
                            <Button title="Delete" onPress={() => handleDeleteProject(project.id)} />
                            <Button title="View" onPress={() => handleSelectProjectView(project)} />
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={hideModal}>
                <View style={styles.modalView}>
                    {
                        selectedProject && (
                            <>
                                <Text style={styles.modalText}>Project Name: {selectedProject.name}</Text>
                                <Text style={styles.modalText}>Description: {selectedProject.description}</Text>
                                <Button title="Edit Project" onPress={() => { hideModal() }} />
                                <Button title="Close" onPress={hideModal} />
                            </>
                        )
                    }

                </View>
            </Modal>
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
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 18,
    },
});

export default ProjectsList;
