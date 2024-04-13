const { ref, toRefs } = Vue
import { sanitizeString } from "../../utils.js"
import CourseContentModal from "./course-content-modal.js"

export default {
  components: { CourseContentModal },
  props: {
    course: Object,
  },
  setup(props) {
    const { course } = toRefs(props)
    course.value.name = sanitizeString(course.value.name)
    const isModalOpen = ref(false)
    const isEditCourseName = ref(false)
    const tempCourseName = ref(course.value.name)

    const editCourseName = () => {
      if (tempCourseName.value) {
        course.value.name = sanitizeString(tempCourseName.value)
        isEditCourseName.value = false
      }
    }

    return {
      isModalOpen,
      isEditCourseName,
      tempCourseName,
      editCourseName,
      sanitizeString
    }
  },
  template: `
  <div class="card w-full max-w-xl bg-base-200 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-center justify-between">
        <span>{{ course.name }}</span>
        <div>
          <div class="badge badge-secondary mr-2">{{ course.status }}</div>
          <button :class="'btn btn-outline btn-sm btn-circle' + (isEditCourseName && ' hidden')" @click="isEditCourseName = !isEditCourseName">
            <i class="fa-solid fa-pen cursor-pointer h-3 w-3" />
          </button>
        </div>
      </h2>
      <input
        type="text"
        placeholder="Digite o nome do Curso e pressione Enter"
        class="input input-bordered input-sm w-full"
        :value="tempCourseName"
        @input="tempCourseName = sanitizeString($event.target.value)"
        @keydown.enter="editCourseName"
        v-if="isEditCourseName"
      />
      <div class="card-actions justify-end items-center gap-2">
        Selecionar para Download
        <input type="checkbox" class="checkbox checkbox-primary" v-model="course.selected" />
        <button
          class="btn btn-primary btn-sm"
          @click="isModalOpen = !isModalOpen"
          :disabled="!course.selected || isModalOpen"
        >
          <i class="fa-solid fa-hand" />
          Selecionar Conteúdo
        </button>
      </div>
    </div>
  </div>

  <CourseContentModal
    :course="course"
    :isModalOpen="isModalOpen"
    @close-modal-request="isModalOpen = false"
    @set-course-modules="course.modules = $event"
  />
  `
}