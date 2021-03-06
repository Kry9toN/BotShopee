import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'

export class Shopee {
/*     async login(username: any, password:any) {
          // To do
     }
     async reset() {
          // To do
     }*/
    async screenshot() {
        console.log('Initial web browser...')
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                "--no-sandbox",
                "--disable-gpu",
            ]
        });
        const page = await browser.newPage()
        console.log('Memulai screenshot...')
        await page.goto('https://shopee.co.id/')
            .then(async() => {
                await page.screenshot({encoding: 'binary', type: 'jpeg', quality: 100})
                    .then((screenData: any) => {
                        const pathFile = path.join(__dirname, '../../screenshots/screenshot.jpg')
                        fs.writeFileSync(pathFile, screenData)
                        console.log('Berhasil mengambil screenshot, cek di ' +  pathFile)
                    }).catch((err: any) => console.log('Tidak bisa mengambil screenshot karena: %s', err))
            }).catch((err: any) => console.log('Tidak dapat memuat web cek internet anda\n%s', err))
        await browser.close();
    }
}
