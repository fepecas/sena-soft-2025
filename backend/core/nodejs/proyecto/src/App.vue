<template>
  <div class="app-container">
    <h2>Agregar Nuevo Aprendiz</h2>
    <form @submit.prevent="agregarAprendiz">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input type="text" id="nombre" v-model="nuevoAprendiz.nombre" required>
      </div>
      <div class="form-group">
        <label for="centroFormacion">Centro de Formación:</label>
        <input type="text" id="centroFormacion" v-model="nuevoAprendiz.centroFormacion" required>
      </div>
      <div class="form-group">
        <label for="programaFormacion">Programa de Formación:</label>
        <input type="text" id="programaFormacion" v-model="nuevoAprendiz.programaFormacion" required>
      </div>
      <button type="submit">Agregar</button>
    </form>

    <hr>

    <h2>Aprendices por Centro de Formación</h2>
    <p v-if="loading">Cargando datos...</p>
    <p v-if="error">Error al cargar los datos. Por favor, intente de nuevo más tarde.</p>
    <ul v-else-if="!loading && !error">
      <li v-for="item in aprendicesPorCentro" :key="item.centro">
        <strong>{{ item.centro }}</strong>: {{ item.total }} aprendices
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

// Estado reactivo para el formulario de agregar aprendiz
const nuevoAprendiz = ref({
  nombre: '',
  centroFormacion: '',
  programaFormacion: ''
});

// Estado reactivo para la visualización de datos
const aprendicesPorCentro = ref([]);
const loading = ref(true);
const error = ref(null);

// Función para obtener los datos del API
const fetchAprendices = async () => {
  try {
    loading.value = true;
    const response = await axios.get('http://localhost:3000/api/aprendices-por-centro');
    aprendicesPorCentro.value = response.data;
    error.value = null; // Limpiar cualquier error previo
  } catch (err) {
    console.error('Error al obtener datos:', err);
    error.value = err;
  } finally {
    loading.value = false;
  }
};

// Función para agregar un nuevo aprendiz
const agregarAprendiz = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/aprendiz', nuevoAprendiz.value);
    console.log('Aprendiz agregado:', response.data);
    
    // Limpiar el formulario después del éxito
    nuevoAprendiz.value = { nombre: '', centroFormacion: '', programaFormacion: '' };

    // Actualizar la lista de aprendices para ver el nuevo registro
    await fetchAprendices();
  } catch (err) {
    console.error('Error al agregar el aprendiz:', err);
    alert('Hubo un error al agregar el aprendiz. Verifique los datos.');
  }
};

// Hook del ciclo de vida para cargar los datos cuando el componente se monta
onMounted(fetchAprendices);
</script>

<style scoped>
.app-container {
  font-family: Arial, sans-serif;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input[type="text"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
hr {
  margin: 30px 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  background-color: #f4f4f4;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 4px;
}
</style>