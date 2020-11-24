import {Sequelize, Model} from 'sequelize'

const {dbName, host, password, port, user} = global.config.database

const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    timezone: '+08:00',
    define: {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at',
        paranoid: false,
        underscored: true,
        freezeTableName: true,
        scopes: {
            bh: {
                attributes: {
                    exclude: ['updated_at', 'created_at,deleted_at']
                }
            }
        }
    }
})

sequelize.sync();

export {
    sequelize
}
