const { DataTypes } = require("sequelize")

module.exports = (sequelize) => {
    sequelize.define("order", {
        orderNumber:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        shippingAddress: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true
        },
        amount: {
            type: DataTypes.INTEGER,
            allowNull: false
        }

    }, {
        timestamps: false
      })

}