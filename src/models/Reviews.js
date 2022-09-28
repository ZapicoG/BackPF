const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("review", {
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        stars: {
            type: DataTypes.ENUM("1","2","3","4","5"),
            allowNull: true
        }
    }, {
        timestamps: false
      })

}