let shownote = {
    props: ['notes'],
    template: `<div class="card mt-4" >
            <ul class="list-group list-group-flush" >
<li class="list-group-item d-flex flex-wrap justify-content-between " style="cursor: pointer" v-for="n, id in notes" :key="n.id" @dblclick="n.edit = !n.edit">
<span style="overflow: hidden; white-space:nowrap; text-overflow:ellipsis; width:150px; display:inline-block;">{{n.note}}</span>
     <div class="position-absolute " style="top: 15px; right: 100px">{{ n.noteWords }} words</div>
      <button class="btn btn-danger" @click="deleteNote(n.id)">Delete</button>
       <textarea v-model="n.note" v-on:keydown="$emit('count-words', n.id)"  v-if="n.edit" class="form-control mt-2" ></textarea>
       </li>
 </ul>
        </div>`,

    methods: {
        deleteNote(id) {
            this.notes.forEach(note => {
                if (note.id === id)
                    this.notes.splice(this.notes.indexOf(note), 1)
            })
        },
    }
}

var app = new Vue({
    el: '#app',
    components: {
        shownote
    },
    data: {
        notes: [],
        text: "",
        words: 0,
    },
    mounted() {
        if (localStorage.getItem('notes')) {
            try {
                this.notes = JSON.parse(localStorage.getItem('notes'));
            } catch (e) {
                localStorage.removeItem('notes');
            }
        }
    },
    watch: {
        notes: {
            handler(val) {
                const parsed = JSON.stringify(this.notes);
                localStorage.setItem('notes', parsed);
            },
            deep: true
        },
    },
    methods: {
        wordCompter(id) {
            if (id === '') {
                let wordsCount = this.text.trim().split(' ')
                this.words = wordsCount.length
            } else {
                this.notes.forEach(note => {
                    if (note.id === id) {
                        let wordsCount = note.note.trim().split(' ')
                        note.noteWords = wordsCount.length
                    }
                })
            }
        },
        onSubmit() {
            this.notes.push({
                note: this.text,
                id: new Date().getTime(),
                edit: false,
                noteWords: this.words
            })
            this.text = ''
        },
    }
})