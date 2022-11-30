import fs from 'fs';
import path from 'path';


interface Language {
    id: number,
    name: string
};

// load languages
const rawData = fs.readFileSync(
    path.resolve(__dirname, '../../static/languages.json'))
    .toString();
export const LanguageList: Language[] = JSON.parse(rawData)['languageList'];
