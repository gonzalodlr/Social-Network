/** @format */

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Modal,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import axios from "axios";
import { getCurrentUser } from "@/helpers/currentUser";

interface Comment {
  id: string;
  user: string;
  content?: string;
  gifUrl?: string;
}

export const commentsData: Comment[] = [
  { id: "1", user: "jU4n1t0", content: "¡Qué gran post! 🔥" },
  { id: "2", user: "SoccerFan34", content: "Completamente de acuerdo 👌" },
  { id: "3", user: "Willyrex", content: "Información muy interesante." },
];

const API_KEY = "OiGR1ldfHucJQ3zRFCvak1SVWnIU0s3c";
const GIPHY_API_URL = "https://api.giphy.com/v1/gifs/search";

type CommentsModalProps = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  initialComments: Comment[]; // Prop para los comentarios iniciales
};

const defaultSuggestions = [
  "¡Muy interesante!",
  "¡Me gusta!",
  "👌🏻👌🏻👌🏻",
  "🔥🔥🔥",
  "❤️❤️❤️",
];

const CommentsModal = ({
  modalVisible,
  setModalVisible,
  initialComments,
}: CommentsModalProps) => {
  const [comments, setComments] = useState<Comment[]>(commentsData);
  const [newComment, setNewComment] = useState<string>("");
  const [gifModalVisible, setGifModalVisible] = useState(false);
  const [searchResults, setSearchResults] = useState<string[]>([]); // URLs de los GIFs encontrados
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getCurrentUser();
      setNombre(currentUser);
    };

    fetchCurrentUser();
  }, []);

  const handleAddComment = (content: string) => {
    if (newComment.trim().length > 0) {
      const newCommentObject: Comment = {
        id: (comments.length + 1).toString(),
        user: nombre,
        content: newComment,
      };
      setComments([...comments, newCommentObject]);
      setNewComment("");
    }
  };

  const handleGifPublish = (gifUrl: string) => {
    const newCommentObject: Comment = {
      id: (comments.length + 1).toString(),
      user: "UsuarioActual",
      gifUrl, // Establecer URL del GIF
    };
    setComments([...comments, newCommentObject]); // Actualizar la lista de comentarios
    setGifModalVisible(false); // Cerrar el modal de GIFs
  };

  const handleSuggestionClick = (suggestion: string) => {
    setNewComment(suggestion); // Pone la sugerencia en la caja de texto
  };

  const fetchGifs = async () => {
    try {
      const response = await axios.get(GIPHY_API_URL, {
        params: {
          api_key: API_KEY,
          q: searchTerm,
          limit: 33,
        },
      });
      const gifs = response.data.data.map(
        (gif: any) => gif.images.fixed_height.url
      );
      setSearchResults(gifs);
    } catch (error) {
      console.error("Error fetching GIFs:", error);
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
              {/* Renderizar contenido del comentario si existe */}
              {item.content && (
                <Text style={styles.commentContent}>{item.content}</Text>
              )}
              {/* Renderizar GIF si existe */}
              {item.gifUrl && (
                <Image
                  source={{ uri: item.gifUrl }}
                  style={styles.gif} // Ajusta el tamaño y estilo del GIF
                />
              )}
            </View>
          )}
          style={styles.commentsList}
        />
        {/* Comment Suggestions */}
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsTitle}>Sugerencias:</Text>
          <View style={styles.suggestionsList}>
            {defaultSuggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionButton}
                onPress={() => handleSuggestionClick(suggestion)}
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

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
            onPress={() => handleAddComment(newComment)}
          >
            <Text style={styles.publishButtonText}>Publicar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.gifButton}
            onPress={() => setGifModalVisible(true)} // Muestra el modal de GIFs
          >
            <Text style={styles.gifButtonText}>GIF</Text>
          </TouchableOpacity>
        </View>

        {/* GIF Modal */}
        {gifModalVisible && (
          <Modal
            visible={gifModalVisible}
            animationType="slide"
            onRequestClose={() => setGifModalVisible(false)}
          >
            <View style={styles.gifModalContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar GIFs..."
                value={searchTerm}
                onChangeText={setSearchTerm}
              />
              <TouchableOpacity style={styles.searchButton} onPress={fetchGifs}>
                <Text style={styles.searchButtonText}>Buscar</Text>
              </TouchableOpacity>
              <FlatList
                data={searchResults}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleGifPublish(item)}>
                    <Image source={{ uri: item }} style={styles.gif} />
                  </TouchableOpacity>
                )}
                style={styles.gifGrid}
                numColumns={11} // 11 columnas en la cuadrícula
                columnWrapperStyle={styles.columnWrapper} // Estilo para las filas
              />

              <TouchableOpacity
                style={styles.closeGifButton}
                onPress={() => setGifModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        )}
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
  suggestionsContainer: {
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  suggestionsTitle: {
    fontWeight: "bold",
    marginBottom: 8,
    fontSize: 16,
  },
  suggestionsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  suggestionButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  suggestionText: {
    color: "#000",
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
  gif: {
    width: 130,
    height: 130,
    margin: 2,
    borderRadius: 4,
  },
  gifGrid: {
    flex: 1,
    marginHorizontal: 5,
  },

  columnWrapper: {
    justifyContent: "space-between",
    marginVertical: 5,
  },

  gifButton: {
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginLeft: 8,
  },
  gifButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
  gifModalContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 16,
  },
  searchButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  gifList: {
    flexGrow: 0,
    paddingVertical: 10,
  },
  closeGifButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    alignSelf: "center",
  },
});
