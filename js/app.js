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
    cycle(dir) {

    },
    hover(event) {
      let target = event.target;
      target.light = target.fillColor.lightness;
      target.op = target.opacity;
      if (target.tweener) {
        target.tweener.stop();
      }
      target.tweener = target.tween({
        'fillColor.lightness': Math.sqrt(target.light),
        opacity:1,
        },{easing:'easeInOutCubic', duration:300}
      )
    },
    leave(event) {
      let target = event.target;
      target.tweener.stop();
      target.tweenTo({
        'fillColor.lightness': target.light,
        opacity:target.op,
        strokeWidth:0,
        }, {easing:'easeInOutCubic', duration:300}
      );
    },
    clicker(event) {
      let target = event.target;
      this.tattva = {num:target.id};
      if (tattvas.hasOwnProperty(target.name)) {
        this.tattva = tattvas[target.name]
      }
    },
    setListeners() {
      this.svg.getItems({class:paper.Path}).forEach( item => {
          item.onMouseEnter = this.hover
          item.onMouseLeave = this.leave
          item.onClick = this.clicker
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
