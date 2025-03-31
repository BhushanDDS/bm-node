function simulateDownload() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Download complete"), 2000);
    });
}


async function downloadFile() {
    try {
        let result = await simulateDownload();
        console.log(result);
    } catch (error) {
        console.error("Error:", error);
    }
}
downloadFile();