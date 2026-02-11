//import express,{Application,Request,Response} from "express";
import express from "express";
import cors from "cors";
import oracledb, {Connection} from "oracledb";

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
        const totalpage=(total.rows as {TOTALPAGE:number}[])[0].TOTALPAGE
        console.log(result.rows)
        res.json({
            curpage:page,
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

app.post("/board/insert_node",async (req, res) => {
    let conn;
    const {name,subject,content,pwd} = req.body;

    try {
        conn = await getConnection();
        const sql=`
            INSERT INTO board_1 (no,name,subject,content,pwd) VALUES (BR1_NO_SEQ.nextval,:name,:subject,:content,:pwd)
        `
        await conn.execute(sql,{name, subject,content,pwd},{autoCommit:true})
        res.json({msg:'yes'})
    }catch(err) {
        console.log(err);
        res.status(500).json({msg:'no'});
    }
    finally {
        if (conn) {
            await conn.close();
        }
    }
})