import { useRef } from "react";
import { create } from "zustand";
import { devtools, persist, subscribeWithSelector } from "zustand/middleware";
import { produce } from "immer";
//state setter for whole store
const store = (set) => ({
  tasks: [],

  draggedTask: null,
  taskInOngoing: 0,
  addTask: (title, state) =>
    set(
      produce((store) => {
        store.tasks.push({ title, state });
      }),
      // (store) => ({
      //   tasks: [...store.tasks, { title, state }],
      // }),
      false,
      "addTask"
    ),
  deleteTask: (title) =>
    set((store) => ({
      tasks: store.tasks.filter((task) => task.title !== title),
    })),
  setDraggedTask: (title) => set({ draggedTask: title }),

  moveTask: (title, state) =>
    set((store) => ({
      tasks: store.tasks.map((task) =>
        task.title === title ? { title, state } : task
      ),
    })),
});

const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log(args);
      set(...args);
    },
    get,
    api
  );

export const useStore = create(
  log(persist(devtools(store), { name: "store" }))
);

//// little useEffect
// useStore.subscribe((newStore, prevStore) => {
//   if (newStore.tasks !== prevStore.tasks) {
//     useStore.setState({
//       taskInOngoing: newStore.tasks.filter((task) => task.state === "ONGOING").length,
//     });
//   }
// });
