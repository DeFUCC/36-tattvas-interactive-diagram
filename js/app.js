import {groups, bijas, tattvas} from './tattvas.js'

const ct = new Vue({
  el:"#ananda-app",
  components: {

  },
  data: {
    url:'',
    urls:['svg/clean-ananda.svg','svg/cit-clean.svg'],
    currentUrl:0,
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
      let num = this.tattva.num+dir;
      for (let key in tattvas) {
        if (tattvas[key].num==num) {
          this.tattva=tattvas[key]
        }
      }
    },
    changeUrl() {

      this.url = this.urls[this.currentUrl+1];
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
      this.tattva = { num:target.id };
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
    url(value) {
      paper.project.importSVG(this.url, (svg) => {
        this.loaded=true;
        this.svg=svg;
        paper.view.onResize = this.resize;
        this.resize();
        this.setListeners();
      })
    }
  },
  mounted() {
    paper.setup(document.getElementById('paper'));
    this.url = this.urls[this.currentUrl];


  },
});
