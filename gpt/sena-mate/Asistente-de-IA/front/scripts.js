// ----------------------------
// Contenedores del DOM
// ----------------------------
const messagesContainer = document.getElementById("messages"); // chat principal
const userInput = document.getElementById("userInput");       // input del usuario
const chatList = document.getElementById("chatList");         // sidebar con historial de chats

// ----------------------------
// Historial de chats en memoria
// ----------------------------
let chatHistory = [];

// ----------------------------
// Función: Agregar mensaje al chat principal
// ----------------------------
function addMessage(text, sender = "bot") {
  const messageDiv = document.createElement("div");
  messageDiv.classList.add("message", sender); // 'bot' o 'user'

  // Imagen del avatar
  const logo = document.createElement("img");
  logo.src = "../assets/avatar.png"; // usa ruta correcta para que no dé error 404
  logo.classList.add("logo");
  messageDiv.appendChild(logo);

  // Texto del mensaje
  const textDiv = document.createElement("div");
  textDiv.classList.add("text");
  textDiv.textContent = text;
  messageDiv.appendChild(textDiv);

  // Agregar al contenedor y hacer scroll automático
  messagesContainer.appendChild(messageDiv);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ----------------------------
// Función: Agregar un ítem a la lista lateral (sidebar)
// ----------------------------
function addChatItem(text) {
  if (!chatList) return; // evita errores si chatList es null
  const chatDiv = document.createElement("div");
  chatDiv.classList.add("chat-item");
  chatDiv.innerHTML = `<i class="fa-regular fa-comment"></i> ${text}`;
  chatList.appendChild(chatDiv);
}

// ----------------------------
// Función: Enviar mensaje al backend
// ----------------------------
async function sendMessage() {
  const question = userInput.value.trim();

  // Validación mínima de 5 caracteres (evita error 422)
  if (!question || question.length < 5) {
    addMessage("Escribe al menos 5 caracteres", "bot");
    return;
  }

  // Mostrar mensaje del usuario en el chat
  addMessage(question, "user");

  // Guardar en historial y sidebar
  chatHistory.push({ sender: "user", text: question });
  addChatItem(question);

  // Limpiar input
  userInput.value = "";

  try {
    // Llamada al endpoint FastAPI
    const response = await fetch("http://127.0.0.1:8000/ask", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }) // enviar JSON correctamente
    });

    if (!response.ok) {
      // Manejar errores del backend
      const errorData = await response.json();
      addMessage("Error: " + (errorData.detail || response.statusText));
      return;
    }

    const data = await response.json();
    const answer = data.answer || "No se recibió respuesta del servidor";

    // Mostrar respuesta del bot en chat y sidebar
    addMessage(answer, "bot");
    chatHistory.push({ sender: "bot", text: answer });
    addChatItem(answer);

  } catch (err) {
    console.error(err);
    addMessage("Error de conexión al servidor", "bot");
  }
}

// ----------------------------
// Enviar mensaje al presionar Enter
// ----------------------------
userInput.addEventListener("keypress", function(e) {
  if (e.key === "Enter") sendMessage();
});

// ----------------------------
// Cargar historial desde localStorage al iniciar
// ----------------------------
window.addEventListener("load", () => {
  const savedHistory = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  savedHistory.forEach(msg => {
    addMessage(msg.text, msg.sender);
    addChatItem(msg.text);
    chatHistory.push(msg);
  });
});

// ----------------------------
// Guardar historial en localStorage antes de cerrar la página
// ----------------------------
window.addEventListener("beforeunload", () => {
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
});
