/* eslint-disable */
<template >
  <div class="navBar">
    <div class="topnav" id="myTopnav">
      <span class="active topnav-title" v-on:click="processMenu()" >TracksGame</span>
      <a href="#" v-on:click="processMenu()" class="topnav-firstLink" ><router-link :to="{ name: 'Home' }"> Home </router-link></a>
      <a href="#" v-on:click="processMenu()" class="topnav-headerLink"><router-link :to="{ name: 'Steps' }">Steps</router-link></a>
      <a href="#" v-on:click="processMenu()" class="topnav-headerLink"><router-link :to="{ name: 'Help' }">Help</router-link></a>
      <a href="#" v-on:click="processMenu()" class="topnav-headerLink"><router-link :to="{ name: 'Info' }">Info</router-link></a>
      <a href="javascript:void(0);" class="icon" v-on:click="processMenu()">
        <i class="fa fa-bars"></i>
      </a>
    </div>
    <div style="padding-left:16px">
    </div>
  </div>
</template>

<script>

export default {
  name: 'Navbar',
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    processMenu: function () {
      var x = document.getElementById('myTopnav')
      if (x.className === 'topnav') {
        x.className += ' responsive'
      } else {
        x.className = 'topnav'
      }
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.fa {
  line-height: 2;
  height: 10vw;
  font-size: 5vw;
  font-weight: bold;
}

.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav-title {
  float: left;
  display: block;
  text-align: center;
  padding: 5px 5px;
  text-decoration: none;
  width: 37vw;
  height: 12vw;
  font-size: 6vw;
  font-weight: bold;
}

.topnav-title:hover {
  background-color: #D5D6CE; /* light grey */
  color: black;
  display: block;
  width: 37vw;
  height: 12vw;
  font-size: 6vw;
}

.topnav-firstLink {
  margin-top: 13vw;
  border-bottom: 1px solid grey;
}
.topnav-headerLink {
  border-bottom: 1px solid grey;
}
.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 5px 5px;
  text-decoration: none;
  font-size: 6vw;
}

.topnav a:hover {
  background-color: #D5D6CE; /* light grey */
  color: black;
  display: block;
  height: 20%;
}

.active {
  background-color: #DEF333; /* yellow violet  #93329E*/
  color: black;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
    height: 12vw;
    font-size: 6vw;
    font-weight: bold;
  }
}
</style>
