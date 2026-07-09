const fetch = require('node-fetch');
const url = "https://api-free.deepl.com/v2/translate"
async function translate(text, targetLang) {
    try {
        const params = new URLSearchParams();
        params.append("text", text)
        params.append("target_lang", targetLang)
        const response = await fetch(
            `${url}?${params}`,
            {
                headers: { 'Authorization': 'DeepL-Auth-Key 8cfafcd7-ea6b-2433-8229-1609c91cf7b3:fx' },
                method: 'post',
            }
        );
        const json = await response.json()
        console.log("response ", json)
        const translatedText = json.translations[0].text
        return translatedText
    } catch (error) {
        console.error("couldn't translate message", error)
        return text
    }
}



module.exports.translate = translate
