// seed.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { faker } = require('@faker-js/faker');

// Asegúrate de usar tus modelos
const User = require('./models/user');
const Publication = require('./models/publication');
const Follow = require('./models/follow'); // asegúrate de importar el modelo

mongoose.connect('mongodb+srv://admin:!123Friends@cluster0.hpqftkg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function createFakeUsers(count = 10) {
    const users = [];

    for (let i = 0; i < count; i++) {
        const firstname = faker.person.firstName();
        const lastname = faker.person.lastName();
        const email = faker.internet.email({ firstName: firstname, lastName: lastname });
        const nick = faker.internet.userName({ firstName: firstname, lastName: lastname });
        const avatar = faker.image.avatar();
        const password = await bcrypt.hash('123456', 10); // contraseña por defecto

        const user = new User({
            name: firstname,
            lastname: lastname,
            nick: nick.toLowerCase(),
            email: email.toLowerCase(),
            password: password,
            image: avatar,
            bio: faker.person.bio()
        });

        await user.save();
        users.push(user);
    }

    return users;
}

async function createFakePublications(users, countPerUser = 3) {
    // Set de imágenes directas de Unsplash (categoría tecnología)
    const techImages = [
        "https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?w=800&h=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1581091215367-59ab6a6c6c5f?w=800&h=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&h=600&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&h=600&auto=format&fit=crop&q=80"
    ];

    for (const user of users) {
        for (let i = 0; i < countPerUser; i++) {
            const randomImage = techImages[Math.floor(Math.random() * techImages.length)];

            const publication = new Publication({
                text: faker.lorem.paragraph(),
                user: user._id,
                file: randomImage, // URL directa de imagen
                created_at: new Date()
            });

            await publication.save();
        }
    }
}



async function createFakeFollows(users, followsPerUser = 3) {
    for (const user of users) {
        // Filtra a los usuarios que no sean el mismo
        const others = users.filter(u => u._id.toString() !== user._id.toString());

        // Si no hay usuarios disponibles para seguir, no se crea ninguna relación
        if (others.length === 0) continue;

        // Escoge aleatoriamente a quién seguir (sin repetir)
        const followedSet = new Set();
        while (followedSet.size < followsPerUser && followedSet.size < others.length) {
            const randomUser = others[Math.floor(Math.random() * others.length)];
            followedSet.add(randomUser._id.toString());
        }

        // Guardar las relaciones de seguimiento
        for (const followedId of followedSet) {
            if (followedId && followedId !== 'null') { // Verifica que el ID sea válido
                const follow = new Follow({
                    user: user._id,
                    followed: followedId
                });

                // Asegúrate de que no se creen relaciones con valores nulos o inválidos
                if (followedId !== null && followedId !== undefined && followedId !== "") {
                    await follow.save();
                }
            }
        }
    }
}




async function seed() {
    console.log('🔄 Limpiando base de datos...');
    await User.deleteMany();
    await Publication.deleteMany();
    await Follow.deleteMany();

    console.log('👥 Creando usuarios falsos...');
    const users = await createFakeUsers(10);

    console.log('📝 Creando publicaciones...');
    await createFakePublications(users, 5);

    console.log('🔗 Creando relaciones de seguimiento...');
    await createFakeFollows(users, 3);

    console.log('✅ ¡Todo listo!');
    mongoose.disconnect();
}


seed().catch((err) => {
    console.error('❌ Error al generar datos:', err);
    mongoose.disconnect();
});
