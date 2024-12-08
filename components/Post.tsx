/** @format */

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Modal,
  ImageBackground,
  Dimensions,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import Video from "react-native-video";
import CommentsModal, { commentsData } from "./Comment";
import { getCurrentUser } from "@/helpers/currentUser";

const verifiedIcon = require("@/assets/images/verificado.png");
const pdfIcon = require("@/assets/images/pdfIcon.png");

type PostProps = {
  title: string;
  content: string;
  topic: string;
  author: string;
  media?: any;
};

type Comment = {
  id: string;
  user: string;
  content: string;
};

const colors = [
  "#4B0082", // Indigo
  "#2F4F4F", // DarkSlateGray
  "#000080",
  "#800080",
  "#8B4513",
  "#A52A2A",
  "#2E8B57",
  "#483D8B",
];

const influencersNames = ["Moreno", "Gonzalo", "juan", "pedro", "luis"];

const topicColors: { [key: string]: string } = {
  Todos: "gray",
  Videojuegos: "blue",
  Deportes: "green",
  Anuncio: "yellow",
  Moda: "purple",
};

const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

let devideHeight = Dimensions.get("window").height;
let devideWidth = Dimensions.get("window").width;

const Post = ({ title, content, topic, author, media }: PostProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [commentsVisible, setCommentsVisible] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]); // Comentarios por post
  const [newComment, setNewComment] = useState<string>("");
  const authorColor = getRandomColor();

  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getCurrentUser();
      setNombre(currentUser);
    };

    fetchCurrentUser();
  }, []);

  const openComments = () => {
    setCommentsVisible(true);
  };

  const handleAuthorPress = () => {
    console.log(`Author ${author} clicked`);
  };

  if (
    media.mimeType?.startsWith("application/") ||
    media.uri?.startsWith("data:video/")
  ) {
    console.log("Media object:", media);
    console.log("MIME type:", media?.mimeType);
    console.log("URI:", media?.uri);
  }
  const handleImagePress = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <ThemedView style={styles.postContainer}>
      <View style={styles.header}>
        <View style={{ flex: 0.7, flexDirection: "column" }}>
          <ThemedText type="title" style={styles.blackText}>
            {title}
          </ThemedText>
          <TouchableOpacity
            onPress={handleAuthorPress}
            style={styles.authorContainer}
          >
            <Text style={styles.authorText}>
              por <Text style={{ color: authorColor }}>{author}</Text>
              {influencersNames.includes(author) && (
                <Image source={verifiedIcon} style={styles.verifiedIcon} />
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.topicContainer,
            topic === "Anuncio"
              ? styles.anuncioTopicContainer
              : { backgroundColor: topicColors[topic] || "gray" },
          ]}
        >
          <Text
            style={[
              styles.topicLabel,
              topic === "Anuncio" && styles.anuncioTopicLabel,
            ]}
          >
            {topic}
          </Text>
        </View>
      </View>

      <ThemedText style={[styles.blackText, styles.content]}>
        {content}
      </ThemedText>

      {media && (
        <>
          {(media.mimeType?.startsWith("image/") ||
            media.uri?.startsWith("data:image") ||
            media.uri?.startsWith("/assets/")) && (
            <>
              <TouchableOpacity
                onPress={handleImagePress}
                accessibilityLabel="Ampliar imagen"
                accessible={true}
              >
                <Image
                  source={{ uri: media.uri }}
                  resizeMode="contain"
                  style={styles.image}
                />
              </TouchableOpacity>
              <Modal
                visible={modalVisible}
                transparent={true}
                style={styles.modalContainer}
                accessible={true}
                accessibilityLabel="Imagen ampliada"
              >
                <View style={styles.modalContainer}>
                  <TouchableOpacity
                    onPress={handleCloseModal}
                    accessible={true}
                    accessibilityLabel="Cerrar imagen ampliada"
                  >
                    <ImageBackground
                      source={
                        media.uri.startsWith("data:image")
                          ? { uri: (media as { uri: string }).uri }
                          : media.uri
                      }
                      resizeMode="contain"
                      style={{
                        height: devideHeight * 0.9,
                        width: devideWidth * 0.9,
                        alignSelf: "center",
                        marginTop: devideHeight * 0.05,
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </Modal>
            </>
          )}

          {(media.mimeType?.startsWith("application/") ||
            media.uri?.startsWith("data:application/pdf")) && (
            <TouchableOpacity
              onPress={() => {
                const pdfWindow = window.open("");
                pdfWindow?.document.write(
                  `<h1>${media.name}</h1><iframe width='100%' height='100%' src='${media.uri}'></iframe>`
                );
              }}
              style={styles.documentContainer}
            >
              <Text style={styles.documentText}>View Document</Text>
              <Image source={pdfIcon} style={styles.pdf} />
            </TouchableOpacity>
          )}

          {media.mimeType?.startsWith("video/") && (
            <View style={styles.vistaMedia}>
              <Video
                source={{ uri: media.uri }}
                style={styles.video}
                resizeMode="contain"
                controls
              />
            </View>
          )}

          {/\.(mp3|wav|ogg)$/i.test(media.uri) && (
            <TouchableOpacity
              onPress={() => console.log("Audio clicked")}
              style={styles.documentContainer}
            >
              <Text style={styles.documentText}>Play Audio</Text>
            </TouchableOpacity>
          )}
        </>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.postButton} onPress={openComments}>
          <Icon name="comment" size={20} color="#000" />
          <CommentsModal
            modalVisible={commentsVisible}
            setModalVisible={setCommentsVisible}
            initialComments={comments}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.postButton}
          onPress={() => {
            console.log("Like button clicked" + "heart-" + title);
            // cambiar estilo de icono a rojo o negro
            const heartElement = document.getElementById(`heart-${title}`);
            if (heartElement) {
              heartElement.style.color =
                heartElement.style.color === "red" ? "black" : "red";
            }
          }}
        >
          <Icon id={`heart-${title}`} name="heart" size={20} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.postButton}>
          <Icon name="share" size={20} color="#000" />
        </TouchableOpacity>
      </View>

      <View></View>
      <View style={styles.commentsSection}>
        <View style={styles.commentsDivider} />
        {commentsData.slice(0, 2).map((comment) => (
          <View key={comment.id} style={styles.commentContainer}>
            <Text style={styles.commentUser}>{comment.user}</Text>
            <Text style={styles.commentContent}>{comment.content}</Text>
          </View>
        ))}
        {commentsData.length > 2 && (
          <TouchableOpacity onPress={openComments}>
            <Text style={styles.viewAllComments}>
              Ver todos los comentarios
            </Text>
          </TouchableOpacity>
        )}
      </View>
      {/* <View style={styles.commentsSection}>
        {comments.slice(0, 2).map((comment) => (
          <View key={comment.id} style={styles.commentContainer}>
            <Text style={styles.commentUser}>{comment.user}</Text>
            <Text style={styles.commentContent}>{comment.content}</Text>
          </View>
        ))}
        {comments.length > 2 && (
          <TouchableOpacity onPress={openComments}>
            <Text style={styles.viewAllComments}>
              View all {comments.length} comments
            </Text>
          </TouchableOpacity>
        )}
        <View style={styles.addCommentContainer}>
          <TextInput
            style={styles.addCommentInput}
            placeholder="Add a comment..."
            value={newComment}
            onChangeText={setNewComment}
          />
          <TouchableOpacity onPress={handleAddComment}>
            <Text style={styles.postCommentButton}>Post</Text>
          </TouchableOpacity>
        </View>
      </View> */}
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  blackText: {
    color: "#000",
  },
  authorContainer: {
    marginTop: 8,
    alignSelf: "flex-start",
    fontSize: 12,
    fontWeight: "bold",
  },
  authorText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  content: {
    marginTop: 8,
  },
  topicContainer: {
    backgroundColor: "green",
    position: "absolute",
    right: 0,
    top: 0,
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  anuncioTopicContainer: {
    backgroundColor: "yellow",
  },
  topicLabel: {
    color: "#fff",
    fontWeight: "bold",
    userSelect: "none",
  },
  anuncioTopicLabel: {
    color: "#000",
  },
  image: {
    width: "100%",
    height: 200,
    aspectRatio: 1 / 1,
    position: "relative",
    borderRadius: 8,
    marginTop: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: 8, // Add margin to separate buttons from content
  },
  postButton: {
    padding: 8,
    marginRight: 8,
    backgroundColor: "#ddd",
    borderRadius: 4,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullImage: {
    borderRadius: 6,
    aspectRatio: 16 / 9,
    width: "70%",
    height: "auto",
  },
  closeButton: {
    position: "static",
    backgroundColor: "#c45f4a",
    padding: 8,
    borderRadius: 50,
    alignSelf: "flex-end",
    margin: 36,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  verifiedIcon: {
    width: 26,
    height: 26,
    marginTop: 6,
  },
  video: {
    position: "relative",
    width: "80%",
    height: 200,
    marginTop: 8,
    borderRadius: 8,
  },
  documentContainer: {
    backgroundColor: "#fff", // dark grey
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
    marginBottom: 6,
    alignItems: "center",
  },
  documentText: {
    color: "blue",
  },
  vistaMedia: {
    marginLeft: "25%",
    marginRight: "25%",
    height: 260,
    alignItems: "center",
    marginVertical: 10,
  },
  pdf: {
    width: 100,
    height: 100,
  },
  commentsSection: {
    marginTop: 16,
  },
  commentContainer: {
    marginBottom: 12,
  },
  commentUser: {
    fontWeight: "bold",
    fontSize: 14,
  },
  commentsDivider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
  commentContent: {
    fontSize: 14,
    color: "#333",
  },
  viewAllComments: {
    color: "#007bff",
    fontSize: 14,
    fontWeight: "bold",
  },
  addCommentContainer: {
    flexDirection: "row",
    marginTop: 16,
  },
  addCommentInput: {
    flex: 1,
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 8,
  },
  postCommentButton: {
    backgroundColor: "#007bff",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    color: "#fff",
  },
});

export default Post;
