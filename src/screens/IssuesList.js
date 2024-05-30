import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, StyleSheet, ScrollView, Modal } from "react-native";
import { Button, Text, ListItem } from "@rneui/base";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import { fetchIssues, setCurrentIssue, deleteIssue } from "../store/reducers/issuesActions";

const IssuesList = ({ projectId, navigation }) => {
    const dispatch = useDispatch();
    const { issues, status, error } = useSelector(state => state.issues);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedIssue, setSelectedIssue] = useState(null);

    useEffect(() => {
        if(projectId){
            dispatch(fetchIssues(projectId));
        }
    }, [dispatch,projectId]);

    const handleSelectIssue = (issue) => {
        dispatch(setCurrentIssue(issue));
        setSelectedIssue(issue);
        setModalVisible(true);
    };

    const handleSelectIssueView = (issue) => {
        dispatch(setCurrentIssue(issue));
        navigation.navigate('IssueDetails');
    };

    const hideModal = () => {
        setModalVisible(false);
    };

    const handleDeleteIssue = (issueId) => {
        dispatch(deleteIssue(issueId));
    };

    return (
        <SafeAreaView style={styles.container}>
            {status === 'loading' && <ActivityIndicator size="large" color="#0000ff" />}
            {status === 'failed' && <Text style={styles.errorText}>Error: {error}</Text>}
            <ScrollView contentContainerStyle={styles.scrollView}>
                <Button
                    title="Add Issue"
                    onPress={() => navigation.navigate('AddIssue')}
                />

                {issues && issues.map((issue, index) => (
                    <ListItem
                        key={issue.id}
                        bottomDivider
                        containerStyle={[styles.listItem, { backgroundColor: index % 2 === 0 ? '#ffebcd' : '#ffe4e1' }]}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{issue.title}</ListItem.Title>
                            <Button title="Delete" onPress={() => handleDeleteIssue(issue.id)} />
                            <Button title="View" onPress={() => handleSelectIssueView(issue)} />
                        </ListItem.Content>
                    </ListItem>
                ))}
            </ScrollView>

            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={hideModal}>
                <View style={styles.modalView}>
                    {selectedIssue && (
                        <>
                            <Text style={styles.modalText}>Issue Title: {selectedIssue.title}</Text>
                            <Text style={styles.modalText}>Description: {selectedIssue.description}</Text>
                            <Button title="Edit Issue" onPress={() => navigation.navigate('EditIssue', { issue: selectedIssue })} />
                            <Button title="Close" onPress={hideModal} />
                        </>
                    )}
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

export default IssuesList;
