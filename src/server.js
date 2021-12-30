const express = require("express")
const nodemailer = require("nodemailer")
const cors = require("cors")
require("dotenv").config()
const { Pool } = require("pg")

const PORT = process.env.PORT || 4000

const app = express()
const pool = new Pool({
    connectionString: 'postgres://ywjsqrxz:w1vKN1G_AuMFx0AIipcjQvZatIla7wYf@castor.db.elephantsql.com/ywjsqrxz'
    // user: "postgres",
    // host: "localhost",
    // port: 5432,
    // password: "khamia11",
    // database: "c_system",
})

const pg = async(SQL, ...params) => {
    const client = pool.connect()

    try {
        const data = await (await client).query(SQL, params)
        return data.rows
    } catch (error) {
        console.log(error);
    } finally {
        (await client).release()
    }
}

app.use(cors())
app.use(express.json())

app.post("/developers", async(req, res) => {
    const { id } = req.body

    try {
        if(id) {
            const devData = await pg(`
                SELECT
                    d.link,
                    d.developer_name,
                    c.complex_name,
                    c.room,
                    c.price
                FROM
                    developers d
                INNER JOIN complexes c
                    ON c.dev_id = $1 AND d.id = $1
            `, id)
    
            res.status(200).send(devData)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post("/bankData", async(req, res) => {
    const { price } = req.body

    try {
        if(price) {
            const bankData = await pg(`
                SELECT
                    bank_name,
                    money_limit,
                    time
                FROM
                    banks
                WHERE
                    banks.money_limit >= $1
            `, price)
    
            res.status(200).send(bankData)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.post("/orders", async(req, res) => {
    const {devID, complexName, rooms, price, bankName, user_email} = req.body

    try {
        if(devID && complexName && rooms && bankName && user_email) {

            const data = await pg(`
                SELECT developer_name FROM developers WHERE developers.id = $1  
            `, devID)
    
            const developerName = data[0].developer_name
            const order = await pg(`
                INSERT INTO orders(
                    developer_name,
                    complex_name,
                    room,
                    price,
                    bank_name,
                    email
                ) VALUES($1, $2, $3, $4, $5, $6) RETURNING *
            `, developerName, complexName, rooms, price, bankName, user_email)

            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "shakhzodnematullaev@gmail.com",
                    pass: "19992811"
                }
            })
            
            let mailOptions = {
                from: `${developerName}@gmail.com`,
                to: `${user_email}`,
                subject: "About order",
                text: `Siz ${developerName} qurilish kompaniyasi tomonidan qurilgan ${complexName} kompleksidan ${rooms} xonali kvartira olish uchun buyurtma qoldirgan ekansiz. Biz bu uyni ${price} so'mga 15 yilga bo'lib to'lash sharti bilan bera olamiz. Agar shartlarimiz qanoatlantirsa qayta aloqaga chiqishingizni so'raymiz.` 
            }
            
            transporter.sendMail(mailOptions, (e, d) => {
                if(e) {
                    console.log(e);
                } else {
                    console.log(d);
                }
            })
            res.status(210).send(order)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }

})

app.post("/bank", async (req, res) => {
    const {complexName, bankName, user_email} = req.body
    try {
        if(complexName && bankName && user_email) {

            const data = await pg(`
                SELECT money_limit, time FROM banks WHERE bank_name = $1  
            `, bankName)
    
            let transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    user: "shakhzodnematullaev@gmail.com",
                    pass: "19992811"
                }
            })
            
            let mailOptions = {
                from: `${bankName}@gmail.com`,
                to: `${user_email}`,
                subject: "About money",
                text: `Siz ${complexName} kompleksidan kvartira sotib olish uchun ${bankName} bankini tanlagan ekansiz. Biz bu uy uchun ${data[0].money_limit} so'mgacha bo'lgan mablag'ni ${data[0].time} yilga ajrata olamiz. Agar shartlarimiz qanoatlantirsa qayta aloqaga chiqishingizni so'raymiz.` 
            }
            
            transporter.sendMail(mailOptions, (e, d) => {
                if(e) {
                    console.log(e);
                } else {
                    console.log(d);
                }
            })
            res.status(210).send(order)
        }
    } catch (error) {
        res.status(500).send(error.message)
    }
})

app.listen(PORT, console.log(`Server running on port: http://localhost:${PORT}`))