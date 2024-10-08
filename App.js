import React, { useReducer, useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';

function todoReducer(state, action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [...state, { description: action.text, completed: false }];
    case 'TOGGLE_TODO':
      return state.map((todo, index) =>
        index === action.index ? { ...todo, completed: !todo.completed } : todo
      );
    case 'REMOVE_TODO':
      return state.filter((_, index) => index !== action.index);
    default:
      throw new Error('Unknown action type');
  }
}

export default function App() {
  const [description, setDescription] = useState(''); 
  const [tasks, dispatch] = useReducer(todoReducer, []); 

 
  const handleAddTask = () => {
    if (description.trim()) {
      dispatch({ type: 'ADD_TODO', text: description });
      setDescription('');  
    }
  };

  
  const handleToggleTask = (index) => {
    dispatch({ type: 'TOGGLE_TODO', index });
  };

 
  const handleRemoveTask = (index) => {
    dispatch({ type: 'REMOVE_TODO', index });
  };

  return (
    <View style={styles.container}>
    
      <View style={styles.form}>
        <TextInput
          value={description}
          onChangeText={text => setDescription(text)}
          placeholder="Add new task..."
          style={styles.input}
        />
        <Button title="Save" onPress={handleAddTask} color="#ff55ff"/>
        <StatusBar style="auto"/>
      </View>

     
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
        
            <TouchableOpacity onPress={() => handleToggleTask(index)}>
              <Text style={[styles.taskText, item.completed && styles.completedTask]}>
                {item.description}
              </Text>
            </TouchableOpacity>

            <Button title="Delete" onPress={() => handleRemoveTask(index)}color="#ff55ff" />
          </View>
        )}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50, 
    backgroundColor: '#fff',
  },
  form: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flex: 1,
    marginRight: 10,
    padding: 5,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  taskText: {
    fontSize: 18,
  },
  completedTask: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  button:{
    color:'pink',
  }
});