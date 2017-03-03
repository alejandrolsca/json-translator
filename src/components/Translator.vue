<template>
    <div class="translator">
        <form v-on:submit.prevent="save()">
           <div class="form-group">
              <label for="file">Load backup</label><input type="file" class="form-control" id="file" v-on:change="loadBackup">
           </div>

          <div class="col">
          <button type="button" v-on:click="backup()" class="btn btn-primary">BACKUP TRANSLATIONS</button>
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
        {"label":"Chinese","value":"zh"},
        {"label":"French","value":"fr"},
        {"label":"Deutsch","value":"de"},
        {"label":"Italian","value":"it"},
        {"label":"Japanese","value":"ja"},
        {"label":"Portuguese","value":"pt"},
        {"label":"Russian","value":"ru"},
        {"label":"Spanish","value":"es"}
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
              localStorage.getItem('translations') || localStorage.setItem('translations',JSON.stringify({}));
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
      localStorage.getItem('translations') || localStorage.setItem('translations',JSON.stringify({}));
      let currentTranslations = JSON.parse(localStorage.getItem('translations'));
      currentTranslations[this.language] = JSON.stringify(this.data);
      localStorage.setItem('translations', JSON.stringify(currentTranslations))
    },
    getTranslation: function() {
        localStorage.getItem('translations') || localStorage.setItem('translations',JSON.stringify({}));
        if(JSON.parse(localStorage.getItem('translations'))[this.language]) {
          return JSON.parse(JSON.parse(localStorage.getItem('translations'))[this.language]);
        }
    },
    getAllTranslations: function() {
        localStorage.getItem('translations') || localStorage.setItem('translations',JSON.stringify({}));
        if(localStorage.getItem('translations')) {
          console.log(localStorage.getItem('translations'))
          return localStorage.getItem('translations');
        }
    },
    loadTranslation: function() {
        localStorage.getItem('translations') || localStorage.setItem('translations',JSON.stringify({}));
        if(JSON.parse(localStorage.getItem('translations'))[this.language]) {
          this.data = JSON.parse(JSON.parse(localStorage.getItem('translations'))[this.language]);
        } else {
          this.data = {};
        }
        
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