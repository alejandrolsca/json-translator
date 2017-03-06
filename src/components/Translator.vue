<template>
    <div class="translator">
        <form v-on:submit.prevent="save()">
           <div class="form-group">
              <label for="file">Load backup</label><input type="file" class="form-control" id="file" v-on:change="loadBackup">
           </div>

          <div class="col">
          <button type="button" v-on:click="backup()" class="btn btn-danger">BACKUP TRANSLATIONS</button>
          <button type="submit" class="btn btn-primary">SAVE  {{languageToUC(language)}}</button><br><br>
          </div>
          <div class="form-group">
            <label for="">Select Language to translate</label>
            <select class="form-control" v-model="language" v-on:change="loadTranslation()">
              <option v-for="lang in languages" :value="lang.value">{{lang.label}}</option>
            </select>
          </div><br>
          <div class="form-group" v-for="(value, key) in base">
            <label class="path">{{path(key)}}</label>&nbsp;<label for="key">{{value}}</label>
            <input type="text" class="form-control" id="key" v-model="data[key]" v-on:change="saveTranslation()" :placeholder="value" required="required">
          </div>
        </form>
    </div>
</template>

<script>
import flatten from 'flat'

export default {
  name: 'translator',
  data () {
    return {
      data: {},
      language: 'es',
      languages: [
        {"label":"аҧсуа бызшәа, аҧсшәа (Abkhaz)","value":"ab"},
        {"label":"Afaraf (Afar)","value":"aa"},
        {"label":"Afrikaans (Afrikaans)","value":"af"},
        {"label":"Akan (Akan)","value":"ak"},
        {"label":"Shqip (Albanian)","value":"sq"},
        {"label":"አማርኛ (Amharic)","value":"am"},
        {"label":"العربية (Arabic)","value":"ar"},
        {"label":"aragonés (Aragonese)","value":"an"},
        {"label":"Հայերեն (Armenian)","value":"hy"},
        {"label":"অসমীয়া (Assamese)","value":"as"},
        {"label":"авар мацӀ, магӀарул мацӀ (Avaric)","value":"av"},
        {"label":"avesta (Avestan)","value":"ae"},
        {"label":"aymar aru (Aymara)","value":"ay"},
        {"label":"azərbaycan dili (Azerbaijani)","value":"az"},
        {"label":"bamanankan (Bambara)","value":"bm"},
        {"label":"башҡорт теле (Bashkir)","value":"ba"},
        {"label":"euskara, euskera (Basque)","value":"eu"},
        {"label":"беларуская мова (Belarusian)","value":"be"},
        {"label":"বাংলা (Bengali, Bangla)","value":"bn"},
        {"label":"भोजपुरी (Bihari)","value":"bh"},
        {"label":"Bislama (Bislama)","value":"bi"},
        {"label":"bosanski jezik (Bosnian)","value":"bs"},
        {"label":"brezhoneg (Breton)","value":"br"},
        {"label":"български език (Bulgarian)","value":"bg"},
        {"label":"ဗမာစာ (Burmese)","value":"my"},
        {"label":"català (Catalan)","value":"ca"},
        {"label":"Chamoru (Chamorro)","value":"ch"},
        {"label":"нохчийн мотт (Chechen)","value":"ce"},
        {"label":"chiCheŵa, chinyanja (Chichewa, Chewa, Nyanja)","value":"ny"},
        {"label":"中文 (Zhōngwén), 汉语, 漢語 (Chinese)","value":"zh"},
        {"label":"чӑваш чӗлхи (Chuvash)","value":"cv"},
        {"label":"Kernewek (Cornish)","value":"kw"},
        {"label":"corsu, lingua corsa (Corsican)","value":"co"},
        {"label":"ᓀᐦᐃᔭᐍᐏᐣ (Cree)","value":"cr"},
        {"label":"hrvatski jezik (Croatian)","value":"hr"},
        {"label":"čeština, český jazyk (Czech)","value":"cs"},
        {"label":"dansk (Danish)","value":"da"},
        {"label":"ދިވެހި (Divehi, Dhivehi, Maldivian)","value":"dv"},
        {"label":"Nederlands, Vlaams (Dutch)","value":"nl"},
        {"label":"རྫོང་ཁ (Dzongkha)","value":"dz"},
        {"label":"English (English)","value":"en"},
        {"label":"Esperanto (Esperanto)","value":"eo"},
        {"label":"eesti, eesti keel (Estonian)","value":"et"},
        {"label":"Eʋegbe (Ewe)","value":"ee"},
        {"label":"føroyskt (Faroese)","value":"fo"},
        {"label":"vosa Vakaviti (Fijian)","value":"fj"},
        {"label":"suomi, suomen kieli (Finnish)","value":"fi"},
        {"label":"français, langue française (French)","value":"fr"},
        {"label":"Fulfulde, Pulaar, Pular (Fula, Fulah, Pulaar, Pular)","value":"ff"},
        {"label":"galego (Galician)","value":"gl"},
        {"label":"ქართული (Georgian)","value":"ka"},
        {"label":"Deutsch (German)","value":"de"},
        {"label":"ελληνικά (Greek (modern))","value":"el"},
        {"label":"Avañe'ẽ (Guaraní)","value":"gn"},
        {"label":"ગુજરાતી (Gujarati)","value":"gu"},
        {"label":"Kreyòl ayisyen (Haitian, Haitian Creole)","value":"ht"},
        {"label":"(Hausa) هَوُسَ (Hausa)","value":"ha"},
        {"label":"עברית (Hebrew (modern))","value":"he"},
        {"label":"Otjiherero (Herero)","value":"hz"},
        {"label":"हिन्दी, हिंदी (Hindi)","value":"hi"},
        {"label":"Hiri Motu (Hiri Motu)","value":"ho"},
        {"label":"magyar (Hungarian)","value":"hu"},
        {"label":"Interlingua (Interlingua)","value":"ia"},
        {"label":"Bahasa Indonesia (Indonesian)","value":"id"},
        {"label":"Originally called Occidental; then Interlingue after WWII (Interlingue)","value":"ie"},
        {"label":"Gaeilge (Irish)","value":"ga"},
        {"label":"Asụsụ Igbo (Igbo)","value":"ig"},
        {"label":"Iñupiaq, Iñupiatun (Inupiaq)","value":"ik"},
        {"label":"Ido (Ido)","value":"io"},
        {"label":"Íslenska (Icelandic)","value":"is"},
        {"label":"Italiano (Italian)","value":"it"},
        {"label":"ᐃᓄᒃᑎᑐᑦ (Inuktitut)","value":"iu"},
        {"label":"日本語 (にほんご) (Japanese)","value":"ja"},
        {"label":"ꦧꦱꦗꦮ, Basa Jawa (Javanese)","value":"jv"},
        {"label":"kalaallisut, kalaallit oqaasii (Kalaallisut, Greenlandic)","value":"kl"},
        {"label":"ಕನ್ನಡ (Kannada)","value":"kn"},
        {"label":"Kanuri (Kanuri)","value":"kr"},
        {"label":"कश्मीरी, كشميري‎ (Kashmiri)","value":"ks"},
        {"label":"қазақ тілі (Kazakh)","value":"kk"},
        {"label":"ខ្មែរ, ខេមរភាសា, ភាសាខ្មែរ (Khmer)","value":"km"},
        {"label":"Gĩkũyũ (Kikuyu, Gikuyu)","value":"ki"},
        {"label":"Ikinyarwanda (Kinyarwanda)","value":"rw"},
        {"label":"Кыргызча, Кыргыз тили (Kyrgyz)","value":"ky"},
        {"label":"коми кыв (Komi)","value":"kv"},
        {"label":"Kikongo (Kongo)","value":"kg"},
        {"label":"한국어 (Korean)","value":"ko"},
        {"label":"Kurdî, كوردی‎ (Kurdish)","value":"ku"},
        {"label":"Kuanyama (Kwanyama, Kuanyama)","value":"kj"},
        {"label":"latine, lingua latina (Latin)","value":"la"},
        {"label":"Lëtzebuergesch (Luxembourgish, Letzeburgesch)","value":"lb"},
        {"label":"Luganda (Ganda)","value":"lg"},
        {"label":"Limburgs (Limburgish, Limburgan, Limburger)","value":"li"},
        {"label":"Lingála (Lingala)","value":"ln"},
        {"label":"ພາສາລາວ (Lao)","value":"lo"},
        {"label":"lietuvių kalba (Lithuanian)","value":"lt"},
        {"label":"Tshiluba (Luba-Katanga)","value":"lu"},
        {"label":"latviešu valoda (Latvian)","value":"lv"},
        {"label":"Gaelg, Gailck (Manx)","value":"gv"},
        {"label":"македонски јазик (Macedonian)","value":"mk"},
        {"label":"fiteny malagasy (Malagasy)","value":"mg"},
        {"label":"bahasa Melayu, بهاس ملايو‎ (Malay)","value":"ms"},
        {"label":"മലയാളം (Malayalam)","value":"ml"},
        {"label":"Malti (Maltese)","value":"mt"},
        {"label":"te reo Māori (Māori)","value":"mi"},
        {"label":"मराठी (Marathi (Marāṭhī))","value":"mr"},
        {"label":"Kajin M̧ajeļ (Marshallese)","value":"mh"},
        {"label":"Монгол хэл (Mongolian)","value":"mn"},
        {"label":"Dorerin Naoero (Nauruan)","value":"na"},
        {"label":"Diné bizaad (Navajo, Navaho)","value":"nv"},
        {"label":"isiNdebele (Northern Ndebele)","value":"nd"},
        {"label":"नेपाली (Nepali)","value":"ne"},
        {"label":"Owambo (Ndonga)","value":"ng"},
        {"label":"Norsk bokmål (Norwegian Bokmål)","value":"nb"},
        {"label":"Norsk nynorsk (Norwegian Nynorsk)","value":"nn"},
        {"label":"Norsk (Norwegian)","value":"no"},
        {"label":"ꆈꌠ꒿ Nuosuhxop (Nuosu)","value":"ii"},
        {"label":"isiNdebele (Southern Ndebele)","value":"nr"},
        {"label":"occitan, lenga d'òc (Occitan)","value":"oc"},
        {"label":"ᐊᓂᔑᓈᐯᒧᐎᓐ (Ojibwe, Ojibwa)","value":"oj"},
        {"label":"ѩзыкъ словѣньскъ (Old Church Slavonic, Church Slavonic, Old Bulgarian)","value":"cu"},
        {"label":"Afaan Oromoo (Oromo)","value":"om"},
        {"label":"ଓଡ଼ିଆ (Oriya)","value":"or"},
        {"label":"ирон æвзаг (Ossetian, Ossetic)","value":"os"},
        {"label":"ਪੰਜਾਬੀ ((Eastern) Punjabi)","value":"pa"},
        {"label":"पाऴि (Pāli)","value":"pi"},
        {"label":"فارسی (Persian (Farsi))","value":"fa"},
        {"label":"język polski, polszczyzna (Polish)","value":"pl"},
        {"label":"پښتو (Pashto, Pushto)","value":"ps"},
        {"label":"Português (Portuguese)","value":"pt"},
        {"label":"Runa Simi, Kichwa (Quechua)","value":"qu"},
        {"label":"rumantsch grischun (Romansh)","value":"rm"},
        {"label":"Ikirundi (Kirundi)","value":"rn"},
        {"label":"Română (Romanian)","value":"ro"},
        {"label":"Русский (Russian)","value":"ru"},
        {"label":"संस्कृतम् (Sanskrit (Saṁskṛta))","value":"sa"},
        {"label":"sardu (Sardinian)","value":"sc"},
        {"label":"सिन्धी, سنڌي، سندھی‎ (Sindhi)","value":"sd"},
        {"label":"Davvisámegiella (Northern Sami)","value":"se"},
        {"label":"gagana fa'a Samoa (Samoan)","value":"sm"},
        {"label":"yângâ tî sängö (Sango)","value":"sg"},
        {"label":"српски језик (Serbian)","value":"sr"},
        {"label":"Gàidhlig (Scottish Gaelic, Gaelic)","value":"gd"},
        {"label":"chiShona (Shona)","value":"sn"},
        {"label":"සිංහල (Sinhalese, Sinhala)","value":"si"},
        {"label":"slovenčina, slovenský jazyk (Slovak)","value":"sk"},
        {"label":"slovenski jezik, slovenščina (Slovene)","value":"sl"},
        {"label":"Soomaaliga, af Soomaali (Somali)","value":"so"},
        {"label":"Sesotho (Southern Sotho)","value":"st"},
        {"label":"Español (Spanish)","value":"es"},
        {"label":"Basa Sunda (Sundanese)","value":"su"},
        {"label":"Kiswahili (Swahili)","value":"sw"},
        {"label":"SiSwati (Swati)","value":"ss"},
        {"label":"svenska (Swedish)","value":"sv"},
        {"label":"தமிழ் (Tamil)","value":"ta"},
        {"label":"తెలుగు (Telugu)","value":"te"},
        {"label":"тоҷикӣ, toçikī, تاجیکی‎ (Tajik)","value":"tg"},
        {"label":"ไทย (Thai)","value":"th"},
        {"label":"ትግርኛ (Tigrinya)","value":"ti"},
        {"label":"བོད་ཡིག (Tibetan Standard, Tibetan, Central)","value":"bo"},
        {"label":"Türkmen, Түркмен (Turkmen)","value":"tk"},
        {"label":"Wikang Tagalog (Tagalog)","value":"tl"},
        {"label":"Setswana (Tswana)","value":"tn"},
        {"label":"faka Tonga (Tonga (Tonga Islands))","value":"to"},
        {"label":"Türkçe (Turkish)","value":"tr"},
        {"label":"Xitsonga (Tsonga)","value":"ts"},
        {"label":"татар теле, tatar tele (Tatar)","value":"tt"},
        {"label":"Twi (Twi)","value":"tw"},
        {"label":"Reo Tahiti (Tahitian)","value":"ty"},
        {"label":"ئۇيغۇرچە‎, Uyghurche (Uyghur)","value":"ug"},
        {"label":"Українська (Ukrainian)","value":"uk"},
        {"label":"اردو (Urdu)","value":"ur"},
        {"label":"Oʻzbek, Ўзбек, أۇزبېك‎ (Uzbek)","value":"uz"},
        {"label":"Tshivenḓa (Venda)","value":"ve"},
        {"label":"Tiếng Việt (Vietnamese)","value":"vi"},
        {"label":"Volapük (Volapük)","value":"vo"},
        {"label":"walon (Walloon)","value":"wa"},
        {"label":"Cymraeg (Welsh)","value":"cy"},
        {"label":"Wollof (Wolof)","value":"wo"},
        {"label":"Frysk (Western Frisian)","value":"fy"},
        {"label":"isiXhosa (Xhosa)","value":"xh"},
        {"label":"ייִדיש (Yiddish)","value":"yi"},
        {"label":"Yorùbá (Yoruba)","value":"yo"},
        {"label":"Saɯ cueŋƅ, Saw cuengh (Zhuang, Chuang)","value":"za"},
        {"label":"isiZulu (Zulu)","value":"zu"}

      ],
      base: null
    }
  },
  mounted() {
    this.getBase();
    this.loadTranslation();
    this.getTranslation();
  },
  methods: {
    getBase: function() {
      this.verifyLS();
      this.base = flatten(JSON.parse(localStorage.getItem('base')))
    },
    json: function(){
      return alert(JSON.stringify(flatten.unflatten(this.data),null, 4));
    },
    save: function(){
      let data = flatten.unflatten(this.data);
      let json = JSON.stringify(data,null,4);
      let blob = new Blob([json], {type: "application/json"});
      let url  = URL.createObjectURL(blob);

      let a = document.createElement('a');
      a.download    = this.language + ".json";
      a.href        = url;
      a.textContent = "Download Translation.json";
      a.click();
      this.backup();
    },
    backup: function(){
      let backup = this.getAllTranslations();
      let blob = new Blob([backup], {type: "application/json"});
      let url  = URL.createObjectURL(blob);

      let a = document.createElement('a');
      a.download    = "translations_backup.json";
      a.href        = url;
      a.textContent = "Download Backup.json";
      a.click();

    },
    loadBackup: function(event){
      let reader = new FileReader();
      reader.onload = function(event) {
        if (confirm('Actual translations will be replaced, do you want to continue?')) {
          try {
              this.verifyLS();
              let json = JSON.parse(event.target.result);
              let keys = Object.keys(json);
              let currentTranslations = JSON.parse(localStorage.getItem('translations'));
              for (let key in keys){
                currentTranslations[keys[key]] = json[keys[key]];
              }
              localStorage.setItem('translations',JSON.stringify(currentTranslations))
              if(this.getTranslation()) {
                this.data = this.getTranslation();
              } else {
                this.data = {};
              }
          } catch(e) {
            console.log(e);
              alert('Please load a valid JSON file.'); // error in the above string (in this case, yes)!
          } finally {
            document.getElementById("file").value = "";
          }
        } else {
          document.getElementById("file").value = "";
        } 
      }.bind(this);

      reader.readAsText(event.target.files[0]);
    },
    saveTranslation: function() {
      this.verifyLS();
      let currentTranslations = JSON.parse(localStorage.getItem('translations'));
      currentTranslations[this.language] = this.data
      localStorage.setItem('translations', JSON.stringify(currentTranslations))
    },
    getTranslation: function() {
        this.verifyLS();
        if(JSON.parse(localStorage.getItem('translations'))[this.language]) {
          return JSON.parse(localStorage.getItem('translations'))[this.language];
        }
    },
    getAllTranslations: function() {
        this.verifyLS();
        if(localStorage.getItem('translations')) {
          console.log(localStorage.getItem('translations'))
          return localStorage.getItem('translations');
        }
    },
    loadTranslation: function() {
        this.verifyLS();
        if(JSON.parse(localStorage.getItem('translations'))[this.language]) {
          this.data = JSON.parse(localStorage.getItem('translations'))[this.language];
        } else {
          this.data = {};
        }
        
    },
    verifyLS: function(){
      if(!localStorage.getItem('base')) {
        alert('Please load a base JSON file.');
        this.$router.push('/');
      }
      localStorage.getItem('translations') || localStorage.setItem('translations',JSON.stringify({}));
    },
    path: function(key){
      return key.split(".").join(" > ").concat(' >');
    },
    languageToUC: function(langKey) {
      for (let lang in this.languages) {
        if (this.languages[lang].value === langKey) {
          return this.languages[lang].label.toUpperCase();
        }
      }
    }
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .translator {
    display: block;
    clear: both;
  }
  .path {
    color: purple;
    font-weight: normal;
  }
</style>