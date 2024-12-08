/** @format */

import { useEffect, useState } from "react";
import {
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  Image,
} from "react-native";
import Post from "@/components/Post";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import * as DocumentPicker from "expo-document-picker";
import { Video } from "react-native-video";
import warzone from "@/assets/images/warzone.jpg";
import futbol from "@/assets/images/futbol.jpg";
import nttdata from "@/assets/images/nttdata.jpg";
import triatlon from "@/assets/images/triatlon.jpg";
const pdfIcon = require("@/assets/images/pdfIcon.png");
import { getCurrentUser } from "../helpers/currentUser";

interface Post {
  id: string;
  title: string;
  topic: string;
  author: string;
  content: string;
  media: {
    uri: string;
    name: string;
    mimeType: string;
  };
}

const logo = require("@/assets/images/posttopiaLogo.png");

const posts = [
  {
    id: "1",
    title: "Estrategias en Call of Duty: Warzone",
    content:
      "Me encanta jugar Call of Duty: Warzone. La emoción de planificar estrategias con mi equipo y ejecutar la emboscada perfecta es inigualable. Las nuevas actualizaciones del mapa han hecho el juego aún más emocionante. Recientemente, descubrí una nueva táctica para dominar en el modo Battle Royale: se trata de utilizar el terreno a nuestro favor, escondiéndonos en lugares estratégicos y atacando en el momento justo. Además, la comunicación constante con el equipo es clave para coordinar movimientos y asegurar la victoria.",
    topic: "Videojuegos",
    author: "jU4n1t0",
    media: warzone, // Add the media property
  },
  {
    id: "2",
    title: "La emoción de ver fútbol en vivo",
    content:
      "No hay nada como la atmósfera de un partido de fútbol en vivo. La energía de la multitud, la habilidad de los jugadores y la imprevisibilidad del juego hacen que cada partido sea una experiencia inolvidable. Recuerdo la última vez que fui al estadio a ver a mi equipo favorito; el ambiente era electrizante. Los cánticos, las banderas ondeando y la emoción de cada gol nos mantenían a todos al borde de nuestros asientos. Además, poder compartir ese momento con amigos y familiares lo hace aún más especial.",
    topic: "Deportes",
    author: "SoccerFan34",
    media: futbol, // Add the media property
  },
  {
    id: "3",
    title:
      "Se acabaron las especulaciones en IA generativa: de experimentos a inversiones reales.",
    content:
      "NTT DATA, ha publicado su informe “Perspectivas para 2025: cómo las organizaciones están forjando su destino con IA generativa“ que revela que ya no hay lugar para especulaciones en lo relativo a esta tecnología. Sus resultados muestran de manera abrumadora que los líderes ejecutivos están pasando de la experimentación a casos de uso a largo plazo que transforman el rendimiento e impactan de lleno en áreas como la cultura corporativa, el compliance, la seguridad y la sostenibilidad.",
    topic: "Anuncio",
    author: "NTTDataES",
    media: nttdata,
  },
  {
    id: "4",
    title: "Adoptando la moda sostenible",
    content:
      "Recientemente, he comenzado a explorar la moda sostenible. Es genial llevar ropa que no solo es estilosa, sino también amigable con el medio ambiente. La moda sostenible se enfoca en reducir el impacto ambiental y promover prácticas éticas en la producción de ropa. He descubierto tiendas de segunda mano increíbles y he aprendido a upcycling, transformando prendas viejas en nuevas piezas únicas. Además, apoyar marcas que se preocupan por el planeta me hace sentir que estoy contribuyendo a un futuro mejor.",
    topic: "Moda",
    author: "EcoFashionista",
  },
  {
    id: "5",
    title: "Mis esfuerzos por mejorar como triatleta!!! 💪💪",
    content:
      "🌟 Entrenamiento de Triatlón: ¡Superando mis límites cada día! 🌟\n\nHoy quiero hablarles de algo que me apasiona profundamente: el triatlón. Es un deporte que va más allá de nadar, pedalear y correr. Es una verdadera prueba de resistencia, disciplina y fortaleza mental. 💪🏊‍♂️🚴‍♂️🏃‍♂️\n\nDesde que me inicié en este mundo, he aprendido muchísimo sobre cómo mi cuerpo y mente pueden superar barreras que jamás imaginé. Y lo mejor es que el triatlón no es solo un desafío físico, sino también un estilo de vida que me ha enseñado a ser más organizado, paciente y constante. ⏱️\n\n🏊‍♂️ La natación es mi primer reto: sumergirse en el agua, controlar la respiración y encontrar un ritmo es clave para comenzar bien el día.\n\n🚴‍♂️ El ciclismo es pura adrenalina: esos kilómetros me enseñan a mantener la calma, el enfoque y a aprovechar al máximo mi energía.\n\n🏃‍♂️ La carrera es el momento de dar todo lo que tengo, de sentir que ya casi termino y que lo que sigue es solo seguir avanzando, sin rendirme.\n\nCada día me esfuerzo más para mejorar mi tiempo, mi técnica y mi resistencia. Y aunque a veces las jornadas de entrenamiento son duras, la recompensa llega cuando logras cruzar esa meta y miras hacia atrás con orgullo. 🏅\n\n✨ Si tú también amas el deporte o estás pensando en iniciarte en el triatlón, te animo a que no te rindas, ¡porque todo es posible con constancia! ✨\n\n",
    topic: "Deportes",
    author: "Moreno",
    media: triatlon,
  },
];

