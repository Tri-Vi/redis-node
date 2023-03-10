<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="allBooks"
      :items-per-page="5"
      class="elevation-1">

      <template v-slot:top>
        <v-toolbar
          flat>
          <v-toolbar-title>Book Dashboard</v-toolbar-title>
          <v-divider class="mx-4"
            inset
            vertical>
          </v-divider>
          <v-spacer></v-spacer>
          <v-dialog
            v-model="dialog"
            max-width="500px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-bind="attrs"
                v-on="on"
              >
                New Book
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.name"
                        label="Book name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        </v-toolbar>
      </template>


      <template v-slot:[`item.actions`]="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-pencil
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="fetchBooks"
        >
          Reset
        </v-btn>
      </template>
    ></v-data-table>
  </div>
</template>

<script>
import  { mapGetters, mapActions } from 'vuex';
export default {
  name: 'BookTable',
  data(){
    return {
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Id',
          sortable: true,
          value: 'id'
        },
        {
          text: 'Book Name',
          sortable: true,
          value: 'name'
        },
        {
          text: 'Actions',
          sortable: false,
          value: 'actions'
        }
      ],
      editedIndex: -1,
      editedItem: {
        name: ''
      },
      defaultItem: {
        name: ''
      }

    }
  },
  methods: {
    ...mapActions(['fetchBooks']),
    editItem(item){
      // 
      this.editedIndex = this.allBooks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item){
      this.editedIndex = this.allBooks.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      // Should dispatch action and commit mutation
      // Action should call delete request and return updated available books 
      this.allBooks.splice(this.editedIndex, 1)
      this.closeDelete();
    },
    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },
    save () {
        if (this.editedIndex > -1) {
          // Dispatch edit book action
          this.$store.dispatch('editBook', {
            editedIndex: this.editedIndex,
            editedItem: this.editedItem
          })
          //Object.assign(this.allBooks[this.editedIndex], this.editedItem)
        } else {
          // Dispatch add book action
          this.$store.dispatch('addBook', this.editedItem)
        }
        this.close()
      },
  },
  computed: {
    ...mapGetters(['allBooks']),
    formTitle(){
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item' 
    }
  },
  watch: {
    dialog(val){
      val || this.close()
    },
    dialogDelete(val){
      val || this.closeDelete();
    }
  },
  created() {
    this.fetchBooks();
  }
}
</script>

<style>

</style>