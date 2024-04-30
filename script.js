import fs from 'fs';

const ttt = [
  {
    "value": "AF",
    "label": "پښتو",
    "countryName": "Afghanistan",
    "langCode": "ps-AF",
    "langName": "پښتو",
    "flag": "🇦🇫"
  },
  {
    "value": "FR",
    "label": "Français",
    "countryName": "France",
    "langCode": "fr-FR",
    "langName": "Français",
    "flag": "🇫🇷"
  },
  {
    "value": "ES",
    "label": "Español",
    "countryName": "Spain",
    "langCode": "es-ES",
    "langName": "Español",
    "flag": "🇪🇸"
  },
  {
    "value": "SA",
    "label": "العربية",
    "countryName": "Saudi Arabia",
    "langCode": "ar-SA",
    "langName": "العربية",
    "flag": "🇸🇦"
  },
  {
    "value": "AL",
    "label": "Shqip",
    "countryName": "Albania",
    "langCode": "sq-AL",
    "langName": "Shqip",
    "flag": "🇦🇱"
  },
  {
    "value": "AD",
    "label": "Català",
    "countryName": "Andorra",
    "langCode": "ca-AD",
    "langName": "Català",
    "flag": "🇦🇩"
  },
  {
    "value": "AM",
    "label": "Հայերեն",
    "countryName": "Armenia",
    "langCode": "hy-AM",
    "langName": "Հայերեն",
    "flag": "🇦🇲"
  },
  {
    "value": "AZ",
    "label": "Azərbaycan",
    "countryName": "Azerbaijan",
    "langCode": "az-AZ",
    "langName": "Azərbaycan",
    "flag": "🇦🇿"
  },
  {
    "value": "BD",
    "label": "বাংলা",
    "countryName": "Bangladesh",
    "langCode": "bn-BD",
    "langName": "বাংলা",
    "flag": "🇧🇩"
  },
  {
    "value": "BG",
    "label": "Български",
    "countryName": "Bulgaria",
    "langCode": "bg-BG",
    "langName": "Български",
    "flag": "🇧🇬"
  },
  {
    "value": "BA",
    "label": "Bosanski",
    "countryName": "Bosnia and Herzegovina",
    "langCode": "bs-BA",
    "langName": "Bosanski",
    "flag": "🇧🇦"
  },
  {
    "value": "BY",
    "label": "Беларуская",
    "countryName": "Belarus",
    "langCode": "be-BY",
    "langName": "Беларуская",
    "flag": "🇧🇾"
  },
  {
    "value": "BT",
    "label": "ཇོང་ཁ",
    "countryName": "Bhutan",
    "langCode": "dz-BT",
    "langName": "ཇོང་ཁ",
    "flag": "🇧🇹"
  },
  {
    "value": "CZ",
    "label": "Čeština",
    "countryName": "Czechia",
    "langCode": "cs-CZ",
    "langName": "Čeština",
    "flag": "🇨🇿"
  },
  {
    "value": "DE",
    "label": "Deutsch",
    "countryName": "Germany",
    "langCode": "de-DE",
    "langName": "Deutsch",
    "flag": "🇩🇪"
  },
  {
    "value": "DK",
    "label": "Dansk",
    "countryName": "Denmark",
    "langCode": "da-DK",
    "langName": "Dansk",
    "flag": "🇩🇰"
  },
  {
    "value": "ER",
    "label": "ትግርኛ",
    "countryName": "Eritrea",
    "langCode": "ti-ER",
    "langName": "ትግርኛ",
    "flag": "🇪🇷"
  },
  {
    "value": "EE",
    "label": "Eesti",
    "countryName": "Estonia",
    "langCode": "et-EE",
    "langName": "Eesti",
    "flag": "🇪🇪"
  },
  {
    "value": "ET",
    "label": "አማርኛ",
    "countryName": "Ethiopia",
    "langCode": "am-ET",
    "langName": "አማርኛ",
    "flag": "🇪🇹"
  },
  {
    "value": "FI",
    "label": "Suomi",
    "countryName": "Finland",
    "langCode": "fi-FI",
    "langName": "Suomi",
    "flag": "🇫🇮"
  },
  {
    "value": "FO",
    "label": "Føroyskt",
    "countryName": "Faroe Islands",
    "langCode": "fo-FO",
    "langName": "Føroyskt",
    "flag": "🇫🇴"
  },
  {
    "value": "GE",
    "label": "ქართული",
    "countryName": "Georgia",
    "langCode": "ka-GE",
    "langName": "ქართული",
    "flag": "🇬🇪"
  },
  {
    "value": "GR",
    "label": "Ελληνικά",
    "countryName": "Greece",
    "langCode": "el-GR",
    "langName": "Ελληνικά",
    "flag": "🇬🇷"
  },
  {
    "value": "GL",
    "label": "Kalaallisut",
    "countryName": "Greenland",
    "langCode": "kl-GL",
    "langName": "Kalaallisut",
    "flag": "🇬🇱"
  },
  {
    "value": "HR",
    "label": "Hrvatski",
    "countryName": "Croatia",
    "langCode": "hr-HR",
    "langName": "Hrvatski",
    "flag": "🇭🇷"
  },
  {
    "value": "HU",
    "label": "Magyar",
    "countryName": "Hungary",
    "langCode": "hu-HU",
    "langName": "Magyar",
    "flag": "🇭🇺"
  },
  {
    "value": "ID",
    "label": "Bahasa Indonesia",
    "countryName": "Indonesia",
    "langCode": "id-ID",
    "langName": "Bahasa Indonesia",
    "flag": "🇮🇩"
  },
  {
    "value": "IN",
    "label": "हिन्दी",
    "countryName": "India",
    "langCode": "hi-IN",
    "langName": "हिन्दी",
    "flag": "🇮🇳"
  },
  {
    "value": "IR",
    "label": "فارسی",
    "countryName": "Iran",
    "langCode": "fa-IR",
    "langName": "فارسی",
    "flag": "🇮🇷"
  },
  {
    "value": "IS",
    "label": "Íslenska",
    "countryName": "Iceland",
    "langCode": "is-IS",
    "langName": "Íslenska",
    "flag": "🇮🇸"
  },
  {
    "value": "IL",
    "label": "עברית",
    "countryName": "Israel",
    "langCode": "he-IL",
    "langName": "עברית",
    "flag": "🇮🇱"
  },
  {
    "value": "IT",
    "label": "Italiano",
    "countryName": "Italy",
    "langCode": "it-IT",
    "langName": "Italiano",
    "flag": "🇮🇹"
  },
  {
    "value": "JP",
    "label": "日本語",
    "countryName": "Japan",
    "langCode": "ja-JP",
    "langName": "日本語",
    "flag": "🇯🇵"
  },
  {
    "value": "KZ",
    "label": "Қазақ",
    "countryName": "Kazakhstan",
    "langCode": "kk-KZ",
    "langName": "Қазақ",
    "flag": "🇰🇿"
  },
  {
    "value": "KG",
    "label": "Кыргызча",
    "countryName": "Kyrgyzstan",
    "langCode": "ky-KG",
    "langName": "Кыргызча",
    "flag": "🇰🇬"
  },
  {
    "value": "KH",
    "label": "ខ្មែរ",
    "countryName": "Cambodia",
    "langCode": "km-KH",
    "langName": "ខ្មែរ",
    "flag": "🇰🇭"
  },
  {
    "value": "KR",
    "label": "한국어",
    "countryName": "South Korea",
    "langCode": "ko-KR",
    "langName": "한국어",
    "flag": "🇰🇷"
  },
  {
    "value": "LA",
    "label": "ລາວ",
    "countryName": "Laos",
    "langCode": "lo-LA",
    "langName": "ລາວ",
    "flag": "🇱🇦"
  },
  {
    "value": "LK",
    "label": "සිංහල",
    "countryName": "Sri Lanka",
    "langCode": "si-LK",
    "langName": "සිංහල",
    "flag": "🇱🇰"
  },
  {
    "value": "LT",
    "label": "Lietuvių",
    "countryName": "Lithuania",
    "langCode": "lt-LT",
    "langName": "Lietuvių",
    "flag": "🇱🇹"
  },
  {
    "value": "LV",
    "label": "Latviešu",
    "countryName": "Latvia",
    "langCode": "lv-LV",
    "langName": "Latviešu",
    "flag": "🇱🇻"
  },
  {
    "value": "MV",
    "label": "ދިވެހިބަސް",
    "countryName": "Maldives",
    "langCode": "dv-MV",
    "langName": "ދިވެހިބަސް",
    "flag": "🇲🇻"
  },
  {
    "value": "MK",
    "label": "Македонски",
    "countryName": "North Macedonia",
    "langCode": "mk-MK",
    "langName": "Македонски",
    "flag": "🇲🇰"
  },
  {
    "value": "MT",
    "label": "Malti",
    "countryName": "Malta",
    "langCode": "mt-MT",
    "langName": "Malti",
    "flag": "🇲🇹"
  },
  {
    "value": "MM",
    "label": "မြန်မာ",
    "countryName": "Myanmar",
    "langCode": "my-MM",
    "langName": "မြန်မာ",
    "flag": "🇲🇲"
  },
  {
    "value": "MN",
    "label": "Монгол",
    "countryName": "Mongolia",
    "langCode": "mn-MN",
    "langName": "Монгол",
    "flag": "🇲🇳"
  },
  {
    "value": "MY",
    "label": "Bahasa Melayu",
    "countryName": "Malaysia",
    "langCode": "ms-MY",
    "langName": "Bahasa Melayu",
    "flag": "🇲🇾"
  },
  {
    "value": "NL",
    "label": "Nederlands",
    "countryName": "Netherlands",
    "langCode": "nl-NL",
    "langName": "Nederlands",
    "flag": "🇳🇱"
  },
  {
    "value": "NO",
    "label": "Norsk Bokmål",
    "countryName": "Norway",
    "langCode": "nb-NO",
    "langName": "Norsk Bokmål",
    "flag": "🇳🇴"
  },
  {
    "value": "NP",
    "label": "नेपाली",
    "countryName": "Nepal",
    "langCode": "ne-NP",
    "langName": "नेपाली",
    "flag": "🇳🇵"
  },
  {
    "value": "PK",
    "label": "اردو",
    "countryName": "Pakistan",
    "langCode": "ur-PK",
    "langName": "اردو",
    "flag": "🇵🇰"
  },
  {
    "value": "PL",
    "label": "Polski",
    "countryName": "Poland",
    "langCode": "pl-PL",
    "langName": "Polski",
    "flag": "🇵🇱"
  },
  {
    "value": "PT",
    "label": "Português",
    "countryName": "Portugal",
    "langCode": "pt-PT",
    "langName": "Português",
    "flag": "🇵🇹"
  },
  {
    "value": "RO",
    "label": "Română",
    "countryName": "Romania",
    "langCode": "ro-RO",
    "langName": "Română",
    "flag": "🇷🇴"
  },
  {
    "value": "RU",
    "label": "Русский",
    "countryName": "Russia",
    "langCode": "ru-RU",
    "langName": "Русский",
    "flag": "🇷🇺"
  },
  {
    "value": "RW",
    "label": "Kinyarwanda",
    "countryName": "Rwanda",
    "langCode": "rw-RW",
    "langName": "Kinyarwanda",
    "flag": "🇷🇼"
  },
  {
    "value": "SJ",
    "label": "Norsk",
    "countryName": "Svalbard and Jan Mayen",
    "langCode": "no",
    "langName": "Norsk",
    "flag": "🇸🇯"
  },
  {
    "value": "SO",
    "label": "Soomaali",
    "countryName": "Somalia",
    "langCode": "so",
    "langName": "Soomaali",
    "flag": "🇸🇴"
  },
  {
    "value": "RS",
    "label": "Српски",
    "countryName": "Serbia",
    "langCode": "sr",
    "langName": "Српски",
    "flag": "🇷🇸"
  },
  {
    "value": "SK",
    "label": "Slovenčina",
    "countryName": "Slovakia",
    "langCode": "sk",
    "langName": "Slovenčina",
    "flag": "🇸🇰"
  },
  {
    "value": "SI",
    "label": "Slovenščina",
    "countryName": "Slovenia",
    "langCode": "sl",
    "langName": "Slovenščina",
    "flag": "🇸🇮"
  },
  {
    "value": "SE",
    "label": "Svenska",
    "countryName": "Sweden",
    "langCode": "sv",
    "langName": "Svenska",
    "flag": "🇸🇪"
  },
  {
    "value": "TH",
    "label": "ไทย",
    "countryName": "Thailand",
    "langCode": "th",
    "langName": "ไทย",
    "flag": "🇹🇭"
  },
  {
    "value": "TJ",
    "label": "Тоҷикӣ",
    "countryName": "Tajikistan",
    "langCode": "tg",
    "langName": "Тоҷикӣ",
    "flag": "🇹🇯"
  },
  {
    "value": "TM",
    "label": "Türkmençe",
    "countryName": "Turkmenistan",
    "langCode": "tk",
    "langName": "Türkmençe",
    "flag": "🇹🇲"
  },
  {
    "value": "TR",
    "label": "Türkçe",
    "countryName": "Turkey",
    "langCode": "tr",
    "langName": "Türkçe",
    "flag": "🇹🇷"
  },
  {
    "value": "TW",
    "label": "繁體中文",
    "countryName": "Taiwan",
    "langCode": "zh-TW",
    "langName": "繁體中文",
    "flag": "🇹🇼"
  },
  {
    "value": "UA",
    "label": "Українська",
    "countryName": "Ukraine",
    "langCode": "uk",
    "langName": "Українська",
    "flag": "🇺🇦"
  },
  {
    "value": "UZ",
    "label": "Oʻzbekcha",
    "countryName": "Uzbekistan",
    "langCode": "uz",
    "langName": "Oʻzbekcha",
    "flag": "🇺🇿"
  },
  {
    "value": "VN",
    "label": "Tiếng Việt",
    "countryName": "Vietnam",
    "langCode": "vi",
    "langName": "Tiếng Việt",
    "flag": "🇻🇳"
  },
  {
    "value": "CN",
    "label": "简体中文",
    "countryName": "China",
    "langCode": "zh-CN",
    "langName": "简体中文",
    "flag": "🇨🇳"
  }
]



const newArr = ttt.map(({ langName, ...item }) => {
  return {
    ...item
  }
}); 

//store the result to a JSON file
fs.writeFileSync('output.json', JSON.stringify(newArr, null, 2));
