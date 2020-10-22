const mysql = require('mysql');
// 连接配置
const cfg = {
    host: "localhost",
    user: "root",
    password: "root",
    database: "test"
}

// 创建连接对象
const conn = mysql.createConnection(cfg);

// 连接
conn.connect(err => {
    if (err) {
        throw err;
    } else {
        console.log('连接成功！')
    }
})

// 创建表
const CREATE_SQL = `CREATE TABLE IF NOT EXISTS test (
    id INT NOT NULL AUTO_INCREMENT,
    message VARCHAR(45) NULL,
    PRIMARY KEY (id)
)`;

// 插入记录
const INSERT_SQL = `INSERT INTO test(message) VALUES(?)`;

// 查询记录
const SELECT_SQL = `SELECT * FROM test`;

conn.query(CREATE_SQL, err => {
    if (err) {
        throw err;
    }
})

// 插入数据
conn.query(INSERT_SQL, "hello world", (err, result) => {
    if (err) {
        throw err;
    }
    console.log('result:', result);
    conn.query(SELECT_SQL, (err, results) => {
        console.log('results:', results)
        // 如果query语句有嵌套，则end需要在此执行
        conn.end();
    })
})