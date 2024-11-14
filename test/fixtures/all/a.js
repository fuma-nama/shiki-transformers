function hello(indentSize, type) {
    if (indentSize === 4 && type !== 'tab') {
        console.log('Each next indentation will increase on 4 spaces'); // [!code error] [!code focus]
        console.log('Each next indentation will increase on 4 spaces'); // hello[!code error][!code focus]
        console.log('Each next indentation will increase on 4 spaces'); // hello [!code error] [!code focus]

        // [!code highlight]
        console.log('highlighted')
    }
}

/**
 * [!code highlight]
 * hello world
 */
function test() {

}