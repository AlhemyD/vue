new Vue({
    el: '#app',
    data: {
        notes: [],
        newNote: {
            title: '',
            content: '',
            priority: '',
            status: 'active',
            important: false,
        },
    },
    mounted() {
        // Загружаем заметки из localStorage при запуске
        this.loadNotes();
    },
    methods: {
        addNote() {
            const note = {
                id: Date.now(),
                title: this.newNote.title,
                content: this.newNote.content,
                priority: this.newNote.priority,
                status: this.newNote.status,
                important: this.newNote.important,
            };
            this.notes.push(note);
            this.saveNotes();
            this.resetForm();
        },
        removeNote(id) {
            this.notes = this.notes.
filter(note => note.id !== id);
            this.saveNotes();
        },
        saveNotes() {
            localStorage.setItem('notes', JSON.stringify(this.notes));
        },
        loadNotes() {
            const savedNotes = localStorage.getItem('notes');
            if (savedNotes) {
                this.notes = JSON.parse(savedNotes);
            }
        },
        clearNotes() {
            localStorage.removeItem('notes');
            this.notes = [];
        },
        resetForm() {
            this.newNote.title = '';
            this.newNote.content = '';
            this.newNote.priority = '';
            this.newNote.status = 'active';
            this.newNote.important = false;
        },
		 editNote(note) {
            this.newNote = {...note};
            this.isEditing = true;
        },
        updateNote() {
            const index = this.notes.findIndex(note => note.id === this.newNote.id);
            if (index !== -1) {
                this.notes.splice(index, 1, {...this.newNote});
            }
			this.saveNotes();
            this.clearForm();
        }
    },
});
