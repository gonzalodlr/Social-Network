/** @format */

import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface Comment {
  id: string;
  user: string;
  content: string;
}

const commentsData: Comment[] = [
  { id: "1", user: "jU4n1t0", content: "¡Qué gran post! 🔥" },
  { id: "2", user: "SoccerFan34", content: "Completamente de acuerdo 👌" },
  { id: "3", user: "NTTDataES", content: "Información muy interesante." },
];

const CommentsModal = ({ modalVisible, setModalVisible }: any) => {
  const [comments, setComments] = useState<Comment[]>(commentsData);
  const [newComment, setNewComment] = useState<string>("");

  const handleAddComment = () => {
    if (newComment.trim().length > 0) {
      const newCommentObject: Comment = {
        id: (comments.length + 1).toString(),
        user: "UsuarioActual", // Simula el nombre del usuario actual
        content: newComment,
      };
      setComments([...comments, newCommentObject]);
      setNewComment("");
    }
  };

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Comentarios</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>

        {/* Comments List */}
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.commentUser}>{item.user}</Text>
              <Text style={styles.commentContent}>{item.content}</Text>
            </View>
          )}
          style={styles.commentsList}
        />

        {/* Input Section */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Añade un comentario..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity
            style={styles.publishButton}
            onPress={handleAddComment}
          >
            <Text style={styles.publishButtonText}>Publicar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default CommentsModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: "#007bff",
    fontWeight: "bold",
  },
  commentsList: {
    flex: 1,
    padding: 16,
  },
  commentContainer: {
    marginBottom: 12,
  },
  commentUser: {
    fontWeight: "bold",
    fontSize: 14,
  },
  commentContent: {
    fontSize: 14,
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    padding: 8,
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  publishButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  publishButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
