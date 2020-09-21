const vishva = { ...tattvas, ...chakras, ...nadis }

const app = Vue.createApp({
  template: /*html*/ `
    <the-yantra v-for="yantra in yantras" :key="yantra.name" :name="yantra.name" :info="yantra" />
    `,
  data() {
    return {
      yantras: [
        {
          name: 'sat',
          sans: 'सत्',
          trans: 'sat',
          title: 'Сат',
          text: 'Всепроникающее вечное бытие',
        },
        {
          name: 'cit',
          sans: 'चित्',
          trans: 'cit',
          title: 'Чит',
          text: 'Чистое сознание Вселенной',
        },
        {
          name: 'ananda',
          sans: 'आनन्द',
          trans: 'ānanda ',
          title: 'Ананда',
          text: 'Блаженство самопознания Вселенной',
        },
      ],
    }
  },
})

app.component('the-yantra', {
  props: ['name', 'info'],
  template: /*html*/ `
        <section class="holder" ref="section">
            <object ref="object" id="object" :data="name + '.svg'" type="image/svg+xml" @load ="mount()" ></object>
            
            <div @click="close()" :class="{'open':active}" class="overlay">
                <div ref="info" class="info" v-html="text"></div>
            </div>
        </section>
    `,
  data() {
    return {
      svg: '',
      active: true,
      main: null,
      text: this.format(this.info),
    }
  },
  methods: {
    mount() {
      this.svg = this.$refs.object.contentDocument
      this.main = this.svg.getElementById('main')
      this.setListeners()
    },
    setListeners() {
      for (let item in vishva) {
        let el = this.svg.getElementById(item)
        if (el instanceof Element) {
          el.addEventListener('click', this.click(item))
        }
      }
    },
    click(item) {
      return (e) => {
        let el = this.svg.getElementById(item)
        if (this.active instanceof Element) {
          this.active.classList.remove('active')
          if (active == el) {
            this.active = null
            this.main.classList.remove('has-active')
            return
          }
        }
        this.active = el
        this.text = this.format(vishva[item])
        this.active.classList.add('active')
        this.main.classList.add('has-active')
      }
    },
    close() {
      if (this.active instanceof Element) {
        this.active.classList.remove('active')
      }
      this.active = null
      this.main.classList.remove('has-active')
    },
    format(item) {
      return /*html*/ `
              <p class="sanskrit">${item.sans}</p>
              <p class="transcript">${item.trans}</p>
              <h2>${item.title}</h2>
              <p>${item.text}</p>
            `
    },
  },
})

app.mount('#yantra-app')
