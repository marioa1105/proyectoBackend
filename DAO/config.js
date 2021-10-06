const mysql = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'proyecto'
    },
    pool: { min: 0, max: 7 }
}

const sqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: __dirname + '/../db/mensajes.sqlite'
    },
    useNullAsDefault: true
}

module.exports = { mySqlConfig: mysql, 
                    sqlite3Config: sqlite3,
                    mongo: "mongodb://localhost:27017/ecommerce",
                    provider: "mongo"
                 };
