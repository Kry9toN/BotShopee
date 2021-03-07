import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import { color } from './color'

export class Shopee {

link = 'https://shopee.co.id/buyer/login'
async login(email: any, pw: any) {
    console.log(color('\nInitial web browser...', 'yellow'))
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-gpu",
        ]
    });
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36')
    console.log(color('Memuat website...', 'yellow'))
    const pathSessions = path.join(__dirname, '../../screenshots/login.json')
    const previousSession: boolean = fs.existsSync(pathSessions)

    if (previousSession) {
        // If file exist load the cookies
        const cookiesString: any = fs.readFileSync(pathSessions);
        const parsedCookies = JSON.parse(cookiesString);
        if (parsedCookies.length !== 0) {
            for (const cookie of parsedCookies) {
                await page.setCookie(cookie)
            }
            console.log(color('Session berhasil di muat, so tidak usah login lagi', 'green'))
        }
    }
    await page.goto(this.link, { waitUntil: ['networkidle2'] })
        .then(async() => {
            console.log(color('Memasukan email dan password...', 'yellow'))
            await page.type('[type="text"]', email)
            await page.type('[type="password"]', pw)
            await page.keyboard.press('Enter')
            await page.waitFor(5000)
            console.log(color('Memulai menangkap screenshot...', 'yellow'))
            await page.screenshot({encoding: 'binary', type: 'jpeg', quality: 100})
                .then((screenData: any) => {
                    const pathFile = path.join(__dirname, '../../screenshots/screenshot.jpg')
                    fs.writeFileSync(pathFile, screenData)
                    console.log(color('Berhasil mengambil screenshot, cek di: %s', 'green'), color(pathFile, 'yellow'))
                }).catch((err: any) => console.log(color('Tidak bisa mengambil screenshot karena: %s', 'red'), color(err, 'yellow')))
            const cookiesObject = await page.cookies()
            // Write cookies to temp file to be used in other profile pages
            fs.writeFile(pathSessions, JSON.stringify(cookiesObject),
                function(err) { 
                    if (err) {
                        console.log('Tidak bisa membuat file sessions.', err)
                    }
                    console.log('Session sukses di simpan')
                })
        }).catch((err: any) => console.log(color('Tidak dapat memuat web cek internet anda: %s', 'red'), color(err, 'yellow')))
    await browser.close();
}

async screenshot() {
    console.log(color('\nInitial web browser...', 'yellow'))
    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--no-sandbox",
            "--disable-gpu",
        ]
    });
    const page = await browser.newPage()
    console.log(color('Memuat website...', 'yellow'))
    await page.goto(this.link)
        .then(async() => {
            console.log(color('Memulai menangkap screenshot...', 'yellow'))
            await page.screenshot({encoding: 'binary', type: 'jpeg', quality: 100})
                .then((screenData: any) => {
                    const pathFile = path.join(__dirname, '../../screenshots/screenshot.jpg')
                    fs.writeFileSync(pathFile, screenData)
                    console.log(color('Berhasil mengambil screenshot, cek di: %s', 'green'), color(pathFile, 'yellow'))
                }).catch((err: any) => console.log(color('Tidak bisa mengambil screenshot karena: %s', 'red'), color(err, 'yellow')))
        }).catch((err: any) => console.log(color('Tidak dapat memuat web cek internet anda: %s', 'red'), color(err, 'yellow')))
    await browser.close();
}
}
