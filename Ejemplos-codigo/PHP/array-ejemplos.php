<?php

// Bueno, pues pensamos  que la gracia de seria la siguiente. ByteMaster dice: Los arrays son como cajas donde puedes guardar varias cosas en una sola variable.

$frutas = ["manzana", "banana", "cereza"];

// Recorrer el array usando foreach
foreach ($frutas as $fruta) {
    echo "Me encanta la $fruta\n"; // Imprime cada fruta
}

// Acceder a un elemento específico
echo "La primera fruta es: " . $frutas[0]; // manzana

// Consejo de ByteMaster: Siempre revisa que el índice exista antes de usarlo para evitar errores.
?>
s