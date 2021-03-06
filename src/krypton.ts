import readline from 'readline'
import { Shopee } from './utils/shopee'

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const shopee = new Shopee()

const dialog = `
Pilih salah satu aja:

1. Login
2. Logout
3. Screenshot
0. Keluar

[Nomor]: `

function pertanyaan() {
    rl.question(dialog, (num: string) => {
        if (num == '3') {
            shopee.screenshot()
                .then(() => pertanyaan())
        } else if (num == '0') {
            console.log("Da Da!!")
            process.exit(0)
        } else {
            console.log('\nHanya pilih nomor yang terdapat di atas!')
        }
    })
}

pertanyaan()
