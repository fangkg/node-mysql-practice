(async () => {
    const Sequelize = require("sequelize");
    // 建立连接
    const sequelize = new Sequelize("test", "root", "root", {
        host: "localhost",
        dialect: "mysql",
        operatorsAliases: false
    })

    // 定义模型
    const Fruit = sequelize.define("Fruit", {
        name: { type: Sequelize.STRING(20), allowNull: false },
        price: { type: Sequelize.FLOAT, allowNull: false },
        stock: { type: Sequelize.INTEGER, defaultValue: 0 }
    })

    // 同步数据库 force: true 则会删除已经存在的表
    let ret = await Fruit.sync();
    console.log('sync:', ret);
    ret = await Fruit.create({
        name: 'banana',
        price: "3"
    })
    console.log('create:', ret);
    ret = await Fruit.findAll();

    await Fruit.update(
        { price: 4 },
        { where: { name: "apple" } }
    )

    console.log('findAll:', JSON.stringify(ret));
    
})()