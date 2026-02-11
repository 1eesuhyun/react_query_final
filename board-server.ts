import express,{Application,Request,Response} from "express";
import cors from "cors";
import oracledb ,{Connection}from "oracledb";

const app: Application = express();
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(express.json());

app.listen(3355,()=>{
    console.log("Server is running on port 3355");
});

oracledb.outFormat=oracledb.OUT_FORMAT_OBJECT

async function getConnection(){
    return await oracledb.getConnection({
        user:'hr',
        password:'happy',
        connectionString:'211.238.142.22:1521/xe'
    })
}

app.get("/board/list_node", async (req: Request, res: Response) => {
    let conn;
    const page=parseInt(req.query.page as string)||1;
    const rowSize=10;
    const start=(page-1)*rowSize;
    try {
        conn = await getConnection();
        const sql = `
            SELECT no, subject, name, TO_CHAR(regdate, 'YYYY-MM-DD') as dbday
            FROM board_1
            ORDER BY no DESC
            OFFSET :start ROWS FETCH NEXT 12 ROWS ONLY
        `;
    }catch(error){
        console.log(error);
    }
    finally {
        if(conn){
            await conn.close();
        }

    }
})