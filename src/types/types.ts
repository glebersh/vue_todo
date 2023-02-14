export type SelectOption = {
  optionTitle: string,
  optionValue: string,
};

export type Task = {
  completed: boolean,
  body: string,
  id: string,
};

export type TaskList = {
  listIndex: string,
  displayName: string,
  data: Task[],
  dataFilter: string,
}

export type AddTaskPayload = {
  listIndex: string,
  data: Task,
};