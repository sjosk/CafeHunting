const fs = require('fs');

// 读取 JSON 文件
// read json
fs.readFile('cafedata.json', 'utf8', (err, data) => {
    if (err) {
        console.error('读取文件时出错:', err);
        return;
    }

    try {
        const jsonData = JSON.parse(data);

        // 生成 MySQL 查询语句
        // output mysql
        let sqlQuery = '';
        jsonData.forEach(item => {
            const keys = Object.keys(item);
            const values = Object.values(item);

            const columns = keys.join(', ');
            const escapedValues = values.map(val => typeof val === 'string' ? `'${val}'` : val).join(', ');

            sqlQuery += `INSERT INTO Cafe (${columns}) VALUES (${escapedValues});\n`;
        });

        // 输出 SQL 查询语句
        // check for output
        //console.log(sqlQuery);

        // 如果需要将查询语句保存到文件
        // save mqsql to file
        fs.writeFile('Cafe.sql', sqlQuery, 'utf8', (err) => {
            if (err) {
                console.error('写入文件时出错:', err);
                return;
            }
            console.log('SQL 查询语句已保存到 output.sql 文件');
        });

    } catch (error) {
        //output error to user
        console.error('解析 JSON 时出错:', error);
    }
});
