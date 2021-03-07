import chalk from 'chalk'

export const color = (text: string, color: string) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}
