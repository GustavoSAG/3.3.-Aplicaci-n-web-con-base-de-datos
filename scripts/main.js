document.addEventListener('DOMContentLoaded', function () {
    const addForm = document.getElementById('addForm');
    const itemList = document.getElementById('itemList');

    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const itemNameInput = document.getElementById('itemName');
        const itemName = itemNameInput.value;

        if (itemName) {
            // Agregamos el nuevo registro a la lista y guardamos en Local Storage
            const li = document.createElement('li');
            li.textContent = itemName;
            itemList.appendChild(li);

            // Limpiamos el campo de entrada
            itemNameInput.value = '';

            // Guardamos en Local Storage
            const items = JSON.parse(localStorage.getItem('items')) || [];
            items.push(itemName);
            localStorage.setItem('items', JSON.stringify(items));
        }
    });

    // Cargamos los registros almacenados en Local Storage al cargar la página
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    storedItems.forEach(function (item) {
        const li = document.createElement('li');
        li.textContent = item;
        itemList.appendChild(li);
    });

    // Eliminamos los registros al hacer clic en ellos
    itemList.addEventListener('click', function (event) {
        if (event.target.tagName === 'LI') {
            event.target.remove();

            // Actualizamos Local Storage después de la eliminación
            const items = Array.from(itemList.children).map(li => li.textContent);
            localStorage.setItem('items', JSON.stringify(items));
        }
    });
});
