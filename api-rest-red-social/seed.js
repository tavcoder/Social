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
    for (const user of users) {
        for (let i = 0; i < countPerUser; i++) {
            const publication = new Publication({
                text: faker.lorem.paragraph(),
                user: user._id,
                file: '', // Si quieres simular imagen, usa faker.image.url()
                created_at: new Date()
            });

            await publication.save();
        }
    }
}

async function createFakeFollows(users, followsPerUser = 3) {
    for (const user of users) {
        const others = users.filter(u => u._id.toString() !== user._id.toString());

        // Escoge aleatoriamente a quién seguir (sin repetir)
        const followedSet = new Set();
        while (followedSet.size < followsPerUser && followedSet.size < others.length) {
            const randomUser = others[Math.floor(Math.random() * others.length)];
            followedSet.add(randomUser._id.toString());
        }

        for (const followedId of followedSet) {
            const follow = new Follow({
                user: user._id,
                followed: followedId
            });
            await follow.save();
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
