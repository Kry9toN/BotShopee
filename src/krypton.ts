import readline from 'readline'
import { Shopee } from './utils/shopee'
import { color } from './utils/color'
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
    rl.question(color(dialog, 'green'), (num: string) => {
        if (num == '1') {
            rl.question(color('Masukan email: ', 'yellow'), (email: string) => {
                rl.question(color('Masukan password: ', 'yellow'), (pw: string) => {
                    shopee.login(email, pw)
                        .then(() => pertanyaan())
                })
            })
        } else if (num == '3') {
            shopee.screenshot()
                .then(() => pertanyaan())
        } else if (num == '0') {
            console.log(color('\nDa Da!!', 'yellow'))
            process.exit(0)
        } else {
            console.log(color('\nHanya pilih nomor yang terdapat di atas!', 'red'))
            pertanyaan()
        }
    })
}

pertanyaan()
