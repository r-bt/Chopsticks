const menus = {
    main: `
        chopsticks [command] <options>

        pdf ................ generates Sushi Card from markdown files
        version ............ show package version
        help ............... show help menu for a command
    `,

    pdf: `
        chopsticks pdf [filename] <options>
    `
}

module.exports = (args) => {

    const subCmd = args._[0] === 'help'
        ? args._[1]
        : args._[0]

    console.log(menus[subCmd] || menus.main);

}
