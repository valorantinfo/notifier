document.addEventListener("DOMContentLoaded", function() {
    const startButton = document.getElementById("startButton");
    const webhookInput = document.getElementById("webhookInput");

    startButton.addEventListener("click", function() {
        const webhookUrl = webhookInput.value.trim();

        if (webhookUrl === "") {
            alert("Por favor, ingrese una URL de webhook válida.");
            return;
        }

        // Obtener juegos gratuitos y enviar notificaciones a Discord
        fetch('https://www.freetogame.com/api/games?platform=pc')
            .then(response => response.json())
            .then(data => {
                data.forEach(game => {
                    const title = game.title || 'N/A';
                    const description = game.short_description || 'No description available.';
                    const genre = game.genre || 'N/A';
                    const platform = game.platform || 'N/A';
                    const publisher = game.publisher || 'N/A';
                    const developer = game.developer || 'N/A';
                    const release_date = game.release_date || 'N/A';
                    const game_url = game.game_url || 'N/A';
                    const thumbnail_url = game.thumbnail || 'N/A';

                    // Crear el mensaje para la notificación
                    const message = {
                        content: '',
                        embeds: [{
                            title: title,
                            description: description,
                            color: 16729344,
                            fields: [
                                { name: 'Género', value: genre, inline: true },
                                { name: 'Plataforma', value: platform, inline: true },
                                { name: 'Publicador', value: publisher, inline: true },
                                { name: 'Desarrollador', value: developer, inline: true },
                                { name: 'Fecha de lanzamiento', value: release_date, inline: true },
                                { name: 'Enlace al juego', value: `[¡Juega aquí!](${game_url})`, inline: false }
                            ],
                            thumbnail: { url: thumbnail_url }
                        }]
                    };

                    // Enviar la notificación a Discord utilizando la URL del webhook
                    fetch(webhookUrl, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(message)
                    })
                    .then(response => {
                        if (response.ok) {
                            console.log(`Notificación enviada para el juego: ${title}`);
                        } else {
                            console.error(`Error al enviar la notificación para el juego: ${title}`);
                        }
                    });
                });
            });
    });
});
