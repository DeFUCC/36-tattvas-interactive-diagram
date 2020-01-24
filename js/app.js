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
    }
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

      svg.getItems({class:paper.Path}).forEach( item => {

          let light = item.fillColor.lightness;
          let tween = {stop(){}};

          item.onMouseEnter = (event) => {
            tween.stop();
            item.strokeWidth=1;
            item.strokeColor='#fff';
            tween = item.tween({'fillColor.lightness':Math.sqrt(light)}, {easing:'easeInOutCubic', duration:300});
          }

          item.onClick = (event) => {
            this.tattva = item.id;
            if (tattvas.hasOwnProperty(item.name)) {
              this.tattva = tattvas[item.name]
            }
          }

          item.onMouseLeave = (event) => {
            item.strokeWidth=0;
            tween.stop();
            item.tweenTo({'fillColor.lightness':light}, {easing:'easeInOutCubic', duration:300})
          }

      })
    })

  },
});
