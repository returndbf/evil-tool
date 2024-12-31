export async function importInject() {
    await import('./array.js')
    await import('./number.js')
    await import('./string.js')
}