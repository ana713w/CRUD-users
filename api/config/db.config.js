const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI)
    .then(() => console.info(`Succeddfully connected to the database`))
    .catch((error) => {
        console.error(`An error occured trying to connect to the database`, error);
        process.exit(0);
    });

process.on('SIGNIT', () => {
    mongoose.connection.close()
        .finally(() => {
            console.log(`Database connection closed`);
            process.exit(0);
        })
});