<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="readingList"
      :items-per-page="5"
      class="elevation-1">
      
      <template v-slot:[`item.fullname`]="{ item }">{{ item.user.first_name }} {{ item.user.last_name }}</template>
      
      <template v-slot:top>
        <v-toolbar
          flat>
          <v-toolbar-title>Reading List</v-toolbar-title>
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
                New Assignment
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <!-- Status -->
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.status"
                        label="Status"
                      ></v-text-field>
                    </v-col>

                    <!-- User -->
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                     <v-select
                        :items="allUsers"
                        item-text="email"
                        item-value="id"
                        label="User Email"
                        v-model="editedItem.user_id"
                      ></v-select>
                    </v-col>
                    
                    <!-- Book -->
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-select
                        :items="allBooks"
                        item-value="id"
                        item-text="name"
                        label="Book Name"
                        v-model="editedItem.book_id"
                      ></v-select>
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
          @click="fetchReadingList"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import  { mapGetters, mapActions } from 'vuex';
export default {
  name: 'ReadingList',
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
          value: 'book.name'
        },
        {
          text: 'Reader',
          sortable: true,
          value: 'fullname'
        },
        {
          text: 'Status',
          sortable: true,
          value: 'status'
        },
        {
          text: 'Actions',
          sortable: false,
          value: 'actions'
        }
      ],
      editedIndex: -1,
      editedItem: {
        book_id: '',
        user_id: '',
        status: '',
        user: {},
        book: {}
      },
      defaultItem: {
        book_id: '',
        user_id: '',
        status: '',
        user: {},
        book: {}
      }
    }
  },
  methods: {
    ...mapActions(['fetchReadingList', 'fetchUsers', 'fetchBooks']),
    editItem(item){
      this.editedIndex = this.readingList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem(item){
      this.editedIndex = this.readingList.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },
    deleteItemConfirm () {
      this.$store.dispatch('deleteAssignment', {
        editedIndex: this.editedIndex,
        editedItem: this.editedItem
      })
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
        this.$store.dispatch('editUpdateAssignment', {
          editedIndex: this.editedIndex,
          editedItem: this.editedItem
        })
      } else {
        this.$store.dispatch('addAssignment', this.editedItem)
      }
      this.close()
    },
  },
  computed: {
    ...mapGetters(['readingList', 'allBooks', 'allUsers']),
    formTitle(){
      return this.editedIndex === -1 ? 'New Assignment' : 'Edit Assignment' 
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
    this.fetchReadingList();
    this.fetchBooks();
    this.fetchUsers();
  }
}
</script>

<style>

</style>