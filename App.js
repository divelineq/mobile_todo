import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function App() {
    const [task, setTask] = useState("");
    const [tasks, setTasks] = useState([]);
    const [search, setSearch] = useState("");
    const [filteredTasks, setFilteredTasks] = useState([]);

    useEffect(() => {
        loadTasks();
    }, []);

    useEffect(() => {
        saveTasks();
    }, [tasks]);

    useEffect(() => {
        if (search.trim() === "") {
            setFilteredTasks(tasks);
        } else {
            const filtered = tasks.filter(item => 
                item.text.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredTasks(filtered);
        }
    }, [search, tasks]);

    const loadTasks = async () => {
        try {
            const storedTasks = await AsyncStorage.getItem("tasks");
            if (storedTasks) {
                const parsedTasks = JSON.parse(storedTasks);
                setTasks(parsedTasks);
                setFilteredTasks(parsedTasks);
            }
        } catch (error) {
            console.log("Ошибка при загрузке задач:", error);
        }
    };

    const saveTasks = async () => {
        try {
            await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
        } catch (error) {
            console.log("Ошибка при сохранении задач:", error);
        }
    };

    const addTask = () => {
        if (task.trim() === "") {
            if (Platform.OS === 'web') {
                window.alert("Ошибка\nПожалуйста заполните текст задачи");
            } else {
                Alert.alert("Ошибка", "Пожалуйста заполните текст задачи", [{ text: "OK" }]);
            }
            return;
        }
        const newTask = { id: Date.now().toString(), text: task.trim() };
        setTasks([...tasks, newTask]);
        setTask("");
    };

    const editTask = (id) => {
        const taskToEdit = tasks.find(task => task.id === id);
        
        if (!taskToEdit) return;
        
        const editMessage = `Редактировать задачу:\n"${taskToEdit.text}"\n\nВведите новый текст:`;
        
        if (Platform.OS === 'web') {
            const newText = window.prompt(editMessage, taskToEdit.text);
            if (newText !== null && newText.trim() !== "") {
                setTasks(tasks.map(task => 
                    task.id === id ? {...task, text: newText.trim()} : task
                ));
            }
        } else {
            Alert.prompt(
                "Редактировать задачу",
                `Текущий текст: "${taskToEdit.text}"`,
                [
                    { text: "Отмена", style: "cancel" },
                    { 
                        text: "Сохранить", 
                        onPress: (newText) => {
                            if (newText && newText.trim() !== "") {
                                setTasks(tasks.map(task => 
                                    task.id === id ? {...task, text: newText.trim()} : task
                                ));
                            }
                        }
                    }
                ],
                'plain-text',
                taskToEdit.text
            );
        }
    };

    const deleteTask = (id, taskText) => {
        const deleteMessage = `Удалить задачу "${taskText}"?`;
        
        if (Platform.OS === 'web') {
            if (window.confirm(deleteMessage)) {
                setTasks(tasks.filter((task) => task.id !== id));
            }
        } else {
            Alert.alert("Удалить задачу?", deleteMessage, [
                { text: "Отмена", style: "cancel" },
                {
                    text: "Удалить",
                    onPress: () => setTasks(tasks.filter((task) => task.id !== id)),
                    style: 'destructive'
                },
            ]);
        }
    };

    const clearSearch = () => {
        setSearch("");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Кейс задача 4</Text>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Поиск задач..."
                    value={search}
                    onChangeText={setSearch}
                    clearButtonMode="while-editing"
                />
                {search.length > 0 && (
                    <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
                        <Text style={styles.clearButtonText}>✕</Text>
                    </TouchableOpacity>
                )}
            </View>

            <Text style={styles.resultsText}>
                Найдено задач: {filteredTasks.length} из {tasks.length}
            </Text>

            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Что вы хотите сделать..."
                    value={task}
                    onChangeText={setTask}
                    onSubmitEditing={addTask}
                    returnKeyType="done"
                />
                <TouchableOpacity style={styles.addButton} onPress={addTask}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>

            {search.length > 0 && filteredTasks.length === 0 ? (
                <View style={styles.noResults}>
                    <Text style={styles.noResultsText}>Задачи не найдены</Text>
                    <Text style={styles.noResultsSubtext}>
                        Попробуйте изменить поисковый запрос
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={filteredTasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.taskItem}>
                            <TouchableOpacity 
                                style={styles.taskContent}
                                onPress={() => editTask(item.id)}
                            >
                                <Text style={styles.taskText}>{item.text}</Text>
                            </TouchableOpacity>
                            <View style={styles.buttonsContainer}>
                                <TouchableOpacity 
                                    style={styles.editButton}
                                    onPress={() => editTask(item.id)}
                                >
                                    <Text style={styles.editButtonText}>✏️</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.deleteButton}
                                    onPress={() => deleteTask(item.id, item.text)}
                                >
                                    <Text style={styles.deleteButtonText}>❌</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )}
                    ListEmptyComponent={
                        <View style={styles.emptyList}>
                            <Text style={styles.emptyListText}>Список задач пуст</Text>
                            <Text style={styles.emptyListSubtext}>
                                Добавьте свою первую задачу выше
                            </Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        padding: 20, 
        backgroundColor: "#f5f5f5",
        paddingTop: 50 
    },
    title: {
        fontSize: 28,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#2196F3"
    },
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
        position: 'relative'
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#ddd",
        padding: 12,
        paddingRight: 40,
        borderRadius: 8,
        backgroundColor: "#fff",
        fontSize: 16
    },
    clearButton: {
        position: 'absolute',
        right: 10,
        padding: 5
    },
    clearButtonText: {
        fontSize: 18,
        color: '#888'
    },
    resultsText: {
        fontSize: 14,
        color: "#666",
        marginBottom: 15,
        textAlign: "center"
    },
    inputContainer: { 
        flexDirection: "row", 
        marginBottom: 20 
    },
    input: {
        flex: 1,
        borderWidth: 2,
        borderColor: "#2196F3",
        padding: 15,
        borderRadius: 8,
        backgroundColor: "#fff",
        fontSize: 16,
        marginRight: 10
    },
    addButton: {
        backgroundColor: "#2196F3",
        padding: 15,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60
    },
    addButtonText: { 
        color: "#fff", 
        fontSize: 24, 
        fontWeight: "bold",
        lineHeight: 24
    },
    taskItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2
    },
    taskContent: {
        flex: 1,
        marginRight: 10
    },
    taskText: { 
        fontSize: 16,
    },
    buttonsContainer: {
        flexDirection: "row",
        alignItems: "center"
    },
    editButton: {
        padding: 8,
        marginRight: 10
    },
    editButtonText: {
        fontSize: 18
    },
    deleteButton: {
        padding: 5
    },
    deleteButtonText: {
        fontSize: 18
    },
    noResults: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40
    },
    noResultsText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 10
    },
    noResultsSubtext: {
        fontSize: 16,
        color: '#999',
        textAlign: 'center'
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40
    },
    emptyListText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#666',
        marginBottom: 10
    },
    emptyListSubtext: {
        fontSize: 14,
        color: '#999',
        textAlign: 'center'
    }
});