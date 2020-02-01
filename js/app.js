import {groups, bijas, tattvas} from './tattvas.js'

const ct = new Vue({
  el:"#ananda-app",
  components: {

  },
  data: {
    pic:{},
    pics:[
      {
        url:'svg/sat.svg',
        title:'Бытие',
        sans:'सत्',
        trans:'sat',
        rus:'Сат',
      },
      {
        url:'svg/cit-fresh.svg',
        title:'Сознание',
        sans:'चित्',
        trans:'cit',
        rus:'Чит',
      },
      {
        url:'svg/clean-ananda.svg',
        title:'Блаженство',
        sans:'आनन्द',
        trans:'ānanda',
        rus:'Ананда',
      },
    ],
    currentPic:0,
    loaded:false,
    tattva:{text:'Нажмите на любую область янтры и здесь отобразится пояснение'},
    svg:{},
    selected:null,
  },
  methods: {
    resize() {
      this.svg.fitBounds(paper.view.bounds);
    },
    cycle(dir=1) {
      let num = this.tattva.num+dir;
      for (let key in tattvas) {
        if (tattvas[key].num==num) {
          this.tattva=tattvas[key]
        }
      }
    },
    changePic(dir=1) {
      if (this.pics[this.currentPic+dir]) {
        this.currentPic+=dir;
      } else {
        this.currentPic=0;
      }
      this.pic = this.pics[this.currentPic]
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
      for (name in tattvas) {
        this.svg.getItems({name:name}).forEach( item => {
          item.onMouseEnter = this.hover
          item.onMouseLeave = this.leave
          item.onClick = this.clicker
        })
      }
    },
  },
  watch: {
    pic(value) {
      paper.project.clear();
      paper.project.importSVG(value.url, (svg) => {
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
    this.pic = this.pics[0];
  },
});
