import {groups, bijas, tattvas} from './tattvas.js'

const ct = new Vue({
  el:"#ananda-app",
  components: {

  },
  data: {
    url:'svg/clean-ananda.svg',
    loaded:false,
    tattva:{},
    svg:{},
    selected:null,
  },
  methods: {
    resize() {
      this.svg.fitBounds(paper.view.bounds);
    },
    setListeners() {
      this.svg.getItems({class:paper.Path}).forEach( item => {
          let light = item.fillColor.lightness;
          let opacity = item.opacity;
          let tween = {stop(){}};

          item.onMouseEnter = (event) => {
            tween.stop();
            item.strokeColor='#fff';
            tween = item.tween({
              'fillColor.lightness': Math.sqrt(light),
              opacity:1,
              strokeWidth:1,
              },
              {
                easing:'easeInOutCubic',
                duration:300
              }
            );
          }

          item.onClick = (event) => {
            this.tattva = {num:item.id};
            if (tattvas.hasOwnProperty(item.name)) {
              this.tattva = tattvas[item.name]
            }
          }

          item.onMouseLeave = (event) => {
            tween.stop();
            item.tweenTo({
              'fillColor.lightness': light,
              opacity:opacity,
              strokeWidth:0,
              },
              {
                easing:'easeInOutCubic',
                duration:300
              }
            );
          }

      })
    },
  },
  watch: {

  },
  mounted() {
    paper.setup(document.getElementById('paper'));

    paper.project.importSVG(this.url, (svg) => {
      this.loaded=true;
      this.svg=svg;
      paper.view.onResize = this.resize;
      this.resize();
      this.setListeners();
    })

  },
});