export default function Main() {
  const [nombre, setNombre] = useState("");

  useEffect(() => {
    const fetchCurrentUser = async () => {
      const currentUser = await getCurrentUser();
      setNombre(currentUser);
    };

    fetchCurrentUser();
  }, []);

  const [selectedTopic, setSelectedTopic] = useState("Todos");

  const topics = [
    "Todos",
    ...Array.from(new Set(posts.map((post) => post.topic))),
  ];

  const topicColors: { [key: string]: string } = {
    Todos: "gray",
    Videojuegos: "blue",
    Deportes: "green",
    Anuncio: "yellow",
    Moda: "purple",
  };

  const insets = useSafeAreaInsets();

  const filteredPosts =
    selectedTopic === "Todos"
      ? posts
      : posts.filter((post) => post.topic === selectedTopic);

  const [modalVisible, setModalVisible] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    topic: "",
    author: "",
    content: "",
    media: { uri: "", name: "", mimeType: "" },
  });

  const handlePost = () => {
    const newPostWithId = {
      id: (posts.length + 1).toString(),
      title: newPost.title,
      topic: newPost.topic,
      author: nombre,
      content: newPost.content,
      media: {
        uri: newPost.media.uri,
        name: newPost.media.name,
        mimeType: newPost.media.mimeType,
      },
    };
    posts.unshift(newPostWithId); // Add the new post to the beginning of the posts array
    setModalVisible(false);
    setNewPost({
      title: "",
      topic: "",
      author: "",
      content: "",
      media: { uri: "", name: "", mimeType: "" },
    }); // Reset the new post state
  };

  const handleAddMedia = async () => {
    /* let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }); */

    let result = await DocumentPicker.getDocumentAsync({
      type: "*/*",
      copyToCacheDirectory: true,
    });

    if (!result.canceled) {
      setNewPost({
        ...newPost,
        media: {
          uri: result.assets[0].uri,
          name: result.assets[0].name,
          mimeType: result.assets[0].mimeType || "",
        },
      });

      /* newPost.media = {
        uri: result.assets[0].uri,
        name: result.assets[0].name,
        mimeType: result.assets[0].mimeType || "",
      }; */
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setNewPost({ ...newPost, [field]: value });
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
      <FlatList
        ref={(ref) => {
          if (ref) {
            ref.scrollToOffset({ animated: true, offset: 0 });
          }
        }}
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <Image source={logo} style={styles.logo} />
            </View>
            <View style={styles.topicsContainer}>
              {topics.map((topic) => (
                <TouchableOpacity
                  key={topic}
                  style={[
                    styles.topicButton,
                    selectedTopic === topic && styles.selectedTopicButton,
                    { backgroundColor: topicColors[topic] || "gray" },
                  ]}
                  onPress={() => setSelectedTopic(topic)}
                >
                  <Text
                    style={
                      topic === "Anuncio"
                        ? styles.anuncioText
                        : styles.topicButtonText
                    }
                  >
                    {topic}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.title}>Publicaciones</Text>
          </>
        }
        contentContainerStyle={styles.feedContainer}
        data={filteredPosts}
        renderItem={({ item }) => (
          <Post
            title={item.title}
            content={item.content}
            topic={item.topic}
            author={item.author}
            media={{
              uri: item.media?.uri,
              name: item.media?.name,
              mimeType: item.media?.mimeType,
            }}
          />
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Título"
            onChangeText={(text) => handleInputChange("title", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Contenido"
            onChangeText={(text) => handleInputChange("content", text)}
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => handleInputChange("author", text)}
            value={nombre}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Tema"
            onChangeText={(text) => handleInputChange("topic", text)}
          />
          {newPost.media && newPost.media.mimeType?.startsWith("image/") && (
            <Image
              source={{ uri: newPost.media.uri }}
              style={styles.previewImage}
            />
          )}

          {newPost.media &&
            newPost.media.mimeType?.startsWith("application/") && (
              <Image source={pdfIcon} style={styles.pdf} />
            )}

          {newPost.media && newPost.media.mimeType?.startsWith("video/") && (
            <View
              style={{
                width: 260,
                height: 260,
                alignItems: "center",
                marginVertical: 10,
              }}
            >
              <Video
                source={{ uri: newPost.media.uri }}
                style={styles.video}
                resizeMode="contain"
                controls
              />
            </View>
          )}

          <TouchableOpacity style={styles.mediaButton} onPress={handleAddMedia}>
            <Text style={styles.mediaButtonText}>Añadir Media</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.publicarBtn} onPress={handlePost}>
            <Text style={styles.mediaButtonText}>Publicar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.mediaButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Main background color
  },
  header: {
    backgroundColor: "#fff",
    padding: 6,
    alignItems: "center",
    position: "relative",
  },
  logo: {
    width: 250,
    height: 100,
  },
  feedContainer: {
    padding: 16,
  },
  topicsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
    marginTop: 12,
  },
  topicButton: {
    backgroundColor: "green",
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginHorizontal: 4,
  },
  selectedTopicButton: {
    backgroundColor: "black",
  },
  topicButtonText: {
    color: "#fff",
    fontWeight: "bold",
    userSelect: "none", // Make text non-selectable
  },
  floatingButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#1D3D47",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    color: "#000", // Black text color for title
  },
  modalContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    width: "100%",
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  mediaButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  mediaButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  publicarBtn: {
    backgroundColor: "#28a745",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  previewImage: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  anuncioText: {
    color: "#000",
    fontWeight: "bold",
  },
  pdf: {
    width: 100,
    height: 100,
    marginBottom: 10,
    alignContent: "center",
  },
  video: {
    position: "relative",
    width: "80%",
    height: 200,
    marginTop: 8,
    borderRadius: 8,
  },
});
