<template>
    <div class="base">
      <form v-on:submit.prevent="save()">
           <div class="form-group">
              <label for="file">Load Base JSON</label><input type="file" class="form-control" id="file" v-on:change="loadBase">
           </div>
        </form>
    </div>
</template>

<script>

export default {
  name: 'base',
  data () {
    return {
      localStorage: localStorage
    }
  },
  mounted() {

  },
  methods: {
    loadBase: function(event){
      let reader = new FileReader();
      reader.onload = function(event) {
        if (confirm('The translations that were not backed-up will be lost. Do you wish to continue?')) {
          try {
              this.localStorage.setItem('base', JSON.stringify(JSON.parse(event.target.result)));
              this.localStorage.setItem('translations',JSON.stringify({}));
              document.getElementById("file").value = "";
              this.$router.push('translator');              
          } catch(error) {
              console.log(error);
              alert('Please load a valid JSON file.'); // error
          }
        } else {
          document.getElementById("file").value = "";
        } 
      }.bind(this);

      reader.readAsText(event.target.files[0]);
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>