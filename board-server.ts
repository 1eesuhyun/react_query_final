//import express,{Application,Request,Response} from "express";
import express from "express";
import cors from "cors";
import oracledb, {Connection} from "oracledb";
import request from "request";

const app = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

app.listen(3355, () => {
    console.log("Server is running on port 3355");
});

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT

async function getConnection() {
    return await oracledb.getConnection({
        user: 'hr',
        password: 'happy',
        connectionString: "211.238.142.22:1521/xe"
    })
}

app.get("/board/list_node", async (req, res) => {
    let conn;
    const page = parseInt(req.query.page as string) || 1;
    const rowSize = 10;
    const start = (page - 1) * rowSize;
    try {
        conn = await getConnection();
        const listSql = `
            SELECT no, subject, name, hit, TO_CHAR(regdate, 'YYYY-MM-DD') as dbday
            FROM board_1
            ORDER BY no DESC
            OFFSET ${start} ROWS FETCH NEXT 12 ROWS ONLY
        `;
        const totalSql = `
            SELECT CEIL(COUNT(*) / 12.0) AS totalpage
            FROM board_1
        `
        const total = await conn.execute(totalSql);
        const result = await conn.execute(listSql)
        const totalpage = (total.rows as { TOTALPAGE: number }[])[0].TOTALPAGE
        console.log(result.rows)
        res.json({
            curpage: page,
            totalpage,
            list: result.rows
        });
    } catch (error) {
        console.log(error);
    } finally {
        if (conn) {
            await conn.close();
        }

    }
})

app.post("/board/insert_node", async (req, res) => {
    let conn;
    const {name, subject, content, pwd} = req.body;

    try {
        conn = await getConnection();
        const sql = `
            INSERT INTO board_1 (no, name, subject, content, pwd)
            VALUES (BR1_NO_SEQ.nextval, :name, :subject, :content, :pwd)
        `
        await conn.execute(sql, {name, subject, content, pwd}, {autoCommit: true})
        res.json({msg: 'yes'})
    } catch (err) {
        console.log(err);
        res.status(500).json({msg: 'no'});
    } finally {
        if (conn) {
            await conn.close();
        }
    }
})

app.get("/board/detail_node", async (req, res) => {
    let conn;
    const no = Number(req.query.no)
    try {
        conn = await getConnection();
        const sql1 = 'UPDATE board_1 SET hit=hit+1 WHERE no=:no'
        await conn.execute(sql1, {no}, {autoCommit: true});

        const sql2 = `SELECT no, subject, name, hit, TO_CHAR(content) as content, TO_CHAR(regdate, 'YYYY-MM-DD') as dbday
                      FROM board_1
                      WHERE no =: no`
        const result = await conn.execute(
            sql2,
            {no}
        )
        res.json(result.rows?.[0])
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) {
            await conn.close();
        }
    }
})

app.get("/board/update_node", async (req, res) => {
    let conn;
    const no = req.query.no
    try {
        conn = await getConnection()
        const sql = `
            SELECT no, name, subject, TO_CHAR(content) as content
            FROM board_1
            WHERE no =${no}
        `
        const result = await conn.execute(sql);
        console.log(result)
        res.json(result.rows?.[0])
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) {
            await conn.close();
        }
    }
})

app.put("/board/update_ok_node", async (req, res) => {
    let conn;
    const {no, name, subject, content, pwd} = req.body;
    try {
        conn = await getConnection();
        const checkSql = `
            SELECT COUNT(*) as res
            FROM board_1
            WHERE no =${no}
              AND pwd=${pwd}
        `
        const check = await conn.execute(checkSql);
        console.log(check)
        const count = (check.rows as any[])[0].RES
        if (count === 0) {
            //console.log("비번 틀림"+count)
            res.json({msg: 'no'})
            return
        }
        const updateSql = `UPDATE board_1
                           SET name='${name}',
                               subject='${subject}',
                               content='${content}'
                           WHERE no =${no}
        `
        await conn.execute(updateSql,{}, {autoCommit: true});
        res.json({msg: 'yes'})
    } catch (err) {
        console.log(err);
    } finally {
        if (conn) {
            await conn.close();
        }
    }
})

app.delete("/board/delete_node/:no/:pwd", async (req, res) => {
    const no=req.params.no
    const pwd=req.params.pwd

    let conn;
    try {
        conn = await getConnection();
        const checkSql = `
            SELECT COUNT(*) as res
            FROM board_1
            WHERE no =${no}
              AND pwd=${pwd}
        `
        const check = await conn.execute(checkSql);
        console.log(check.rows)

        const count=(check.rows as any[])[0].RES

        if(count===0)
        {
            res.json({msg: 'no'})
            return
        }

        const deleteSql = `DELETE FROM board_1 WHERE no =${no}`
        await conn.execute(deleteSql,{}, {autoCommit: true});
        res.json({msg: 'yes'})
    }catch(err) {
        console.log(err);
    }
    finally {
        if (conn) {
            await conn.close();
        }
    }
})

// 뉴스 검색
const client_id = '_tTRWuippKY_3MVMvTQw';
const client_secret = 'gq69cRQUW4';
app.get('/news', function (req, res) {
    const query=req.query.query as string;
    if(!query)
        return res.status(400).send({message:'검색어가 없습니다'});
    const api_url = 'https://openapi.naver.com/v1/search/news.json?query=' + encodeURI(query); // JSON 결과

    const  options = {
        url: api_url,
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
    };
    request.get(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            res.writeHead(200, {'Content-Type': 'text/json;charset=utf-8'});
            res.end(body);
        } else {
            res.status(response.statusCode).end();
            console.log('error = ' + response.statusCode);
        }
    });
});